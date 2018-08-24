//var http = require('http');
var request = require('request');
var StockHist = require('../models/StockHist.js');

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

module.exports.getHistToDB = function () {

    //console.log("getHistToDB");
    //tickers = ['BON.PA', 'OR.PA'];
    tickers = ['BON.PA', 'OR.PA', 'RIN.PA', 'CS.PA', 'LI.PA', 'BIM.PA', 'JCQ.PA', 'ML.PA', 'SAN.PA', 'SU.PA','INR.PA', 'SP5.PA', 'CSW.PA', 'VNM', 'WLD.PA', 'ASI.PA', 'OIL.PA', 'CAC.PA', 'L100.PA'];
    //libelles = ['BONDUELLE', 'L OREAL', 'VILMORIN', 'AXA', 'KLEPIERRE', 'BIOMERIEUX', 'JACQUET METALS', 'MICHELIN', 'SANOFI', 'SCHNEIDER ELECTRIC'];
    //tickers = ['INR.PA', 'SP5.PA', 'CSW.PA', 'VNM', 'WLD.PA', 'ASI.PA', 'OIL.PA', 'CAC.PA', 'L100.PA'];
    //libelles = ['ETF INDE', 'ETF SP500', 'ETF SUISSE', 'ETF VIETNAM', 'ETF MSCI WOLRD', 'ETF CHINE', 'ETF OIL', 'ETF CAC40', 'ETF FTSE 100'];
    for (i = 0; i < tickers.length; i++) {

        ticker = tickers[i];
        setTimeout(function () {
            getHistToDBOneStock(ticker);
        },60000 * i);

    }


    //getHistToDBOneStock("BON.PA");

}

function getHistToDBOneStock(ticker) {

    stockhist = new StockHist();
    stockhist.libelle = "TODO";
    stockhist.code = ticker;

    //console.log("getHistToDBOneStock");
    var gethistm = getHist(ticker, "MONTHLY");
    gethistm.then(function (result) {
        //console.log(result);
        stockhist.histm = result;

        var gethistw = getHist(ticker, "WEEKLY");
        gethistw.then(function (result) {
            //console.log(result);
            stockhist.histw = result;
            var gethistd = getHist(ticker, "DAILY");
            gethistd.then(function (result) {
                //console.log(result);
                stockhist.histd = result;

                //Suppression des anciennes données
                StockHist.find({ 'code': ticker }).remove().exec();
                //Sauvegarde des nouvelles données
                stockhist.save();
                
            }, function (err) {
                console.log(err);
            });

        }, function (err) {
            console.log(err);
        });

    }, function (err) {
        console.log(err);
    });


}

function getHist(ticker, gtype) {

    switch (gtype) {
        case 'MONTHLY':
            var timeseries = 'TIME_SERIES_MONTHLY';
            var jsonkey = 'Monthly Time Series';
            break;
        case 'WEEKLY':
            var timeseries = 'TIME_SERIES_WEEKLY';
            var jsonkey = 'Weekly Time Series';
            break;
        case 'DAILY':
            var timeseries = 'TIME_SERIES_DAILY';
            var jsonkey = 'Time Series (Daily)';
            break;
        default:
            console.log('Bad GTYPE');
    }


    return new Promise(function (resolve, reject) {
        request('http://www.alphavantage.co/query?function=' + timeseries + '&symbol=' + ticker + '&apikey=AML0', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body) // Print the google web page.
                //res.json(body);

                //Formatage des données sous forme d'un tableau simple de valeurs par date
                var json = require('jsonify');
                var srcjson = json.parse(body);
                var outjsonObj = [];

                //var srcjsonvalues = srcjson["Time Series (Daily)"];
                var srcjsonvalues = srcjson[jsonkey];
                for (var prop in srcjsonvalues) {
                    //console.log(`srcjsonvalues.${prop} = ${srcjsonvalues[prop]["4. close"]}`);

                    item = {}
                    item["date"] = prop;
                    item["value"] = `${srcjsonvalues[prop]["4. close"]}`;

                    //Filter bad 0 values
                    if (item["value"] != 0) {
                        outjsonObj.push(item);
                    }

                }

                //console.log(outjsonObj);
                resolve(outjsonObj);

            }
            else {
                //console.log(body); // Print the google web page.
                reject(error);
            }

        });

    })



}
