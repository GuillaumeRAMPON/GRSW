// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', ['ngCookies']).controller('MainController', function ($scope, $location, $http, UserService) {

    $scope.logged = UserService.isLoggedIn();

    $scope.getHistToDB = function () {

        if (UserService.isLoggedIn()) {
            $http({
                method: 'GET',
                url: '/api/getHistToDB'
            });
        }

    }


    ticker = '1rPCAC';
        $http({
            method: 'GET',
            url: '/api/getDailyBourso?ticker='+ ticker
        }).then(function successCallback(response) {
            $scope.tickerdata = response.data; 
            var chart = c3.generate({
                bindto: '#mychart1',
                data: {
                    json: response.data.d.QuoteTab,
                    //url: '/api/stockdaily?ticker=' + tickers[i],
                    mimeType: 'json',
                    xFormat: '%S',
                    keys: {
                        x: 'd',
                        value: ['c'],
                    }
                },
                axis: {
                    x: { show: false },
                    y: {
                        tick: {
                            count: 5,
                            format: d3.format('.0f')
                        }
                    }
                },    
                size: { height: 100, width: 150 },
                point: { show: false },
                legend: { hide: true }
            });

        })

        ticker2 = '$INDU';
        $http({
            method: 'GET',
            url: '/api/getDailyBourso?ticker='+ ticker2
        }).then(function successCallback(response) {
            $scope.tickerdata2 = response.data; 
            var chart = c3.generate({
                bindto: '#mychart2',
                data: {
                    json: response.data.d.QuoteTab,
                    //url: '/api/stockdaily?ticker=' + tickers[i],
                    mimeType: 'json',
                    xFormat: '%S',
                    keys: {
                        x: 'd',
                        value: ['c'],
                    }
                },
                axis: {
                    x: { show: false },
                    y: {
                        tick: {
                            count: 5,
                            format: d3.format('.0f')
                        }
                    }
                },    
                size: { height: 100, width: 150 },
                point: { show: false },
                legend: { hide: true }
            });

        })

        ticker3 = '$COMPX';
        $http({
            method: 'GET',
            url: '/api/getDailyBourso?ticker='+ ticker3
        }).then(function successCallback(response) {
            $scope.tickerdata3 = response.data; 
            var chart = c3.generate({
                bindto: '#mychart3',
                data: {
                    json: response.data.d.QuoteTab,
                    //url: '/api/stockdaily?ticker=' + tickers[i],
                    mimeType: 'json',
                    xFormat: '%S',
                    keys: {
                        x: 'd',
                        value: ['c'],
                    }
                },
                axis: {
                    x: { show: false },
                    y: {
                        tick: {
                            count: 5,
                            format: d3.format('.0f')
                        }
                    }
                },    
                size: { height: 100, width: 150 },
                point: { show: false },
                legend: { hide: true }
            });

        })
    
    





    var tickers = ['1rPCAC', '$INDU','$COMPX'];
    var libelles = ['CAC 40', 'DOW JONES','NASDAQ'];
    
    $scope.tickticks = tickers;
    $scope.ticklibs = libelles;
    $scope.tickdata = [];


    /*
    for (i = 0; i < tickers.length; i++) {
        $http({
            method: 'GET',
            url: '/api/getDailyBourso?ticker='+ tickers[i]
        }).then(function successCallback(response) {
             $scope.tickdata[i] = response.data;
             console.log(i+"-"+response.data.d.Name);

             var chart = c3.generate({
                bindto: '#mychart'+i,
                data: {
                    json: $scope.tickdata[i].d.QuoteTab,
                    //url: '/api/stockdaily?ticker=' + tickers[i],
                    mimeType: 'json',
                    xFormat: '%S',
                    keys: {
                        x: 'd',
                        value: ['c'],
                    }
                },
                axis: {
                    x: { show: false },
                    y: {
                        tick: {
                            count: 5,
                            format: d3.format('.0f')
                        }
                    }
                },    
                size: { height: 100, width: 150 },
                point: { show: false }
            });


        })
    }
    */

    /*
    $http({
        method: 'GET',
        url: '/api/getDailyBourso?ticker=1rPCAC', 
    }).then(function successCallback(response) {
         $scope.cac40 = response.data;

            var chart = c3.generate({
                bindto: '#chartCAC',
                data: {
                    json: $scope.cac40.d.QuoteTab,
                    //url: '/api/stockdaily?ticker=' + tickers[i],
                    mimeType: 'json',
                    xFormat: '%S',
                    keys: {
                        x: 'd',
                        value: ['c'],
                    }
                },
                axis: {
                    x: { show: false },
                    y: {
                        tick: {
                            count: 5,
                            format: d3.format('.0f')
                        }
                    }
                },    
                size: { height: 100, width: 150 },
                point: { show: false }
            });
        
        
    })
    */

    /*
    var tickers = ['.IXIC', '.INX','PX1'];
    var libelles = ['NASDAQ', 'SP500','CAC 40'];

    $scope.arr = libelles;

    for (i = 0; i < tickers.length; i++) {
        var chart = c3.generate({
            bindto: '#mychart' + i,
            data: {
                //json: [                    
                //    { "closedate": "2017-06-05 12:45:00", "closevalue": "33.8000" },
                //    { "closedate": "2017-06-02 13:45:00", "closevalue": "33.7400" }
                //],
                url: '/api/stockdaily?ticker=' + tickers[i],
                mimeType: 'json',
                xFormat: '%Y-%m-%d %H:%M:%S', // how the date is parsed
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
                        format: '%m-%d %H:%M',  // '%Y-%m-%d %H:%M:%S'
                        fit: true,
                        culling: {
                            max: 5 // the number of tick texts will be adjusted to less than this value
                        }
                    }
                }
            },
            grid: {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            },
            zoom: {
                enabled: true
            },
            size: {
                height: 240,
                width: 480
            },
            point: {
                show: false  //N'affiche pas les points
            }
        });
    }
    */

});