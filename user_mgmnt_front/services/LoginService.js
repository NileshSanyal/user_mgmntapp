app.service('LoginService',function($q,$http,$location,$localStorage){
    var host = $location.host();

	// var baseUrl = "http://"+host+"/law/dlfback/";

    var baseUrl = "http://localhost:3000/";

    /*this.logout = function(){

        // remove user from local storage and clear http auth header

        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    }*/

    this.login = function(loginCredentials)
                 {
                     var defer = $q.defer();

                    $http({
                        method : 'POST',
                        url : baseUrl + 'api/user/login',
                        data: {
                            email: loginCredentials.email,
                            password: loginCredentials.password
                        }

                    }).then(function(resp){

                        // add jwt token to auth header for all requests made by the $http service

                        // $http.defaults.headers.common.Authorization = 'Bearer ' + resp.token;
                                
                        $http.defaults.headers.common.Authorization = 'x-access-token ' + resp.token;

                        defer.resolve(resp.data);
                    },
                    function(error){
                        defer.reject(error.data);
                    });

                    return  defer.promise;
                    
                 }
});