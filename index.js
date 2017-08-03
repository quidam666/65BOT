var linebot = require('linebot')
var express = require('express')
var hsBOT = require("./hsbot.js")
var hsDataHelper = require("./dataHelper.js")
var pg = require('pg')
var request = require("request");
var bodyParser = require('body-parser');
var Botmetrics = require('botmetrics');

var mPgClient
var mZone
var mCurrentAction

const ACTION_ACTIVITY = "找活動"
const ACTION_RESOURCE = "找福利"
const ACTION_GROUP = "揪團"
const ACTION_CONSULT = "專業諮詢"

const TPE_ZONE_ARRAY = ["中正", "中正區", "大同", "大同區", "中山", "中山區", "松山", "松山區", "大安", "大安區", "萬華", "萬華區", "信義", "信義區", "士林", "士林區", "北投", "北投區",
    "內湖", "內湖區", "南港", "南港區", "文山", "文山區"]

const NEWTPE_ZONE_ARRAY = ["萬里區", "萬里", "金山", "金山區", "板橋", "板橋區", "汐止區", "汐止", "深坑區", "深坑", "石碇區", "石碇", "瑞芳區", "瑞芳",
    "平溪區", "平溪", "雙溪區", "雙溪", "貢寮區", "貢寮", "新店區", "新店", "坪林區", "坪林", "烏來區", "烏來", "永和區", "永和", "中和區", "中和", "土城區", "土城", "三峽區", "三峽",
    "樹林區", "樹林", "鶯歌區", "鶯歌", "三重區", "三重", "新莊區", "新莊", "泰山區", "泰山", "林口區", "林口", "蘆洲區", "蘆洲", "五股區", "五股", "八里區", "八里", "淡水區", "淡水",
    "三芝區", "三芝", "石門區", "石門區"]

const CHANNEL_ACCESS_TOKEN = '6KWMG7l3JRt1VEVHPIv0+pGZemFqFok/B2n/7tu+m6LefSjX2IfwT6wqruFEK6ANNzboceCdtNfmveIeGUsLjitKtnJGQos0yCHjZSjmfLrkihRenKtTD3sRrI8m3zLRiIwEROQnoJnts44HfcJoyQdB04t89/1O/w1cDnyilFU='
const CHANNEL_ID = '1504900799'
const CHANNEL_SECRET = '232e88ea9edbbad44de3049656f84867'


pg.defaults.ssl = true
pg.connect(process.env.DATABASE_URL, function (err, client) {
    if (err) throw err
    console.log('Connected to postgres! Getting schemas...')

    mPgClient = client
    // pgClient.query('SELECT * FROM activity')
    //     .on('row', function (row) {
    //         console.log(JSON.stringify(row));
    //     });
})

var bot = linebot({
    channelId: CHANNEL_ID,
    channelSecret: CHANNEL_SECRET,
    channelAccessToken: CHANNEL_ACCESS_TOKEN
})

bot.on('follow', function (event) {
    console.log('(on follow) ', event)
    event.source.profile().then(function (profile) {
        userProfile = profile
        hsDataHelper.checkIfUserExist(mPgClient, userProfile, function (isExist) {
            if (isExist === false) {
                hsDataHelper.saveUser(mPgClient, userProfile)
                hsBOT.showWelcomeText(event, userProfile)
            }
        })
    })
})


bot.on('message', function (event) {
    var userProfile

    event.source.profile().then(function (profile) {
        userProfile = profile
        hsDataHelper.checkIfUserExist(mPgClient, userProfile, function (isExist) {
            console.log('(on message) isExist', isExist)
            console.log('(on message) message ', message)
            var message = event.message.text

            logReceiveMessage(userProfile.userId, message)

            // New User
            if (isExist === false) {
                hsDataHelper.saveUser(mPgClient, userProfile)
                hsBOT.showWelcomeText(event, userProfile)
            } else {

                var isMessageFromAction = isAction(message)

                console.log('(on message) isMessageFromAction ' + isMessageFromAction)
                console.log('(on message) mCurrentAction (1) ' + mCurrentAction)

                if (isMessageFromAction === true) {
                    mCurrentAction = message

                    console.log('(on message) mCurrentAction (2) ' + mCurrentAction)

                    switch (mCurrentAction) {
                        case ACTION_ACTIVITY:
                            hsBOT.askLocation(event)
                            break;

                        case ACTION_RESOURCE:
                            hsBOT.getBenefitWithButtons(event, userProfile)
                            break

                        case ACTION_GROUP:

                            break

                        case ACTION_CONSULT:

                            break
                    }
                } else if (mCurrentAction === undefined && isMessageFromAction === false) {
                    hsBOT.showNonSenseText(event, userProfile)
                } else {
                    switch (mCurrentAction) {
                        case ACTION_ACTIVITY:
                            findActivities(event, message, userProfile)
                            break;

                        case ACTION_RESOURCE:
                            hsBOT.showNonSenseText(event, userProfile)
                            break

                        case ACTION_GROUP:
                            hsBOT.showNonSenseText(event, userProfile)
                            break

                        case ACTION_CONSULT:
                            hsBOT.showNonSenseText(event, userProfile)
                            break
                    }
                }
            }
        })
    })
})

function isAction(message) {
    if (message === ACTION_ACTIVITY || message === ACTION_RESOURCE
        || message === ACTION_GROUP || message === ACTION_CONSULT) {
        return true

    } else {
        return false
    }
}

function findActivities(event, activityMessage, userProfile) {

    hsDataHelper.getUser(mPgClient, userProfile.userId, function (result) {
        var user = result[0]
        if (checkZone(activityMessage) === true) {
            mZone = activityMessage
            console.log("user.location " + user.location)
            console.log("user.location.includes? " + user.location.includes(mZone))

            if (user.location === undefined || user.location.includes(mZone) == false) {
                // ask if user wanna add this area to their favorite
                hsBOT.showAddLocationToFavoriteDialog(event, mZone);
            } else {
                showActivities(event, mPgClient, user, mZone)
            }

        } else if (activityMessage === "好啊！") {
            // save user location
            hsDataHelper.saveUserLocation(mPgClient, user, mZone, function () {
                // show content in carousel
                showActivities(event, mPgClient, user, mZone)
            })

        } else if (activityMessage === "暫時不要") {
            // show content in carousel
            showActivities(event, mPgClient, user, mZone)
        } else {
            hsBOT.showComingSoonText(event, user)
        }
    })
}

function showActivities(event, pgClient, userProfile, zone) {
    console.log("(showActivities) " + zone)
    // query activities with location
    hsDataHelper.getActivitiesFromDB(pgClient, zone, function (activities) {
        // reply carousel to user
        hsBOT.showActivitiesInCarousel(event, userProfile, zone, JSON.parse(activities))
    })
}

function getIndex(str) {
    return str.split('=')[1];
}

function checkZone(zone) {
    return (TPE_ZONE_ARRAY.includes(zone) || NEWTPE_ZONE_ARRAY.includes(zone))
}

function logReceiveMessage(userId, message) {

    console.log('(logReceiveMessage) ' + userId + ' ' + message)

    var options = {
        uri: 'https://tracker.dashbot.io/track?platform=generic&v=0.8.2-rest&type=incoming&apiKey=s20llrJ6uakltBPH8QZnk3ab14Mz3mxebj0Zhje3',
        method: 'POST',
        json: {
            "text": message,
            "userId": userId
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body.id) // Print the shortened url.
        }
    })
}

bot.on('postback', function (event) {
    console.log('(postback) ', event)
    hsBOT.showApplyInfo(event, event.postback.data)

})

bot.on('unfollow', function (event) {
    console.log('unfollow! ', event)
})

bot.on('leave', function (event) {
    console.log('leave! ', event)
})

const app = express()
const linebotParser = bot.parser()
app.post('/', linebotParser)

app.use(bodyParser.json()); // for parsing application/json
app.post('/webhooks', function (req, res) {
    console.log('req' + req)
    console.log('res' + res)
    Botmetrics.track(req.body, {
        apiKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2MjksImV4cCI6MTgxNDk1ODE1NX0.Mbl62nX90UWgn9yTU6j6-zpSobg4ZLQVYfhHDe0Iisc",
        botId: "b3f3b04f3e36"
    });
    res.status(200).send("");
});

// chagnge default port from express (3000) to heroku(8080)
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port
    console.log("App now running on port", port)
})

