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