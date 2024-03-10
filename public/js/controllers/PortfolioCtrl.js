// public/js/controllers/PorfolioCtrl.js


angular.module('PortfolioCtrl', []).controller('PortfolioController', function ($scope, $http, $filter, $routeParams, UserService) {

    //$scope.tagline = 'Mon portefeuille';
    //$scope.resultat = "init";

    //$scope.pselected = "TEST";
    if (UserService.isLoggedIn()) {
        switch (UserService.currentUser()) {
            case 'GRN':
                $scope.portfolios = ['GRN', 'NBN', 'LRN', 'TEST'];
                break;
            case 'NBN':
                $scope.portfolios = ['NBN'];
                break;
            default:
                $scope.portfolios = ['TEST'];
        }
    }
    else {
        $scope.portfolios = ['TEST'];
        //$scope.portfolios = ['GRN', 'NBN', 'LRN', 'TEST'];
    }
    $scope.pselected = $scope.portfolios[0];
    if ($routeParams.portfolio != null) {
        if ($scope.portfolios.indexOf($routeParams.portfolio) != -1) {
            $scope.pselected = $routeParams.portfolio;
        }

    }

    affichefolio();

    $scope.switchPortfolio = function () {
        //console.log($scope.pselected);
        affichefolio();
    }

    $scope.getStockValues = function () {
        $http({
            method: 'GET',
            url: '/api/foliomaj/' + $scope.pselected
        });
        affichefolio();
    }

    $scope.saveHisto = function () {

        //TODO replace this insane date format code
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd ;

        var histo = {};
        histo.nom = $scope.pselected;
        histo.monday = today;
        histo.valo = $scope.valototale;
        histo.perfeur =  $scope.perftotale;
        histo.price = $scope.perftotaleratio;
        //console.log(histo);
        $http({
            method: 'POST',
            url: '/api/foliosavehisto/',
            data: histo
        }).then(function successCallback(response) {
            affichefolio();
        });
    }

    function affichefolio() {
        //Recup portefeuille
        $http({
            method: 'GET',
            url: '/api/foliolist/' + $scope.pselected
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.resultat = "ok";
            stocks = response.data;


            // Consolidation du portefeuille
            var valototale = 0;
            var perftotale = 0;
            var jantotale = 0;
            var achattotale = 0;
            var ventetotale = 0;
            var dividendestotale = 0;

            var chartpdata = [];

            for (i = 0; i < stocks.length; i++) {

                stocks[i].valo = stocks[i].cours * stocks[i].qty;
                valototale = valototale + stocks[i].valo;
                valorevient = stocks[i].valeurJanvier + stocks[i].achat;
                stocks[i].perfeur = stocks[i].valo + stocks[i].dividendes + stocks[i].vente - valorevient;
                perftotale = perftotale + stocks[i].perfeur;
                stocks[i].perfratio = stocks[i].perfeur / valorevient * 100;
                jantotale = jantotale + stocks[i].valeurJanvier;
                achattotale = achattotale + stocks[i].achat;
                ventetotale = ventetotale + stocks[i].vente;
                dividendestotale = dividendestotale + stocks[i].dividendes;

                if (stocks[i].valo > 0 || stocks[i].perfeur != 0) {
                    var chartitem = {};
                    chartitem.libelle = stocks[i].libelle;
                    chartitem.valo = stocks[i].valo;
                    chartitem.perfeur = stocks[i].perfeur;
                    chartpdata.push(chartitem);
                }


            }
            $scope.valototale = valototale;
            $scope.perftotale = perftotale;
            $scope.perftotaleratio = perftotale / jantotale * 100;
            $scope.jantotale = jantotale;
            $scope.achattotale = achattotale;
            $scope.ventetotale = ventetotale;
            $scope.dividendestotale = dividendestotale;
            $scope.foliolist = stocks;

            c3.generate({
                bindto: '#chartp',
                size: {
                    height: 600,
                    width: 600
                },
                data: {
                    json: chartpdata,
                    type: 'bar',
                    keys: {
                        x: 'libelle', // it's possible to specify 'x' when category axis
                        value: ['valo', 'perfeur']
                    }
                },
                axis: {
                    rotated: true,
                    x: {
                        type: 'category'
                    }
                }
            });




        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.resultat = "ko";
        });

        // Recup synthese portefeuille Classe d'actif
        $http({
            method: 'GET',
            url: '/api/foliosumc/' + $scope.pselected
        }).then(function successCallback(response) {

            var outjsonObj = [];

            for (var i in response.data) {
                var line = [];
                line.push(response.data[i]._id);
                line.push(response.data[i].amount);
                outjsonObj.push(line);
            }
            var chart = c3.generate({
                bindto: '#chartsumc',
                size: {
                    height: 300,
                    width: 400
                },
                data: {
                    columns: outjsonObj,
                    type: 'pie'
                }
            });

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.resultat = "ko";
        });

        // Recup synthese portefeuille Secteurs
        $http({
            method: 'GET',
            url: '/api/foliosums/' + $scope.pselected
        }).then(function successCallback(response) {

            var outjsonObj = [];

            for (var i in response.data) {
                var line = [];
                line.push(response.data[i]._id);
                line.push(response.data[i].amount);
                outjsonObj.push(line);
            }
            var chart = c3.generate({
                bindto: '#chartsums',
                size: {
                    height: 300,
                    width: 400
                },
                data: {
                    columns: outjsonObj,
                    type: 'pie'
                }
            });


        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.resultat = "ko";
        });

        // Recup synthese portefeuille Geographie
        $http({
            method: 'GET',
            url: '/api/foliosumg/' + $scope.pselected
        }).then(function successCallback(response) {

            var outjsonObj = [];

            for (var i in response.data) {
                var line = [];
                line.push(response.data[i]._id);
                line.push(response.data[i].amount);
                outjsonObj.push(line);
            }
            var chart = c3.generate({
                bindto: '#chartsumg',
                size: {
                    height: 300,
                    width: 400
                },
                data: {
                    columns: outjsonObj,
                    type: 'pie'
                }
            });

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.resultat = "ko";
        });

        // Recup historique weekly
        $http({
            method: 'GET',
            url: '/api/foliohistw/' + $scope.pselected
        }).then(function successCallback(response) {

            var charthpedata = []; //perf
            var charthprdata = []; //price
            var charthvadata = []; //valo

            for (var i in response.data) {
                var line = {};
                line.monday = $filter('date')(response.data[i].monday, "yyyy-MM-dd");
                line.perfeur = response.data[i].perfeur;
                charthpedata.push(line);
                var line = {};
                line.monday = $filter('date')(response.data[i].monday, "yyyy-MM-dd");
                line.price = response.data[i].price;
                charthprdata.push(line);
                var line = {};
                line.monday = $filter('date')(response.data[i].monday, "yyyy-MM-dd");
                line.valo = response.data[i].valo;
                charthvadata.push(line);


            }


            var chart = c3.generate({
                bindto: '#charthpe',
                size: {
                    height: 300,
                    width: 370
                },
                data: {
                    json: charthpedata,
                    type: 'bar',
                    keys: {
                        x: 'monday', // it's possible to specify 'x' when category axis
                        value: ['perfeur']
                    }
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            culling: {
                                max: 5 // the number of tick texts will be adjusted to less than this value
                            },
                            format: '%Y-%m-%d'  // '%Y-%m-%d %H:%M:%S'
                        }
                    }
                }
            });

            var chart = c3.generate({
                bindto: '#charthpr',
                size: {
                    height: 300,
                    width: 370
                },
                data: {
                    json: charthprdata,
                    type: 'spline',
                    keys: {
                        x: 'monday', // it's possible to specify 'x' when category axis
                        value: ['price']
                    }
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            culling: {
                                max: 5 // the number of tick texts will be adjusted to less than this value
                            },
                            format: '%Y-%m-%d'  // '%Y-%m-%d %H:%M:%S'
                        }
                    }
                },
                point: {
                    show: false  //N'affiche pas les points
                }
            });

            var chart = c3.generate({
                bindto: '#charthva',
                size: {
                    height: 300,
                    width: 370
                },
                data: {
                    json: charthvadata,
                    type: 'area',
                    keys: {
                        x: 'monday', // it's possible to specify 'x' when category axis
                        value: ['valo']
                    }
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            culling: {
                                max: 5 // the number of tick texts will be adjusted to less than this value
                            },
                            format: '%Y-%m-%d'  // '%Y-%m-%d %H:%M:%S'
                        }
                    }
                },
                point: {
                    show: false  //N'affiche pas les points
                }
            });


        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.resultat = "ko";
        });
    }
});

