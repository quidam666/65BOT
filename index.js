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
var mCity
var mCurrentAction
var mUserProfile
var mIdentity
var mNeedCare
var mNeedAssisive

const ACTION_WELFARE = "找福利"
const ACTION_ACTIVITY = "找活動"
const ACTION_CONSULT = "專業諮詢"
const ACTION_CHALLANGE = "每日挑戰"

const CHANNEL_ACCESS_TOKEN = 'Z7Zy5/U+eCOUq8QfUyNlCb2zGc8mYsb4Oec9YLOvSYBu6eoi/FgLTf4tZHr1m0q64IY+6546dTzEv/SS6rgk/TnvMZckIxDQ17saBPIZbvk9WWuVO14NwUn77ZWBtIZnCRSl9FPtbVbmX5KchwhjQAdB04t89/1O/w1cDnyilFU='
const CHANNEL_ID = '1528157130'
const CHANNEL_SECRET = 'dc7226b76dab1aa9eff8c4c8aa45ca58'

const CITY_ARRAY = ["台北市", "新北市", "基隆", "桃園", "新竹", "苗栗", "台中", "彰化", "南投", "雲林", "嘉義", "台南", "高雄", "屏東", "宜蘭", "花蓮", "台東", "澎湖", "金門", "連江"]
const IDENTITY_ARRAY = ["id_normal", "id_low_middle_income", "id_low_income"]

pg.defaults.ssl = true
var pg_url = 'postgres://hbmfcaiwjdhxcy:54afb20d7cd7fe39bfa74ca09dbf2dff0e1744fb0b4feb87346fb63f796ca509@ec2-54-83-48-188.compute-1.amazonaws.com:5432/d4i0lq3si1f9h9'

pg.connect(pg_url, function (err, client) {
    if (err) throw err
    mPgClient = client
    console.log('Connected to postgres! Ready to go!!')
})

var bot = linebot({
    channelId: CHANNEL_ID,
    channelSecret: CHANNEL_SECRET,
    channelAccessToken: CHANNEL_ACCESS_TOKEN
})

bot.on('follow', function (event) {
    console.log('(on follow) ', event)
    event.source.profile().then(function (profile) {
        mUserProfile = profile
        hsDataHelper.checkIfUserExist(mPgClient, mUserProfile, function (isExist) {
            if (isExist === false) {
                hsDataHelper.saveUser(mPgClient, mUserProfile)
                hsBOT.showWelcomeText(event, mUserProfile)
            }
        })
    })
})


bot.on('message', function (event) {

    console.log('(onMessage) ')
    console.log(event)

    event.source.profile().then(function (profile) {
        mUserProfile = profile
        hsDataHelper.checkIfUserExist(mPgClient, mUserProfile, function (isExist) {
            console.log('(on message) UserisExist', isExist)
            var message = event.message.text.trim()

            logReceiveMessage(mUserProfile.userId, message)

            // New User
            if (isExist === false) {
                hsDataHelper.saveUser(mPgClient, mUserProfile)
                hsBOT.showWelcomeText(event, mUserProfile)
            } else {
                var isMessageFromAction = isAction(message)

                console.log('(on message) isMessageFromAction ' + isMessageFromAction)
                console.log('(on message) mCurrentAction (1) ' + mCurrentAction)

                if (isMessageFromAction === true) {
                    mCurrentAction = message
                    console.log('(on message) mCurrentAction (2) ' + mCurrentAction)
                    console.log(message)

                    switch (mCurrentAction) {
                        case ACTION_ACTIVITY:
                            hsBOT.askLocationWithCarousel(event)
                            break;

                        case ACTION_WELFARE:
                            mIdentity = null
                            mNeedCare = null
                            mNeedAssisive = null
                            hsBOT.askLocationWithCarousel(event)
                            break

                        case ACTION_CHALLANGE:
                            hsBOT.showDailyChallenge(event)
                            break

                        case ACTION_CONSULT:
                            hsBOT.getConsultCarousel(event)
                            break
                    }
                } else if (message == "謝謝" || message == "Thank you") {
                    console.log(mUserProfile)
                    hsBOT.replyYoureWelcome(event, mUserProfile)
                } else if (message == "David") {
                    hsBOT.reply65Text(event, "新創界小彭于晏，我們的實習妹都靠你了",'1', '138' )
                } else if (message == "Manson") {
                    hsBOT.reply65Text(event, "告別R20的人生勝利組，好人有好bot",'1', '120' )
                } else if (message == "Jacob") {
                    hsBOT.reply65Text(event, "好萌好萌的秘密",'2', '34' )
                }

                else if (mCurrentAction === undefined && isMessageFromAction === false) {
                    hsBOT.showNonSenseText(event, mUserProfile)
                }
                else {
                    switch (mCurrentAction) {
                        case ACTION_ACTIVITY:

                            break;

                        case ACTION_WELFARE:

                            break

                        case ACTION_GROUP:

                            break

                        case ACTION_CONSULT:

                            break
                    }
                }
            }
        })
    })
})


bot.on('postback', function (event) {
    console.log('(postback) ', event)

    if (checkCity(event.postback.data) === true) {
        mCity = event.postback.data
        switch (mCurrentAction) {
            case ACTION_ACTIVITY:
                // hsBOT.showFindActivitiesInCity(event,mUserProfile.displayName, mCity)
                showActivities(event, mPgClient, mUserProfile, mCity)
                break;

            case ACTION_WELFARE:
                findWelfares(event)
                break
        }
    } else if (event.postback.data === "其他區域") {
        hsBOT.showMoreCity(event)
    } else {
        switch (mCurrentAction) {
            case ACTION_ACTIVITY:
                var contactInfo = event.postback.data
                hsBOT.showApplyInfo(event, contactInfo)
                break;

            case ACTION_WELFARE:
                var welfareCondition = event.postback.data
                checkWelfareCondition(event, welfareCondition)
                break

            case ACTION_CONSULT:
                hsBOT.showKnowMore(event, event.postback.data)
                break
        }
    }


})

bot.on('unfollow', function (event) {
    console.log('unfollow! ', event)
})

bot.on('leave', function (event) {
    console.log('leave! ', event)
})

function checkWelfareCondition(event, condition) {
    if (IDENTITY_ARRAY.includes(condition)) {
        mIdentity = condition
    } else if (condition === "care_needed" || condition === "care_not_needed") {
        mNeedCare = condition
    } else if (condition === "assistive_needed" || condition === "assistive_not_needed") {
        mNeedAssisive = condition
    }
    findWelfares(event)
}

function isAction(message) {
    if (message === ACTION_ACTIVITY || message === ACTION_WELFARE
        || message === ACTION_CHALLANGE || message === ACTION_CONSULT) {
        return true
    } else {
        return false
    }
}

function showActivities(event, pgClient, userProfile, zone) {
    console.log("(showActivities) " + zone + userProfile.displayName)
    // query activities with location
    hsDataHelper.getActivitiesFromDB(pgClient, zone, function (activities) {
        // reply carousel to user
        hsBOT.showActivitiesInCarousel(event, userProfile, zone, JSON.parse(activities))
    })
}

function findWelfares(event) {
    console.log("[Index] (findWelfares) " + mCity + "/" + mIdentity + "/" + mNeedCare + "/" + mNeedAssisive)

    if (mIdentity == null) {
        hsBOT.askIdentify(event)
    } else if (mNeedCare == null) {
        hsBOT.askIfNeedCare(event)
    } else if (mNeedAssisive == null) {
        hsBOT.askIfNeedAssistive(event)
    } else {
        getWelfare(event)
    }
}

function getWelfare(event) {
    client.getWelfare(mCity, mIdentity, mNeedCare, mNeedAssisive).then(function (result, reject) {
        var welfares = JSON.parse(result)
        hsBOT.showelfareInCarousel(event, mUserProfile, welfares)
    })
}

function getIndex(str) {
    return str.split('=')[1];
}

function checkCity(city) {
    return (CITY_ARRAY.includes(city))
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
            console.log('(logReceiveMessage) + body.id ' + body.id) // Print the shortened url.
        }
    })
}

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