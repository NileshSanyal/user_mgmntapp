app.controller('LogoutController',function($localStorage,$location,$http,$window){
    var self = this;
    var baseUrl = "http://localhost/";
    self.logout = function(){
    	alert('LOG OUT CONTROLLER');
    	delete $localStorage.currentUser;
        // $http.defaults.headers.common.Authorization = '';


        $http.defaults.headers.common["x-access-token"] = '';

        // $http.defaults.headers.common["Authorization"] = '';
        $window.location.href = baseUrl + 'user_mgmntapp/user_mgmnt_front/login';

    	// $cookieStore.remove('currentUser');
    	// $location.path('/login');
    }


});