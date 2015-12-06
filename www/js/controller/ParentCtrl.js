'use strict';
app.controller('ParentCtrl',function($scope,$state,$localStorageService,$CartService,$rootScope,$ionicModal,$ionicScrollDelegate,
		$cordovaGeolocation,$http,$ionicPopup) {
//	$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
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
	$scope.isAddressRequired=false;
	$scope.activeAddress=undefined;


	var templateUrl='';
	var myPopup=null;

	$scope.expandSerachBar = function(event) {
		// alert("inside"+event);
		if (event == 'front') {
			$scope.searchBar = true;
		}else if (event == 'back') {
			$scope.searchBar = false;
		}

	}
	
	$scope.moveToBackScreen=function(){
		if($rootScope.stateArray.length==0){
			return;
		}
		var popElement=$rootScope.stateArray.pop();
		var scopeRef=angular.element(document.querySelector('#homeView')).scope();
		if(popElement=='home'){
			angular.element(document.querySelector('#homeView')).scope().headerTitle.name='Home';
			}
		console.log("$rootScope.stateArray.pop() after  " +$rootScope.stateArray);
		angular.element(document.querySelector('#homeView')).scope().activeScreenDetail.name=popElement;

	};

	var positionTracker=function(pos){
		$http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+
				pos.lat+","+pos.long+"&sensor=true").success( function(response) {
					$scope.locationData=response.results;
					console.log($scope.locationData);
					$scope.activeAddress=$scope.locationData[0].formatted_address;
					/*$scope.location =$scope.locationData[0].formatted_address.split(",");
					$scope.searchString= $scope.location[0]+","+$scope.location[1];*/
					$scope.isAddressRequired=false;
					console.log("active Address",$scope.activeAddress);
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
			alert("error :"+err);
		//	alert("please enable gps");
		});

	};

	$scope.showLocation=function(){
		cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
			//alert("Location is " + (enabled ? "enabled" : "disabled"));
			if(!enabled){
				//alert("Location is " + (enabled ? "enabled" : "disabled"));
				cordova.plugins.diagnostic.switchToLocationSettings();
				$scope.isAddressRequired=true;
			}else{
				//alert("inside else");
				getCurrentLocation(positionTracker);
			}
		}, function(error){
			alert("The following error occurred: "+error);
		});
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
			animation : false
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
		angular.element(document.querySelector('#homeView')).scope().headerTitle.name='Home';
		$rootScope.stateArray=[];
	};

	$scope.editItemList=function(product){
		$rootScope.stateArray=[];
		angular.element(document.querySelector('#homeView')).scope().activeScreenDetail.name='addToppins';
		$scope.cartDetails.activeProduct=product;
		$rootScope.stateArray=['home'];
		$scope.closeModal();
	};

	$scope.Checkout = function(activity) {
		myPopup = $ionicPopup.show({
			templateUrl : 'templates/location.html',
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
			myPopup.close();
			$scope.closeModal();
			templateUrl='templates/addressDetail.html';
			openModal(templateUrl);
			break;
		}
	};

	$scope.addItemToCart=function(product){
		$CartService.addItemToCart(product,$scope.cartDetails);
	};

	$scope.removeItemFromCart=function(product){
		$CartService.removeItemFromCart(product,$scope.cartDetails);
	};
	$scope.deleteItemFromCart=function(product){
		 var confirmPopup = $ionicPopup.confirm({
		     title: 'Alert',
		     template: 'Are you sure to delete this product?'
		   });
		   confirmPopup.then(function(res) {
		     if(res) {
		    	 $CartService.deleteItemFromCart(product,$scope.cartDetails);
		     } else {
		       console.log('return to shopping');
		     }
		   });
	};
});