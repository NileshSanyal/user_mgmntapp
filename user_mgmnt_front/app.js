/*var app = angular.module('userapp',['ngRoute','datatables','ngStorage']);

app.config(function($routeProvider,$locationProvider){
	
	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/login',{
			templateUrl: 'views/login.html'
		})
		.when('/home',{
			templateUrl: 'views/user/home.html'
		})
		.when('/users',{
			templateUrl: 'views/user/list.html',
			 controller: 'UserController as user'
		});
	
	
});*/

 /*function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            // $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;

            $http.defaults.headers.common.Authorization = 'x-access-token ' + $localStorage.currentUser.token;

        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }*/


    //
    /* angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage', 'ngMockE2E'])
        .config(config)
        .run(run);*/

        var app = angular
        .module('userapp', ['ngRoute','datatables','ngStorage'])
        .config(config)
        .run(run);
 
    function config($routeProvider, $locationProvider) {
        // default route
        $locationProvider.html5Mode(true);

		$routeProvider
			.when('/login',{
				templateUrl: 'views/login.html'
			})
			.when('/home',{
				templateUrl: 'views/user/home.html'
			})
			.when('/users',{
				templateUrl: 'views/user/list.html',
				controller: 'UserController as user'
			})
			.when('/logout',{
				templateUrl: 'views/logout.html',
				controller: 'LogoutController as logout'
			
			});
    }
 
    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {

            // $http.defaults.headers.common["Authorization"] = $localStorage.currentUser.token;

            $http.defaults.headers.common["x-access-token"] = $localStorage.currentUser.token;

        }   

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
    //