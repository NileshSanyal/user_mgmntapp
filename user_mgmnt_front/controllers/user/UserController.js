app.controller('UserController',function(UserService,$scope,$location,$window,$rootScope){
	var self = this;
	self.users = {};
	self.adduser = {};
	
	// self.clientData = {};
	
	self.user = function(){
		UserService.getUsers().then(function(data){
			self.users = data;
		});
	}

	self.saveuser = function(){
		UserService.saveUser(self.adduser).then(function(response){
			if(response.user.status == "Active"){
				
				self.user();
				self.adduser = {};
			}else{
				self.user();
				self.adduser = {};
			}
			// console.log(response);
			 
		});

	}

	self.getUserById = function(userId){
		UserService.getUserById(userId).then(function(response){
			if(response.status == "Active"){
				self.adduser = response;
			}
		});
	}

	self.deleteUser = function(userId){
		UserService.deleteUser(userId).then(function(response){
			if(response.message != ""){
				self.user();
			}
		});
	}
	
	
});