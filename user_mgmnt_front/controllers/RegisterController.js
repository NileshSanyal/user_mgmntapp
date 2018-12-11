app.controller('RegisterController',function(RegisterService,$scope,$rootScope,$window,$location,md5){
	var self = this;
	self.states = {};
	self.cities = {};
	self.user = {};
	$rootScope.loginTemplateFlag = '1';
	self.getStates = function(){
		RegisterService.getStates().then(function(resp){
			
			self.states = resp;
		});
	}
	self.getCityByState = function(){
		RegisterService
				.getCityByState($scope.register.user.state_id_fk)
					.then(
						function(resp)
						{
							console.log(resp);
							self.cities = resp;
						},
						function(error)
						{

						}
					);
	}

	self.addUser = function(){
		
		RegisterService.addClient(self.user).then(function(data){
			
			if(data == 0)
			{
				$scope.existingEmail = "Email id already exists";
			}
			else
			{
				$window.location.href = "/law/dlf/login";

			}
		});
		
	}
});