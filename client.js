var request = require("request")
var need_care = '593a92dfd4fdab11003d20e8'
var need_assistive = '593a92dfd4fdab11003d20ec'
var id_low_income = '593a92dfd4fdab11003d20e5'
var id_low_middle_income = '593a92dfd4fdab11003d20e6'
var host = "https://65info.tw/api/welfare?order=hot"

module.exports = {
    getwelfareConditionURL: function (city, identity, careRequire, assistiveRequire) {

        console.log("[Client] GetwelfareConditionURL " +
            city + "/" + identity + "/" + careRequire + "/" + assistiveRequire)

        var conditionURL
        var addConditionString = "&conditions[]="

        // city
        conditionURL = "division=" + encodeURIComponent(city)

        // identity
        if (identity === "id_low_income") {
            conditionURL = conditionURL + addConditionString + id_low_income
        } else if (identity === "id_low_middle_income") {
            conditionURL = conditionURL + addConditionString + id_low_middle_income
        }

        // need care
        if (careRequire === "care_needed") {
            conditionURL = conditionURL + addConditionString + need_care
        }

        // need assistive
        if (assistiveRequire === "assistive_needed") {
            conditionURL = conditionURL + addConditionString + need_assistive
        }

        return conditionURL
    },

    getWelfare: function (city, identity, need_care, need_assistive) {
        return new Promise(function (result, reject) {
            var walfare;
            var conditionString =
                module.exports.getwelfareConditionURL(city, identity, need_care, need_assistive)

            console.log('[Client getWelfare conditionString] ' + conditionString)
            console.log('[Client getWelfare] ' + host + conditionString)

            var options = {
                url: host + conditionString,
                headers: {
                    'Host': '65info.tw'
                }
            }
            request(options, function (error, response, body) {
                // console.log('error:', error); // Print the error if one occurred
                // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                // console.log('body:', body); // Print the HTML for the Google homepage.
                // walfare = JSON.parse(body)
                // console.log('walfare: ' + walfare.welfares[0].category);

                if (!error && response.statusCode == 200) {
                    result(body)
                } else {
                    reject(error)
                }
            })
        })
    }
}