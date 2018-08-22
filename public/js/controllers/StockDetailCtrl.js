// public/js/controllers/StockDetailCtrl.js

angular.module('StockDetailCtrl', []).controller('StockDetailController', function ($scope, $http, $routeParams) {

    $scope.tagline = 'Stock Detail ';
    $scope.ticker = $routeParams.ticker;
    $scope.portfolio = $routeParams.portfolio;

    function affichelignefolio() {
        //Recup portefeuille
        $http({
            method: 'GET',
            url: '/api/foliolist/' + $scope.portfolio
        }).then(function successCallback(response) {
             stocks = response.data;

            for (i = 0; i < stocks.length; i++) {
                if (stocks[i].code == $scope.ticker)
                {
                    stocks[i].valo = stocks[i].cours * stocks[i].qty;
                    valorevient = stocks[i].valeurJanvier + stocks[i].achat;
                    stocks[i].perfeur = stocks[i].valo + stocks[i].dividendes + stocks[i].vente - valorevient;
                    stocks[i].perfratio = stocks[i].perfeur / valorevient * 100;
                    $scope.position = stocks[i];
                }
            }
        })}

        affichelignefolio();

        $scope.saveLastValue = function()
        {
            $http({
            method: 'POST',
            url: '/api/savelastvalue/'+ $routeParams.portfolio + "/" + $routeParams.ticker + "/" + $scope.cours
        });
            affichelignefolio();
        }

    $scope.generatechart = function (gtype) {

        var chart = c3.generate({
            bindto: '#mychart',
            data: {
                /*json: [                    
                    { "closedate": "2017-06-05", "closevalue": "33.8000" },
                    { "closedate": "2017-06-02", "closevalue": "33.7400" }
                ],*/
                url: '/api/stockhist?gtype=' + gtype + '&ticker=' + $scope.ticker,
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
    };

    $scope.addTransaction = function () {
        //console.log("TATA "+$routeParams.portfolio);
        $scope.transaction.portfolio = $routeParams.portfolio;
        $scope.transaction.ticker = $scope.ticker;
        $http({
            method: 'POST',
            url: '/api/addtransaction/',
            data: $scope.transaction
        }).then(function successCallback(response) {
            $scope.listTransaction();
            affichelignefolio();

        });
    }

    $scope.listTransaction = function () {
        $http({
            method: 'GET',
            url: '/api/listtransaction/' + $routeParams.portfolio + "/" + $routeParams.ticker
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.transactions = response.data;
        });
    }

    $scope.listTransaction();

});