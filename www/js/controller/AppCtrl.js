'use strict';

app.controller('AppCtrl',
		function($scope, $http, $ionicHistory, $localStorageService,
				$ionicModal, $ionicPopup, $ionicSlideBoxDelegate,$rootScope,$ionicLoading) {
	// $ionicHistory.nextViewOptions({disableBack: true});
	$scope.bannerModel = {};
	$scope.searchBar = false;
	//$scope.user={};
	$scope.user.userStatus = $localStorageService.getUserStatus();
	console.log("$localStorageService.getUserStatus()"+$localStorageService.getUserStatus());
	$scope.user.userDetails = $localStorageService.getUserDetails();
	$scope.activeScreenDetail={};
	$scope.headerTitle.name='Home';
	$scope.tabSlideDetail={};
	$scope.activeScreenDetail.name='home';
	$scope.categoryDetails={};

	var bannerDetails;
	var getBannerData = function(bannerDetails) {
		$scope.bannerModel={bannerimages:{imagepath:"img/PIZZA.png"}};
		bannerDetails = {
				"device_id" : "1234",
				"session_id" : "dgdfg",
				"banner_type" : "HOME",
				"image_type" : "LDPI",
				"cat_id" : "0"
		};
		console.log("bannerDetails", bannerDetails);
		$http({
			url : 'http://216.15.228.130:8083/NBanner.php',
			method : "post",
			data : bannerDetails
		}).success(function(response) {
			$scope.bannerModel = response.bannerimages;
			// alert("here");
			//  setTimeout(function() {
			$ionicSlideBoxDelegate.update();
			//  }, 5000);
			console.log("reponse response.data", response);
		}).error(function (data, status, headers, config) {
			console.log("error",status);

		});
		// $scope.bannerModel={"Banner":["img/CAKE.png","img/PASTA.png","img/PIZZA.png","img/CALZONE.png"]};
	};
	var init = function() {
		getBannerData();
	}
	init();
	//console.log("user details", $scope.user);
	$scope.expandSerachBar = function(event) {
		// alert("inside"+event);
		if (event == 'front') {
			$scope.searchBar = true;
		}
		if (event == 'back') {
			// alert("in");
			$scope.searchBar = false;
		}

	}
	/*
	 * // Execute action on hide modal $scope.$on('modal.hidden',
	 * function() { // Execute action }); // Execute action on remove
	 * modal $scope.$on('modal.removed', function() { // Execute action
	 * });
	 */
	/*$scope.updateSlider = function() {
    $ionicSlideBoxDelegate.update(); // or just return the
    // function
  };*/

	$scope.moveToScreen=function(screen,catId,catName,product){
		console.log("catName ::"+catName +"  catId ::"+catId);
		$rootScope.stateArray.push($scope.activeScreenDetail.name);
		console.log("$rootScope.stateArray",$rootScope.stateArray);
		$scope.activeScreenDetail.name=screen;

		switch(screen){
		case 'category':
			$scope.categoryDetails.name=catName;
			$scope.categoryDetails.catId=catId;
			break;
		case 'categoryDesc':
			$scope.categoryDetails.catType=catId;
			break;
		case 'addToppins' :
			$scope.cartDetails.activeProduct=product;
			console.log("$scope.cartDetails.activeProduct",$scope.cartDetails.activeProduct);
			break;
		}
	};


	$scope.tabs = [ {
		"text" : "Pizzas",
		"catId":1
	}, {
		"text" : "Pastas",
		"catId":3
	}, {
		"text" : "Desserts",
		"catId":5
	}, {
		"text" : "Calzones",
		"catId":8
	}, {
		"text" : "Beverages",
		"catId":42
	}, {
		"text" : "Cakes",
		"catId":43
	}, {
		"text" : "Shoulders",
		"catId":73
	}, {
		"text" : "Escalators",
		"catId":6
	}, {
		"text" : "Submarines",
		"catId":9
	}, {
		"text" : "Salads",
		"catId":7
	} ];


	$scope.showSpinner = function() {
		$ionicLoading.show({
			template: /*'<img src="img/loading.gif">'*/'<ion-spinner icon="spiral"></ion-spinner>',
			//  template: 'Loading....',
			duration : 4000
		});
	};
	$scope.hideSpinner = function(){
		$ionicLoading.hide();
	};


});