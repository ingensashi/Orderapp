'use strict';

app.controller('ParentCtrl',function($scope,$state,$localStorageService) {

	var init=function(){
		if($localStorageService.getUser()==null){
			$localStorageService.setUser();
		}
	};
	init();
	$scope.user = {};
	$scope.stateDetails=$state;
	$scope.headerTitle={};
});