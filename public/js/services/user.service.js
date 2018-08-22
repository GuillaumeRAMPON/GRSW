(function () 
{
  angular
    .module('stockview')
    .factory('UserService', UserService);

  function UserService()
  {
    var loguser='';
    
    var service = {
        loginUser : loginUser,
        logoutUser : logoutUser,
        isLoggedIn : isLoggedIn,
        currentUser : currentUser
    };
    return service;
    //var isLoggedIn = false;

    function loginUser (user,callback)
    {
        if (user.username=="grn" & user.password=="grn")
        {
          loguser = "GRN";
          callback(loguser);
        }
        if (user.username=="nbn" & user.password=="n")
        {
          loguser = "NBN";
          callback(loguser);
        }
    };

function logoutUser ()
    {
        loguser = "";
    };

    function isLoggedIn()
    {
      if (loguser =="")
      {
          return false;
      }
      else
      {
          return true;
      }
    };

    function currentUser()
    {
      return loguser;
    };

  }
  

})();