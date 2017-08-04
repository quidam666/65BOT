var linebot = require('linebot')
var express = require('express')
var hsBOT = require("./hsbot.js")
var hsDataHelper = require("./dataHelper.js")
var client = require("./client.js")
var pg = require('pg')
var request = require("request");
var bodyParser = require('body-parser');
var Botmetrics = require('botmetrics');

var mPgClient
var mZone
var mCurrentAction

const ACTION_WELFARE = "找福利"
const ACTION_ACTIVITY = "找活動"
const ACTION_CONSULT = "專業諮詢"
const ACTION_CHALLANGE = "每日挑戰"

const CHANNEL_ACCESS_TOKEN = 'Z7Zy5/U+eCOUq8QfUyNlCb2zGc8mYsb4Oec9YLOvSYBu6eoi/FgLTf4tZHr1m0q64IY+6546dTzEv/SS6rgk/TnvMZckIxDQ17saBPIZbvk9WWuVO14NwUn77ZWBtIZnCRSl9FPtbVbmX5KchwhjQAdB04t89/1O/w1cDnyilFU='
const CHANNEL_ID = '1528157130'
const CHANNEL_SECRET = 'dc7226b76dab1aa9eff8c4c8aa45ca58'

pg.defaults.ssl = true
pg.connect(process.env.DATABASE_URL, function (err, client) {
    if (err) throw err
    console.log('Connected to postgres! Getting schemas...')

    mPgClient = client
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
                            // hsBOT.askLocation(event)
                            hsBOT.askLocationWithCarousel(event)
                            break;

                        case ACTION_WELFARE:
                            hsBOT.askLocationWithCarousel(event)
                            break

                        case ACTION_CHALLANGE:

                            break

                        case ACTION_CONSULT:
                            console.log('專業專業')
                            hsBOT.getConsultCarousel(event)
                            break
                    }
                } else if (mCurrentAction === undefined && isMessageFromAction === false) {
                    hsBOT.showNonSenseText(event, userProfile)
                } else {
                    switch (mCurrentAction) {
                        case ACTION_ACTIVITY:
                            findActivities(event, message, userProfile)
                            break;

                        case ACTION_:
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
    if (message === ACTION_ACTIVITY || message === ACTION_WELFARE
        || message === ACTION_CHALLANGE || message === ACTION_CONSULT) {
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

function getWelfare() {
    client.getWelfare("新北市", "id_low_income", "true", "true").then(function (result, reject) {
        var walfare = JSON.parse(result)
    })

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
            console.log('(logReceiveMessage) + body.id ' + body.id) // Print the shortened url.
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