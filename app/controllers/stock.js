var http = require('http');
var request = require('request');

module.exports.getLastValue = function (id, callback) {
    //var request = require('request');

    //request('http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + id + '&apikey=AML0', function (error, response, body) {
    request('http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + id + '&apikey=AML0', function (error, response, body) {
        if (!error && response.statusCode == 200) {

            //Formatage des données sous forme d'un tableau simple de valeurs par date
            var json = require('jsonify');
            var srcjson = json.parse(body);
            var outjsonObj = [];

            var obj = JSON.parse(body);
            
            var lastValue = obj["Time Series (Daily)"][Object.keys(obj["Time Series (Daily)"])[0]]["4. close"];
            
            //console.log(lastValue);
            
            //return lastValue;
            callback(null, lastValue);
            
        }
    })
}

