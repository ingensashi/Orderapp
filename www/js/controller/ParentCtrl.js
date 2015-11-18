'use strict';

app.controller('ParentCtrl',function($scope,$state,$localStorageService,$rootScope,$ionicModal,$ionicScrollDelegate,$cordovaGeolocation,$http) {
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

	};
	var positionTracker=function(pos){
		$http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+
				pos.lat+","+pos.long+"&sensor=true").success( function(response) {
					$scope.locationData=response.results;
					console.log($scope.locationData);
					$scope.location =$scope.locationData[0].formatted_address.split(",");
					$scope.searchString= $scope.location[0]+","+$scope.location[1];
					alert($scope.searchString);	
				});
	};


	var getCurrentLocation=function(callback){
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
		$cordovaGeolocation
		.getCurrentPosition(posOptions)
		.then(function (position) {
			console.log("pos",position);
			var pos={};
			pos.lat  = position.coords.latitude;
			pos.long = position.coords.longitude;
			console.log("pos",pos);
			callback(pos);
		}, function(err) {
			// error
			alert("please enable gps");
		});

	};




	$scope.showLocation=function(){
		cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
			if(!enabled){
				//alert("Location is " + (enabled ? "enabled" : "disabled"));
				cordova.plugins.diagnostic.switchToLocationSettings();
			}
		}, function(error){
		    alert("The following error occurred: "+error);
		});
		getCurrentLocation(positionTracker);
	};

	
	//TOdo: This is common for both model
	$ionicModal.fromTemplateUrl('templates/order.html', {
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal1) {
		// modal.show();
		$scope.modal1 = modal1;
	});
	$scope.openModal1 = function() {
		console.log("open modal", $scope.modal1);
		$scope.modal1.show();
	};
	$scope.closeModal1 = function() {
		$scope.modal1.hide();
	};
	
});