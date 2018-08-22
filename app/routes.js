// app/routes.js

// grab the nerd model we just created
//var Nerd = require('./models/nerd');
var FavList = require('./models/favlist.js');
var FolioList = require('./controllers/portfolios.js');
var Transactions = require('./controllers/transactions.js');
var http = require('http');
var request = require('request');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.post('/api/checklogin/',function(req,res)
    {
        //console.log(req.body);
        loguser = "KO";
        if (req.body.username=="grn" & req.body.password=="grn")
        {
          loguser = "GRN";
        }
        if (req.body.username=="nbn" & req.body.password=="n")
        {
          loguser = "NBN";
        }
        
        res.send(loguser);
    });

    app.get('/api/favlist', function (req, res) {
        FavList.getlist(function (err, favlist) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            //console.log(favlist);

            if (err)
                res.send(err);

            res.json(favlist); // return all favorites in JSON format
        });
    });

    app.get('/api/foliolist/:id', function (req, res) {
        id = req.params.id;
        FolioList.getlist(id, function (err, foliolist) {
            if (err)
                res.send(err);
            res.json(foliolist); // return all favorites in JSON format
        });
    });

    app.get('/api/foliomaj/:id', function (req, res) {
        id = req.params.id;
        FolioList.maj(id);
        res.send();
    });

    app.post('/api/foliosavehisto/', function (req, res) {
        FolioList.saveHisto(req.body);
        res.send();
    });

    app.get('/api/foliosumc/:id', function (req, res) {
        id = req.params.id;
        FolioList.getsumc(id, function (err, foliolist) { if (err) res.send(err); res.json(foliolist); });
    });

    app.get('/api/foliosums/:id', function (req, res) {
        id = req.params.id;
        FolioList.getsums(id, function (err, foliolist) { if (err) res.send(err); res.json(foliolist); });
    });

    app.get('/api/foliosumg/:id', function (req, res) {
        id = req.params.id;
        FolioList.getsumg(id, function (err, foliolist) { if (err) res.send(err); res.json(foliolist); });
    });

    app.get('/api/foliohistw/:id', function (req, res) {
        id = req.params.id;
        FolioList.gethistw(id, function (err, foliolist) { if (err) res.send(err); res.json(foliolist); });
    });

    //Route for StockValues
    app.get('/api/stockhist', function (req, res) {
        //console.log('api stockhist');
        var ticker = req.query.ticker;
        switch (req.query.gtype) {
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

        //var request = require('request');
        request('http://www.alphavantage.co/query?function=' + timeseries + '&symbol=' + ticker + '&apikey=AML0', function (error, response, body) {
            //request('http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BON.PA&apikey=AML0&outputsize=full', function (error, response, body) {
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
                    item["closedate"] = prop;
                    item["closevalue"] = `${srcjsonvalues[prop]["4. close"]}`;

                    //Filter bad 0 values
                    if (item["closevalue"] != 0) {
                        outjsonObj.push(item);
                    }

                }

                //console.log(outjsonObj);
                //console.log(srcjson["Meta Data"]["2. Symbol"]);
                res.json(outjsonObj);

            }
            else {
                //console.log(body); // Print the google web page.
            }
        });


        //res.json({ user: 'tobi' });
        //res.send('http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BON.PA&apikey=AML0')
        //console.log('success');

    });

    app.get('/api/stockdaily', function (req, res) {
        var ticker = req.query.ticker;

        //var request = require('request');
        request('http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + ticker + '&interval=15min&apikey=AML0', function (error, response, body) {
            if (!error && response.statusCode == 200) {

                //Formatage des données sous forme d'un tableau simple de valeurs par date
                var json = require('jsonify');
                var srcjson = json.parse(body);
                var outjsonObj = [];

                var srcjsonvalues = srcjson["Time Series (15min)"];
                for (var prop in srcjsonvalues) {

                    item = {}
                    item["closedate"] = prop;
                    item["closevalue"] = `${srcjsonvalues[prop]["4. close"]}`;

                    outjsonObj.push(item);

                }

                res.json(outjsonObj);

            }
        });
    });

    app.post('/api/addtransaction/',function(req,res)
    {
        //console.log("TATA" + req.body.type);
        Transactions.add(req.body);

        res.send();
    });

    app.get('/api/listtransaction/:portfolio/:ticker', function (req, res) {
        
        Transactions.list(req.params.portfolio,req.params.ticker, function (err, resultlist) {
            if (err)
                res.send(err);
            res.json(resultlist); // return all favorites in JSON format
        });
    });

    app.post('/api/savelastvalue/:portfolio/:ticker/:value', function (req, res) {
        
        FolioList.updatevalue(req.params.portfolio,req.params.ticker,req.params.value , function (err, resultlist) {
            if (err)
                res.send(err);
            res.send(); 
        });
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/', function (req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};
