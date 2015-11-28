'use strict';

app.controller('ParentCtrl',function($scope,$state,$localStorageService,$CartService,$rootScope,$ionicModal,$ionicScrollDelegate,$cordovaGeolocation,$http,$ionicPopup) {
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
	var templateUrl='';
	var myPopup=null;

	$scope.moveToBackScreen=function(){
		var popElement=$rootScope.stateArray.pop();
		console.log("$rootScope.stateArray.pop() after  " +$rootScope.stateArray);
		angular.element(document.querySelector('#homeView')).scope().activeScreenDetail.name=popElement;

	};
	
	
	 $scope.cityNames = ["New Delhi", "Noida", "Gurgaon", "Ghaziabad", "Faridabad"];
	 
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

	$scope.openFooterModel=function(flag){
		switch(flag){
		case 'order':
		templateUrl='templates/order.html';
		openModal(templateUrl);
			break;
		case 'delivery':
			
			break;
		case 'wallet':
			templateUrl='templates/wallet.html';
			openModal(templateUrl);

			break;
		case 'refferal':
			templateUrl='templates/refferal.html';
			openModal(templateUrl);
			break;
		case 'more':
			break;
		}

	}
	var openModal=function(templateUrl){
		$ionicModal.fromTemplateUrl(templateUrl, {
			scope : $scope,
			animation : 'slide-in-up'
		}).then(function(modal) {
			// modal.show();
			$scope.modal = modal;
			$scope.modal.show();
		});
	}
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	$scope.closeOrderModal = function() {
		$scope.modal.hide();
		angular.element(document.querySelector('#homeView')).scope().activeScreenDetail.name='home';
		$rootScope.stateArray=[];
	};

	$scope.editItemList=function(product){
		$rootScope.stateArray=[];
		angular.element(document.querySelector('#homeView')).scope().activeScreenDetail.name='addToppins';
		$scope.cartDetails.activeProduct=product;
		$rootScope.stateArray=['home'];
		$scope.modal1.hide();
	};

	$scope.Checkout = function(activity) {
		$scope.event1 ='Track Location';
		myPopup = $ionicPopup.show({
			templateUrl : 'templates/itemPopup.html',
			cssClass : 'full-width;',
			scope : $scope,
		});
		myPopup.then(function(res) {
		});
	};
	$scope.selectLocation=function(activity){
		switch(activity){
		case 'Manually':
			myPopup.close();
			$scope.closeModal();
			templateUrl='templates/addressDetail.html';
			openModal(templateUrl);
			break;
		case 'Enable':
			$scope.showLocation();
			break;
		}
	};

	$scope.addItemToCart=function(product){
		$CartService.addItemToCart(product,$scope.cartDetails);
	};

	$scope.removeItemFromCart=function(product){
		$CartService.removeItemFromCart(product,$scope.cartDetails);
	};
});