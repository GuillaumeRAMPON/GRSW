(function()
{
    angular
        .module("stockview")
        .controller("LoginController2",LoginController2);

    function LoginController2($location,UserService)
    {
        var vm=this;
        vm.login=login;

        function login(user)
        {
            //console.log(user.username);
            UserService.loginUser(user,function(response)
            {
                //console.log(response);
                $location.url('/');
            })
        };

       
    }

})();