// public/js/controllers/StockListCtrl.js

angular.module('StockListCtrl', []).controller('StockListController', function ($scope,$http) {

    $scope.tagline = 'Liste suivie!';
    $scope.resultat = "init";
    $http({
        method: 'GET',
        url: '/api/favlist'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.resultat = "ok";
        $scope.favlist = response.data;
        
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $scope.resultat = "ko";
    });

});