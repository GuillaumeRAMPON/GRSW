(function () {
  angular
    .module('stockview')
    .factory('UserService', UserService);

  function UserService($http) {
    var loguser = '';

    var service = {
      loginUser: loginUser,
      logoutUser: logoutUser,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser
    };
    return service;
    
    function loginUser(user, callback) {

      $http({
        method: 'POST',
        url: '/api/checklogin/',
        data: user
      }).then(function successCallback(response) {
        //console.log(response.data);
        loguser = response.data;
        if (loguser == "KO") {
          loguser = "";
        }

        callback(loguser);



      });

    };

    function logoutUser() {
      loguser = "";
    };

    function isLoggedIn() {
      if (loguser == "") {
        return false;
      }
      else {
        return true;
      }
    };

    function currentUser() {
      return loguser;
    };

  }


})();