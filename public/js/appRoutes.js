// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/stocklist', {
            templateUrl: 'views/stocklist.html',
            controller: 'StockListController'
        })

		// stockhist page that will use the StockHistController
        .when('/stockhist', {
            templateUrl: 'views/stockhist.html',
            controller: 'StockHistController'
        })
        
        .when('/stockdetail', {
            templateUrl: 'views/stockdetail.html',
            controller: 'StockDetailController'
        })
        
        .when('/portfolio', {
            templateUrl: 'views/portfolio.html',
            controller: 'PortfolioController'
        })
        
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController2 as controller'
        })
        ;

		
    $locationProvider.html5Mode(true);

}]);