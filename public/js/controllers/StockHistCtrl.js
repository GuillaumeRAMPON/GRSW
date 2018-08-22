// public/js/controllers/StockHistCtrl.js

angular.module('StockHistCtrl', []).controller('StockHistController', function ($scope, $http) {

    $scope.tagline = 'Historical values';

    var tickers = ['BON.PA', 'OR.PA', 'RIN.PA', 'INR.PA', 'SP5.PA', 'CSW.PA', 'VNM', 'WLD.PA', 'CS.PA', 'BIM.PA', 'JCQ.PA', 'ML.PA', 'SAN.PA', 'SU.PA', 'ASI.PA', 'OIL.PA', 'CAC.PA', 'L100.PA'];
    var libelles = ['BONDUELLE', 'L OREAL', 'VILMORIN', 'ETF INDE', 'ETF SP500', 'ETF SUISSE', 'ETF VIETNAM', 'ETF MSCI WOLRD', 'AXA', 'BIOMERIEUX', 'JACQUET METALS','MICHELIN', 'SANOFI', 'SCHNEIDER ELECTRIC', 'ETF CHINE', 'ETF OIL', 'ETF CAC40', 'ETF FTSE 100'];

    $scope.arr = libelles;

    for (i = 0; i < tickers.length; i++) {
        var chart = c3.generate({
            bindto: '#mycharth' + i,
            data: {
                //json: [                    
                //    { "closedate": "2017-06-05", "closevalue": "33.8000" },
                //    { "closedate": "2017-06-02", "closevalue": "33.7400" }
                //],
                //url: '/api/stockhist?ticker=RIN.PA',
                url: '/api/stockhist?gtype=DAILY&ticker=' + tickers[i],
                mimeType: 'json',
                keys: {
                    //                x: 'name', // it's possible to specify 'x' when category axis
                    x: 'closedate',
                    value: ['closevalue'],
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        //format: function (x) { return x.getUTCMonth() + 1; }  //.getFullYear()
                        //format: '%Y' // format string is also available for timeseries data
                        format: '%Y-%m-%d'  // '%Y-%m-%d %H:%M:%S'
                    }
                }
            }
        });

        c3.generate({
            bindto: '#mycharthl' + i,
            data: {
                url: '/api/stockhist?gtype=MONTHLY&ticker=' + tickers[i],
                mimeType: 'json',
                keys: {
                    //                x: 'name', // it's possible to specify 'x' when category axis
                    x: 'closedate',
                    value: ['closevalue'],
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'  // '%Y-%m-%d %H:%M:%S'
                    }
                }
            }
        });
    }

    /* var chart = c3.generate({
         bindto: '#mychart',
         data: {
             //json: [                    
             //    { "closedate": "2017-06-05", "closevalue": "33.8000" },
             //    { "closedate": "2017-06-02", "closevalue": "33.7400" }
             //],
             url: '/api/stockhist?ticker=RIN.PA',
             mimeType: 'json',
             keys: {
                 //                x: 'name', // it's possible to specify 'x' when category axis
                 x: 'closedate',
                 value: ['closevalue'],
             }
         },
         axis: {
             x: {
                 type: 'timeseries',
                 tick: {
                     //format: function (x) { return x.getUTCMonth() + 1; }  //.getFullYear()
                     //format: '%Y' // format string is also available for timeseries data
                     format: '%Y-%m-%d'  // '%Y-%m-%d %H:%M:%S'
                 }
             }
         }
     });*/




});