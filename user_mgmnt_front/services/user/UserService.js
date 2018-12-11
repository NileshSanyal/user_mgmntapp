app.service('UserService',function($http,$q,$location,$localStorage){
	var host = $location.host();
	// var baseUrl = "http://"+host+"/user_mgmntapp/user_mgmnt_front/";

	var baseUrl = "http://localhost:3000/";

	this.getUsers = function(){

		var defer = $q.defer();

		$http({
			method : 'GET',
			url : baseUrl + 'api/user/list',

			//
		 	/*withCredentials: true,
            headers: {
                'Authorization': 'x-access-token ' + $localStorage.currentUser.token
            }*/
			//

			/**/
			/* headers : {
            	"Content-Type":"application/json",
            	"Authorization" : 'x-access-token ' + $localStorage.currentUser.token
    		}*/
			/**/


		}).then(function(resp){
			return defer.resolve(resp.data);
		},
		function(error){
			defer.reject();
		});

		return defer.promise;
	}

	this.saveUser = function(userData){
		var defer = $q.defer();
		$http({
			method : 'POST',
			url : baseUrl + 'api/user/create',
			data: {
				first_name: userData.first_name,
				last_name: userData.last_name,
				id: userData._id,
				email: userData.email,
				phone: userData.phone,
				password: userData.password
			}

		}).then(function(resp){
			defer.resolve(resp.data);
		},
		function(error){
			defer.reject(error.data);
		});
		return defer.promise;
	}

	this.getUserById = function(userId){

		var defer = $q.defer();

		$http({
			method : 'GET',
			url : baseUrl + 'api/user/edit/'+userId
		}).then(function(resp){
			// console.log(resp.data);
			return defer.resolve(resp.data);
		},
		function(error){
			defer.reject(error.data);
		});

		return defer.promise;
	}

	this.deleteUser = function(userId){

		var defer = $q.defer();
		if(confirm("Are you sure you want to remove it?")){
			$http({
				method : 'POST',
				url : baseUrl + 'api/user/delete/'+userId
			}).then(function(resp){
				return defer.resolve(resp.data);
			},
			function(error){
				defer.reject(error.data);
			});
		}
		

		return defer.promise;

	}
	
});