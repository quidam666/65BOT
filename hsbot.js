const util = require('util')

module.exports = {

    repeatUserText: function (event, message) {
        event.reply({ type: 'text', text: message })
    },

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
                    title: '請選擇您居住的區域',
                    text: '我來自尊爵不凡的天龍國，北北基！',
                    actions: [{
                        type: 'postback',
                        label: '台北市',
                        data: '台北市'
                    }, {
                        type: 'postback',
                        label: '新北市',
                        data: '新北市'
                    }, {
                        type: 'postback',
                        label: '基隆',
                        data: '基隆'
                    }]
                }, {
                    thumbnailImageUrl: 'https://example.com/bot/images/item2.jpg',
                    title: '請選擇您居住的區域',
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
                }, {
                    thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
                    title: '請選擇您居住的區域',
                    text: '我來自中彰投！慶記、肉圓跟日月潭的家',
                    actions: [{
                        type: 'postback',
                        label: '台中',
                        data: '台中'
                    }, {
                        type: 'postback',
                        label: '彰化',
                        data: '彰化'
                    }, {
                        type: 'postback',
                        label: '南投',
                        data: '南投'
                    }]
                }, {
                    thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
                    title: '請選擇您居住的區域',
                    text: '我來自雲嘉南！路邊隨便吃都是美食的地方',
                    actions: [{
                        type: 'postback',
                        label: '雲林',
                        data: '雲林'
                    }, {
                        type: 'postback',
                        label: '嘉義',
                        data: '嘉義'
                    }, {
                        type: 'postback',
                        label: '台南',
                        data: '台南'
                    }]
                }, {
                    thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
                    title: '請選擇您居住的區域',
                    text: '我來自高屏地區！熱歸熱但是我們有風，臺北你們有嗎 (挑眉)',
                    actions: [{
                        type: 'postback',
                        label: '高雄',
                        data: '高雄'
                    }, {
                        type: 'postback',
                        label: '屏東',
                        data: '屏東'
                    }, {
                        type: 'postback',
                        label: '其它區域',
                        data: '其它區域'
                    }]
                }]
            }
        })
    },

    getConsultCarousel: function (event) {
        event.reply({
            type: 'template',
            altText: '請選擇您想要的需求',
            template: {
                type: 'carousel',
                columns: [{
                    thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
                    title: '身體相關',
                    text: '這裡有專業的治療師團隊，提供您身體健康相關的諮詢服務',
                    actions: [{
                        type: 'postback',
                        label: '愛迪樂團隊',
                        data: '愛迪樂團隊'
                    }, {
                        type: 'postback',
                        label: '芮宜健康',
                        data: '芮宜健康'
                    }, {
                        type: 'postback',
                        label: '了解更多',
                        data: '了解更多_身'
                    }]
                }, {
                    thumbnailImageUrl: 'https://example.com/bot/images/item2.jpg',
                    title: '心靈相關',
                    text: '睡不好，總是覺得焦慮煩躁嗎？這裡有專業心理專家，陪您釐清目前的壓力來源',
                    actions: [{
                        type: 'postback',
                        label: '眼神微亮的秘密',
                        data: 'jacob'
                    }, {
                        type: 'postback',
                        label: '家總關懷協會',
                        data: '家總'
                    }, {
                        type: 'postback',
                        label: '了解更多',
                        data: '了解更多_心'
                    }]
                }, {
                    thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
                    title: '喘息服務諮商',
                    text: '找不到時間做自己的事嗎？好想休息一下，卻找不到幫手嗎？專業照顧人員來協助您！',
                    actions: [{
                        type: 'postback',
                        label: '到咖手',
                        data: '到咖手'
                    }, {
                        type: 'postback',
                        label: '中化',
                        data: '中化'
                    }, {
                        type: 'postback',
                        label: '了解更多',
                        data: '了解更多_喘息'
                    }]
                }, {
                    thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
                    title: '揪團出遊',
                    text: '想帶長輩出去玩，卻又不知道可以去哪？長輩行動比較慢，參加一般旅行團又怕大家要等？我們幫你安排最適合家裡的活動',
                    actions: [{
                        type: 'postback',
                        label: '多扶',
                        data: '多扶'
                    }, {
                        type: 'postback',
                        label: '智樂活',
                        data: '智樂活'
                    }, {
                        type: 'postback',
                        label: '了解更多',
                        data: '了解更多_出遊'
                    }]
                }]
            }
        })
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
                    uri: activities[i].detail_url
                },
                {
                    type: 'postback',
                    label: '我要報名',
                    data: activities[i].apply_contact.toString()
                }]
            }
            columns.push(activity)
        }

        console.log("(getColumnArray) finish " + columns.length)
        return columns
    },

    // return JSONArray
    getActivityColumns: function (activities) {
        console.log("(getActivityForJson) " + activities.length)
        var promise = new Promise(function (resolve, reject) {
            var columns
            columns = module.exports.getColumnArray(activities, 0, 5)
            // if (activities.length > 5) {
            //     columns = module.exports.getColumnArray(activities, 0, 5)
            // } else {
            //     columns = module.exports.getColumnArray(activities, 0, activities.length)
            // }
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
        })
    },

    askIfNeedCare: function (event) {
        event.reply({
            type: 'template',
            altText: '請問是否有照護需求呢？',
            template: {
                type: 'confirm',
                text: '請問是有照護需求呢？',
                actions: [{
                    type: 'message',
                    label: '有的',
                    text: '有照護需求'
                }, {
                    type: 'message',
                    label: '沒有',
                    text: '無照護需求'
                }]
            }
        })
    },

    askIfNeedAssistive: function (event) {
        event.reply({
            type: 'template',
            altText: '請問是否有輔具需求呢？',
            template: {
                type: 'confirm',
                text: '請問是有輔具需求呢？',
                actions: [{
                    type: 'message',
                    label: '有的',
                    text: '有輔具需求'
                }, {
                    type: 'message',
                    label: '沒有',
                    text: '無輔具需求'
                }]
            }
        })
    },

    askIdentify: function (event) {
        event.reply({
            type: 'template',
            altText: '請選擇您的身份別',
            template: {
                type: 'buttons',
                thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
                title: '請選擇您的身份別',
                text: '選擇您的身份別，讓我們為您找出最適合的福利！',
                actions: [{
                    type: 'postback',
                    label: '一般民眾',
                    data: '一般民眾'
                }, {
                    type: 'postback',
                    label: '中低收入戶',
                    data: '中低收入戶'
                }, {
                    type: 'postback',
                    label: '低收入戶',
                    data: '低收入戶'
                }]
            }
        })
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
            console.log('(showActivitiesInCarousel)' + zone +" / " + userProfile.displayName)
            // console.log("(Carousel) getActivityColumns " + util.inspect(columns, false, null))

            event.reply({type: 'text', text: '親愛的' + userProfile.displayName + '，這是本月在' + zone + '開的課程：' })
            
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