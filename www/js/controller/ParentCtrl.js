'use strict';

app.controller('ParentCtrl',function($scope,$state,$localStorageService,$rootScope,$ionicScrollDelegate) {
	$ionicScrollDelegate.scrollTop();
	var init=function(){
		if($localStorageService.getUser()==null){
			$localStorageService.setUser();
		}
		/*if($localStorageService.getCartDetails()!=null){
			$scope.cartDetails=$localStorageService.getCartDetails();
			console.log("cart details",$scope.cartDetails.productCount);
		}*/
	};
	init();
	$scope.user = {};
	$scope.stateDetails=$state;
	$scope.cartDetails={};
	$scope.headerTitle={};
	
	$scope.moveToBackScreen=function(){
		var popElement=$rootScope.stateArray.pop();
		console.log("$rootScope.stateArray.pop() after  " +$rootScope.stateArray);
		angular.element(document.querySelector('#homeView')).scope().activeScreenDetail.name=popElement;
		
	}
});