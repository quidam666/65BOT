const util = require('util')

module.exports = {
    showWelcomeText: function (event, userProfile) {
        event.reply({ type: 'text', text: '哈囉，' + userProfile.displayName + ' 歡迎使用銀髮生活小幫手，來看看我們為您精選的資訊吧！' })
    },

    askLocation: function (event) {
        event.reply({ type: 'text', text: '請問您在新北市的哪一區呢？請用文字回答，例：板橋' });
    },

    showComingSoonText: function (event, userProfile) {
        event.reply({ type: 'text', text: '哎呀' + userProfile.name + '\n很抱歉，我們目前尚未開放您的區域，我們會立即將您的所在地列入下一個搜尋目標，有消息馬上推播給您，敬請期待 :) ' })
    },

    showNonSenseText: function (event, userProfile) {
        event.reply({ type: 'text', text: '蛤，維大力？' + userProfile.displayName + ' 我聽不懂您在說什麼，請按下方 「HOMESEEN主選單」開始喔！' })
    },

    showApplyInfo: function (event, applyText) {
        event.reply({ type: 'text', text: '請聯絡：' + applyText })
    },

    askLocationWithCarousel: function (event) {


        event.reply({
            type: 'template',
            altText: '請問您的居住地是？',
            template: {
                type: 'carousel',
                columns: [{
                    thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
                    title: '請選擇您居住的城市',
                    text: '我來自天龍國，北北基',
                    actions: [{
                        type: 'postback',
                        label: '台北',
                        data: '台北'
                    }, {
                        type: 'postback',
                        label: '新北',
                        data: '新北'
                    }, {
                       type: 'postback',
                        label: '基隆',
                        data: '基隆'
                    }]
                }, {
                    thumbnailImageUrl: 'https://example.com/bot/images/item2.jpg',
                    title: '請選擇您居住的城市',
                    text: '我來自桃竹苗！名產有米粉、擂茶、還有...暫時想不到',
                    actions: [{
                        type: 'postback',
                        label: '桃園',
                        data: '桃園'
                    }, {
                        type: 'postback',
                        label: '新竹',
                        data: '新竹'
                    }, {
                        type: 'postback',
                        label: '苗栗',
                        data: '苗栗'
                    }]
                }]
            }
        });


        // event.reply({
        //     type: 'template',
        //     altText: '請問您的居住地是？',
        //     template: {
        //         type: 'carousel',
        //         columns: [{
        //             thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
        //             title: '我住北北基',
        //             text: '',
        //             actions: [{
        //                 type: 'postback',
        //                 label: '台北',
        //                 data: '台北'
        //             }, {
        //                 type: 'postback',
        //                 label: '新北',
        //                 data: '新北'
        //             }, {
        //                 type: 'postback',
        //                 label: '基隆',
        //                 data: '基隆'
        //             }]
        //         }, {
        //             thumbnailImageUrl: 'https://example.com/bot/images/item2.jpg',
        //             title: '我住桃竹苗',
        //             text: '',
        //             actions: [{
        //                 type: 'postback',
        //                 label: '桃園',
        //                 data: '桃園'
        //             }, {
        //                 type: 'postback',
        //                 label: '新竹',
        //                 data: '新竹'
        //             }, {
        //                 type: 'postback',
        //                 label: '苗栗',
        //                 data: '苗栗'
        //             }]
        //         }]
        //     }
        // })
    },

    getBenefitWithButtons: function (event, userProfile) {
        var username = userProfile.displayName
        event.reply({
            type: 'template',
            altText: '哈囉, ' + userProfile.displayName,
            template: {
                type: 'buttons',
                thumbnailImageUrl: 'https://image.ibb.co/k9OVLk/HOMESEEN_sticker_300.png',
                title: '親愛的' + userProfile.displayName,
                text: '來看看有哪些政府資源可以申請',
                actions: [{
                    type: 'uri',
                    label: '查詢福利資源',
                    uri: 'https://65info.com.tw/'
                }]
            }
        })
    },

    getActivitiesColumnByPage: function (activities, pageIndex) {
        var startIndex = pageIndex * 5;
        return module.exports.getActivitiesColumn(activities, startIndex, startIndex + 4)
    },

    getColumnArray: function (activities, startIndex, endIndex) {
        console.log("(getColumnArray) startIndex " + startIndex + " endIndex " + endIndex)

        var columns = []
        for (var i = startIndex, len = endIndex; i < endIndex; i++) {
            var activity = {
                thumbnailImageUrl: "https://example.com/bot/images/item1.jpg",
                title: activities[i].name,
                text: activities[i].content,
                actions: [{
                    type: 'uri',
                    label: '詳細資料',
                    uri: 'https://goo.gl/MAhiuo'
                },
                {
                    type: 'postback',
                    label: '我要報名',
                    data: activities[i].apply.toString()
                }]
            }
            columns.push(activity)
        }
        return columns
    },

    // return JSONArray
    getActivityColumns: function (activities) {
        console.log("(getActivityForJson) " + activities.length)
        var promise = new Promise(function (resolve, reject) {
            var columns
            if (activities.length > 5) {
                columns = module.exports.getColumnArray(activities, 0, 5)
            } else {
                columns = module.exports.getColumnArray(activities, 0, activities.length)
            }
            if (columns !== undefined) {
                resolve(columns);
            }
            else {
                reject(Error("(getActivityForJson) It broke"));
            }
        })

        return promise
    },

    showAddLocationToFavoriteDialog: function (event, location) {
        console.log("showAddLocationToFavoriteDialog " + location)
        event.reply({
            type: 'template',
            altText: '請問是否要將[' + location + ']加入您最關注的區域呢？',
            template: {
                type: 'confirm',
                text: '我想知道即時收到[' + location + ']的相關活動',
                actions: [{
                    type: 'message',
                    label: '好啊！',
                    text: '好啊！'
                }, {
                    type: 'message',
                    label: '暫時不要',
                    text: '暫時不要'
                }]
            }
        });
    },

    showActivitiesInCarousel: function (event, userProfile, zone, activities) {
        var username = userProfile.displayName

        console.log('(Carousel) ' + username)

        if (!activities) {
            console.log('(Carousel) ' + activities[0].name + " / " + activities[0].content)
        }

        var columns
        module.exports.getActivityColumns(activities).then(function (result) {
            columns = result
            console.log("(Carousel) getActivityColumns " + util.inspect(columns, false, null))

            event.reply({
                type: 'template',
                altText: '親愛的' + userProfile.displayName + '，這是本月在' + zone + '開的課程：',
                template: {
                    type: 'carousel',
                    columns: columns
                }
            })
        })
    },


    chooseFeature: function (bot, event) {
        if (event.message.type = 'text') {
            var msg = event.message.text
            event.reply(msg).then(function (data) {
                // success 
                console.log(msg)
            }).catch(function (error) {
                // error 
                console.log('error')
            })
        }
    }
}