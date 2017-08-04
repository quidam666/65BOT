var request = require("request")
var need_care = '593a92dfd4fdab11003d20e8'
var need_assistive = '593a92dfd4fdab11003d20ec'
var id_low_income = '593a92dfd4fdab11003d20e5'
var id_low_middle_income = '593a92dfd4fdab11003d20e6'
var host = "https://65info.tw/api/welfare?"

module.exports = {
    getwelfareConditionURL: function (city, identity, need_care, need_assistive) {
        console.log('[Client getwelfareConditionURL]')

        var conditionURL
        var addConditionString = "&conditions[]="

        // city
        conditionURL = "division=" + city

        // identity
        if (identity === "id_low_income") {
            conditionURL = conditionURL + addConditionString + id_low_income
        } else if (identity === "id_low_middle_income") {
            conditionURL = conditionURL + addConditionString + id_low_middle_income
        }

        // need care
        if (need_care === true) {
            conditionURL = conditionURL + addConditionString + need_care
        }

        // need assistive
        if (need_assistive === true) {
            conditionURL = conditionURL + addConditionString + need_assistive
        }

        return conditionURL
    },

    getWelfare: function (city, identity, need_care, need_assistive) {
        var conditionString =
            module.exports.getwelfareConditionURL(city, identity, need_care, need_assistive)

        console.log('[Client getWelfare] ' + host + encodeURIComponent(conditionString))

        var options = {
            url: host + conditionString,
            headers: {
                'Host': '65info.tw'
            }
        }

        request(options, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });

        // var options = {
        //     uri: host + conditionString,
        //     method: 'GET'
        // };

        // request(options, function (error, response, body) {
        //     if (!error) {
        //         console.log('[getWelfare] response ' + response) // Print the shortened url.
        //     } else {
        //         console.log(error)
        //     }
        // })
    }
}