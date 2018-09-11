// public/js/controllers/StockHistCtrl.js

angular.module('StockHistCtrl', []).controller('StockHistController', function ($scope, $http) {

    $scope.tagline = 'Historical values';

    $scope.stockgroup = ['ACTION', 'ETF'];
    $scope.lselected = 'ACTION';
    $scope.tickers = ['BOI.PA','BON.PA', 'OR.PA', 'RIN.PA', 'CS.PA', 'LI.PA', 'BIM.PA', 'JCQ.PA', 'ML.PA', 'SAN.PA', 'SU.PA'];
    $scope.libelles = ['BOIRON','BONDUELLE', 'L OREAL', 'VILMORIN', 'AXA', 'KLEPIERRE', 'BIOMERIEUX', 'JACQUET METALS', 'MICHELIN', 'SANOFI', 'SCHNEIDER ELECTRIC'];
    affichelist();

    $scope.switchHistList = function () {
        //console.log($scope.pselected);
        switch ($scope.lselected) {
            case 'ACTION':
                $scope.tickers = ['BOI.PA', 'OR.PA', 'RIN.PA', 'CS.PA', 'LI.PA', 'BIM.PA', 'JCQ.PA', 'ML.PA', 'SAN.PA', 'SU.PA'];
                $scope.libelles = ['BOIRON','BONDUELLE', 'L OREAL', 'VILMORIN', 'AXA', 'KLEPIERRE', 'BIOMERIEUX', 'JACQUET METALS', 'MICHELIN', 'SANOFI', 'SCHNEIDER ELECTRIC'];
                break;
            case 'ETF':
                $scope.tickers = ['INR.PA', 'SP5.PA', 'CSW.PA', 'VNM', 'WLD.PA', 'ASI.PA', 'OIL.PA', 'CAC.PA', 'L100.PA'];
                $scope.libelles = ['ETF INDE', 'ETF SP500', 'ETF SUISSE', 'ETF VIETNAM', 'ETF MSCI WOLRD', 'ETF CHINE', 'ETF OIL', 'ETF CAC40', 'ETF FTSE 100'];
                break;
            default:
                $scope.tickers = [];
                $scope.libelles = [];

        }

        affichelist();
    }

    //$scope.tickers = ['BON.PA', 'OR.PA', 'RIN.PA', 'INR.PA', 'SP5.PA', 'CSW.PA', 'VNM', 'WLD.PA', 'CS.PA', 'BIM.PA', 'JCQ.PA', 'ML.PA', 'SAN.PA', 'SU.PA', 'ASI.PA', 'OIL.PA', 'CAC.PA', 'L100.PA'];
    //$scope.libelles = ['BONDUELLE', 'L OREAL', 'VILMORIN', 'ETF INDE', 'ETF SP500', 'ETF SUISSE', 'ETF VIETNAM', 'ETF MSCI WOLRD', 'AXA', 'BIOMERIEUX', 'JACQUET METALS', 'MICHELIN', 'SANOFI', 'SCHNEIDER ELECTRIC', 'ETF CHINE', 'ETF OIL', 'ETF CAC40', 'ETF FTSE 100'];

    //$scope.arr = libelles;

    function affichelist() {

        for (i = 0; i < $scope.tickers.length; i++) {

            affichegraphticker($scope.tickers[i], i);

        }
    };

    function affichegraphticker(ticker, index) {

        setTimeout(function () {
            //console.log(ticker);
            var chart = c3.generate({
                bindto: '#mycharth' + index,
                data: {
                    //json: [                    
                    //    { "closedate": "2017-06-05", "closevalue": "33.8000" },
                    //    { "closedate": "2017-06-02", "closevalue": "33.7400" }
                    //],
                    //url: '/api/stockhist?ticker=RIN.PA',
                    url: '/api/stockhist?gtype=DAILY&ticker=' + ticker,
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
                bindto: '#mycharthl' + index,
                data: {
                    url: '/api/stockhist?gtype=MONTHLY&ticker=' + ticker,
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
        }, 100 * index);

    }


});