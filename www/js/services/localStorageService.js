app.service('$localStorageService', function($localStorage) {
	/*
	*  -1 :inactive status
	*   0 :guest status
	*   1 :active user
	*/
	this.getUserDetails= function() { 
		var user=$localStorage.user;
		if(angular.isUndefined(user.userDetails) || user.userDetails==null){
			return null;
		}
		return user.userDetails;
	}

	this.setUserDetails = function(userDetails) { 
		/*if(angular.isUndefined($localStorage.user) || $localStorageService.user==null){
			$localStorage.user={};	
		}*/
		$localStorage.user.userDetails=userDetails;
	};

	this.setUserInfo = function(a, b) {
		/*if(angular.isUndefined($localStorage.user) || $localStorageService.user==null){
			$localStorage.user={};	
		}*/
		$localStorage.user.userInfo=info;	
	};

	this.getUserInfo = function(a, b) {
		var user=$localStorage.user;
		if(angular.isUndefined(user.userInfo) || user.userInfo==null){
			return null;
		}
		return user.userInfo;	
	};

	this.setUserStatus = function(status) { 
		/*if(angular.isUndefined($localStorage.user)  || || $localStorageService.user==null){
			$localStorage.user={};	
		}*/
		$localStorage.user.userStatus=status;		
	}


	this.getUserStatus = function() { 
		var user=$localStorage.user;
		if(angular.isUndefined(user.userStatus) || user.userStatus==null){
			return null;
		}
		return user.userStatus; 
	};
	this.getUser = function() { 
		if(angular.isUndefined($localStorage.user) || $localStorage.user==null){
			return null;
		}
		return $localStorage.user;
	};
	this.setUser=function(){
		console.log("user initialized");
		$localStorage.user={};
	};
});