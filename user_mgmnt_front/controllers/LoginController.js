app.controller('LoginController',function(LoginService,$scope,$rootScope,$window,$location,$localStorage){

    var self = this;
    //self.sideBarFlag = 1;
    self.credentials = {};
    $rootScope.currentUser = '';
    // $rootScope.loginTemplateFlag = '1';
    self.login = function()
                {

                    // var logincredentials = [];
                    var logincredentials = {};

                    // self.logout();

                    var email = self.credentials.email;
                    var password = self.credentials.password;

                    // logincredentials.push(email);
                    // logincredentials.push(password);

                    logincredentials.email = email;
                    logincredentials.password = password;


                    // console.log('element::' + logincredentials.email);
                    LoginService.login(logincredentials).then(function(resp){
                        // console.log('Line 27:' + resp);
                        if(resp.error == true)
                        {
                            $scope.loginFlag = 0;
                        }
                        else
                        {


                            /* check if token is found */
                            if(resp.token){
                                // store username and token in local storage to keep user logged in between page refreshes
                                $localStorage.currentUser = { email: resp.email, userId: resp.id, token: resp.token };


                                $window.location.href = '/user_mgmntapp/user_mgmnt_front/home';

                            }


                        }

                    });
                }
    /*self.logout = function()
      {

        LoginService.logout();

          // $cookieStore.remove('currentUser');
          // $window.location.href = '/login';

          // remove user from local storage and clear http auth header
            // delete $localStorage.currentUser;
            // $http.defaults.headers.common.Authorization = '';
            // $window.location.href = '/login';
      }*/
});