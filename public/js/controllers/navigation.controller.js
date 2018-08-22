(function () {

  angular
    .module('stockview')
    .controller('navigationCtrl', navigationCtrl);

  //navigationCtrl.$inject = ['$location','authentication'];
  function navigationCtrl($location, UserService) {
    var vm = this;

    vm.isLoggedIn = UserService.isLoggedIn();

    vm.currentUser = UserService.currentUser();

    vm.dologout = function () 
    {
      UserService.logoutUser();
      vm.isLoggedIn = UserService.isLoggedIn();
    } 

  }

})();