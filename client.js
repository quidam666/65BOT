var request = require("request")
var need_care = '593a92dfd4fdab11003d20e8'
var need_assistive = '593a92dfd4fdab11003d20ec'
var id_low_income = '593a92dfd4fdab11003d20e5'
var id_low_middle_income = '593a92dfd4fdab11003d20e6'
var host = "https://65info.tw/api/welfare?"

module.exports = {
    getWelfare: function (city, identity, need_care, need_assistive) {
        var conditionString =
            module.exports.getwelfareConditionURL(city, identity, need_care, need_assistive)
                .then(function (result) {
                    console.log('[Client getWelfare] ' + conditionString)

                    var options = {
                        uri: conditionString,
                        method: 'GET'
                    };

                    request(options, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body.id) // Print the shortened url.
                        }
                    })
                })
    },

    getwelfareConditionURL: function (city, identity, need_care, need_assistive) {

        console.log('[Client getwelfareConditionURL]')

        var conditionURL
        var addConditionString = "&conditions[]="

        // city
        conditionURL = "division=" + city

        // identity
        if (identity === "id_low_income") {
            conditionURL = addConditionString + id_low_income
        } else if (identity === "id_low_middle_income") {
            conditionURL = addConditionString + id_low_middle_income
        }

        // need care
        if (need_care === true) {
            conditionURL = addConditionString + need_care
        }

        // need assistive
        if (need_assistive === true) {
            conditionURL = addConditionString + need_assistive
        }
    },
}