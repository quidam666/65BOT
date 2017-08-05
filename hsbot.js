const util = require('util')
const HOST = "https://65info.tw"

module.exports = {

    repeatUserText: function (event, message) {
        event.reply({ type: 'text', text: message })
    },

    showFindActivitiesInCity: function (event, name, city) {
        event.reply({ type: 'text', text: '親愛的' + name + '，這是本月在' + city + '開的課程：' })
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
        // event.reply({ type: 'text', text: '親愛的 ' + userProfile.displayName + ' 我聽不懂您在說什麼，請從下方「按我按我」的主選單開始喔！' })
    },

    showApplyInfo: function (event, applyText) {
        event.reply({ type: 'text', text: '請聯絡：' + applyText })
    },

    reply65Text: function (event, text, packageId, stickerID) {
        event.reply(
            [
                {
                    type: 'text',
                    text: text
                },

                {
                    type: 'sticker',
                    packageId: packageId,
                    stickerId: stickerID
                }]
        )
    },

    replyYoureWelcome: function (event, userProfile) {
        event.reply(
            [
                {
                    type: 'text',
                    text: userProfile.displayName + " 不客氣"
                },

                {
                    type: 'sticker',
                    packageId: '1',
                    stickerId: '132'
                }]
        )
    },

    showChallengeDescription: function (event, description) {
        event.reply({ type: 'text', text: description })
    },

    showDailyChallenge: function (event) {
        event.reply(
            [
                {
                    type: 'text',
                    text: "看得到圖裡面有一個嬰兒嗎？"
                },

                {
                    type: 'image',
                    originalContentUrl: 'https://65info.tw/uploads/assets/59859128d4fdab43dc1bad28/image349.jpg',
                    previewImageUrl: 'https://65info.tw/uploads/assets/59859128d4fdab43dc1bad28/thumb-image349.jpg'
                }]
        )
    },

    showKnowMore: function (event, knowMore) {
        var knowledge;

        if (knowMore == "了解更多「喘息相關」的服務") {
            knowledge = "到咖手：我們以專業的照顧小組模式提供「專業分工，分時共聘的居家照顧」服務，目前提供協助「亞急性」「亞健康型」的大寶們日常生活、急慢性病照顧及失智症的陪伴照顧為主要服務訴求。同時，也針對會員家中的學童提供代送診的照顧服務。總之，協助請託會員的「家人」照顧，就是「到咖手」服務的「對象」啦！\n\n\n 中化銀髮事業：長輩的生活照顧需要，總讓孝心子女在事業與照顧之間精疲力竭。照顧不應是難以承受的親情負擔，中化居家照顧用專業陪伴，細心體貼您的父母，為家中親情創造出更多的喘息空間。"
        } else if (knowMore == "了解更多「身體相關」的服務") {
            knowledge = "愛迪樂健康促進團隊：透過治療師、體適能老師、醫療輔具專家，共同促進銀髮族、失智、失能者的職能表現及能量，藉由生活重建、自主管理、自我實現，創造豐富、多元且精彩的生命故事。\n\n\n芮宜健康：對熟齡健康議題有熱情使命的跨領域團隊，整合醫學與相關專業，以安全、有趣、有效傳達與實踐健康，讓大眾更了解熟齡群健康需求；並延長健康年數更能盡情享受人生。部落格：http://ampohealth.pixnet.net/blog"
        } else if (knowMore == "了解更多「心理相關」的服務") {
            knowledge = "眼神發亮的秘密：我們在乎熱情和行動力。我們相信，夢想的本質是想為自己完成的事、想經歷的現實、想為自己創造的生活方式，是行動實踐的Projects。期待集結在築夢路上的人，讓熱情感染彼此，真誠互動，給予彼此會讓一切變得更好助的協助。\n\n\n 家總關懷協會：為整合對長照家庭的服務，本會開辦國內首支《家庭照顧者關懷諮詢專線》。同時於2015年，設置新的0800507272照顧者通報諮詢專線，單一窗口之專線，提供家庭照顧者社會福利相關諮詢服務，除了線上提供諮詢服務外，也協助社會資源連結與轉介。"
        } else if (knowMore == "了解更多「揪團出遊」的服務") {
            knowledge = "多扶假期：和家人在一起，就是旅行最大的幸福。多扶假期 給你尊榮專屬旅程5fun心: 免煩惱｜專屬旅遊管家包車遊，開車、食宿安排免煩惱！"
        }
        event.reply({ type: 'text', text: knowledge })
    },

    askLocationWithCarousel: function (event) {
        event.reply({
            type: 'template',
            altText: '請問您的居住地是？',
            template: {
                type: 'carousel',
                columns: [{
                    thumbnailImageUrl: 'https://65info.tw/uploads/assets/59858800d4fdab417a5148ef/thumb-1.jpg',
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
                    thumbnailImageUrl: 'https://65info.tw/uploads/assets/59858800d4fdab417a5148f0/thumb-2.jpg',
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
                    thumbnailImageUrl: 'https://65info.tw/uploads/assets/59858800d4fdab417a5148f2/thumb-3.jpg',
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
                    thumbnailImageUrl: 'https://65info.tw/uploads/assets/59858800d4fdab417a5148f3/thumb-4.jpg',
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
                    thumbnailImageUrl: 'https://65info.tw/uploads/assets/59858800d4fdab417a5148f1/thumb-5.jpg',
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
                columns: [
                    {
                        thumbnailImageUrl: 'https://65info.tw/uploads/assets/59858884d4fdab418e1933e0/thumb-b3.jpg',
                        title: '喘息服務諮商',
                        text: '找不到時間做自己的事嗎？好想休息一下，卻找不到幫手嗎？專業照顧人員來協助您！',
                        actions: [{
                            type: 'uri',
                            label: '到咖手',
                            uri: 'https://line.me/R/ti/p/%40docaso885'
                        }, {
                            type: 'uri',
                            label: '中化',
                            uri: 'http://www.cscccare.com/zh-tw/service/service.aspx#content'
                        }, {
                            type: 'postback',
                            label: '了解更多',
                            data: '了解更多「喘息相關」的服務'
                        }]
                    }, {
                        thumbnailImageUrl: 'https://65info.tw/uploads/assets/59858884d4fdab418e1933dd/thumb-b1.jpg',
                        title: '身體相關',
                        text: '這裡有專業的治療師團隊，提供您身體健康相關的諮詢服務',
                        actions: [{
                            type: 'uri',
                            label: '愛迪樂團隊',
                            uri: 'https://line.me/R/ti/p/%40rrg9564e'
                        }, {
                            type: 'uri',
                            label: '芮宜健康',
                            uri: 'https://line.me/R/ti/p/%40zkh7602g'
                        }, {
                            type: 'postback',
                            label: '了解更多',
                            data: '了解更多「身體相關」的服務'
                        }]
                    }, {
                        thumbnailImageUrl: 'https://65info.tw/uploads/assets/59858884d4fdab418e1933de/thumb-b2.jpg',
                        title: '心理相關',
                        text: '睡不好，總是覺得焦慮煩躁嗎？這裡有專業心理專家，陪您釐清目前的壓力來源',
                        actions: [{
                            type: 'uri',
                            label: '眼神微亮計畫',
                            uri: 'https://www.facebook.com/ShiningEyesProject/'
                        }, {
                            type: 'uri',
                            label: '家總關懷協會',
                            uri: 'http://www.familycare.org.tw/service/892'
                        }, {
                            type: 'postback',
                            label: '了解更多',
                            data: '了解更多「心理相關」的服務'
                        }]
                    }, {
                        thumbnailImageUrl: 'https://65info.tw/uploads/assets/59858884d4fdab418e1933df/thumb-b4.jpg',
                        title: '揪團出遊',
                        text: '想帶長輩出去玩，卻又不知道可以去哪？長輩行動比較慢，參加一般旅行團又怕大家要等？我們幫你安排最適合家裡的活動',
                        actions: [{
                            type: 'uri',
                            label: '多扶',
                            uri: 'http://www.dfholidays.com/'
                        }, {
                            type: 'uri',
                            label: '智樂活',
                            uri: 'https://line.me/R/ti/p/%40sub6424w'
                        }, {
                            type: 'postback',
                            label: '了解更多',
                            data: '了解更多「揪團出遊」的服務'
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

    getWelfareColumnArray: function (welfares, startIndex, endIndex) {
        console.log("(getWelfareColumnArray) startIndex " + startIndex + " endIndex " + endIndex)

        var columns = []
        for (var i = startIndex, len = endIndex; i < endIndex; i++) {
            var welfare = {
                thumbnailImageUrl: HOST + welfares.welfares[i].photo_url,
                title: welfares.welfares[i].name,
                text: welfares.welfares[i].institution,
                actions: [{
                    type: 'uri',
                    label: '詳細資料',
                    uri: welfares.welfares[i].url
                }]
            }
            columns.push(welfare)
        }

        console.log("[HSBOT] getWelfareColumnArray " + columns.length)
        return columns
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

    // return Column Array
    getWelfareColumns: function (welfares) {
        var promise = new Promise(function (resolve, reject) {
            var columns
            columns = module.exports.getWelfareColumnArray(welfares, 0, 5)
            if (columns == false) {
                reject(Error("(getWelfareColumns) It broke"));
            }
            else {
                resolve(columns);
            }
        })
        return promise
    },


    // return Column Array
    getActivityColumns: function (activities) {
        console.log("(getActivityForJson) " + activities.length)
        var promise = new Promise(function (resolve, reject) {
            var columns
            columns = module.exports.getColumnArray(activities, 0, 5)
            if (columns !== undefined) {
                resolve(columns);
            }
            else {
                reject(Error("(getActivityForJson) It broke"));
            }
        })

        return promise
    },

    // showAddLocationToFavoriteDialog: function (event, location) {
    //     console.log("showAddLocationToFavoriteDialog " + location)
    //     event.reply({
    //         type: 'template',
    //         altText: '請問是否要將[' + location + ']加入您最關注的區域呢？',
    //         template: {
    //             type: 'confirm',
    //             text: '我想知道即時收到[' + location + ']的相關活動',
    //             actions: [{
    //                 type: 'message',
    //                 label: '好啊！',
    //                 text: '好啊！'
    //             }, {
    //                 type: 'message',
    //                 label: '暫時不要',
    //                 text: '暫時不要'
    //             }]
    //         }
    //     })
    // },

    askIfNeedCare: function (event) {
        event.reply({
            type: 'template',
            altText: '請問是否有照護需求呢？',
            template: {
                type: 'confirm',
                text: '請問是否有照護需求呢？',
                actions: [{
                    type: 'postback',
                    label: '有的',
                    data: 'care_needed'
                }, {
                    type: 'postback',
                    label: '沒有',
                    data: 'care_not_needed'
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
                text: '請問是否有輔具需求呢？',
                actions: [{
                    type: 'postback',
                    label: '有的',
                    data: 'assistive_needed'
                }, {
                    type: 'postback',
                    label: '沒有',
                    data: 'assistive_not_needed'
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
                thumbnailImageUrl: 'https://65info.tw/uploads/assets/59859433d4fdab443d39f2dd/thumb-dsfr_53_1451481758.jpg',
                title: '請選擇您的身份別',
                text: '選擇您的身份別，讓我們為您找出最適合的福利！',
                actions: [{
                    type: 'postback',
                    label: '一般民眾',
                    data: 'id_normal'
                }, {
                    type: 'postback',
                    label: '中低收入戶',
                    data: 'id_low_middle_income'
                }, {
                    type: 'postback',
                    label: '低收入戶',
                    data: 'id_low_income'
                }]
            }
        })
    },

    showelfareInCarousel: function (event, userProfile, welfares) {
        if (welfares.welfares.length == 0) {
            event.reply({ type: 'text', text: "目前沒有適合您的福利，請打服務專線 0933-288936，有專人為您服務喔" })
        } else {
            module.exports.getWelfareColumns(welfares).then(function (result) {
                console.log("showelfareInCarousel final stage " + result.length)
                console.log(result)
                // console.log(event)
                var columns = result

                event.reply(
                    [
                        {
                            type: 'text',
                            text: "親愛的" + userProfile.displayName + "， 來看看適合您的福利！"
                        },
                        {
                            type: 'template',
                            altText: '親愛的',
                            template: {
                                type: 'carousel',
                                columns: columns
                            }
                        }
                    ]
                )
            }).catch(function (error) {
                // error 
                console.log('error')
            })
        }
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
            console.log('(showActivitiesInCarousel)' + zone + " / " + userProfile.displayName)
            // console.log("(Carousel) getActivityColumns " + util.inspect(columns, false, null))

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