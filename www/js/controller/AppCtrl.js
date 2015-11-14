'use strict';

app.controller('AppCtrl',
		function($scope, $http, $ionicHistory, $localStorageService,
				$ionicModal, $ionicPopup, $ionicSlideBoxDelegate,$rootScope) {
	// $ionicHistory.nextViewOptions({disableBack: true});
	$scope.bannerModel = {};
	$scope.searchBar = false;
	$scope.user.userStatus = $localStorageService.getUserStatus();
	$scope.user.userDetails = $localStorageService.getUserDetails();
	$scope.activeScreenDetail={};
	$scope.headerTitle.name='Home';
	$scope.tabSlideDetail={};
	$scope.activeScreenDetail.name='home';

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

	$ionicModal.fromTemplateUrl('templates/paymentModal.html', {
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal) {
		// modal.show();
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		console.log("open modal", $scope.modal);
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});
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

	$scope.moveToScreen=function(screen){
		$rootScope.stateArray.push($scope.activeScreenDetail.name);
		console.log("$rootScope.stateArray",$rootScope.stateArray);
		$scope.activeScreenDetail.name=screen;
		//console.log("screen",screen);
	};

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
		}).then(function(response) {
			$scope.bannerModel = response.data.bannerimages;
			// alert("here");
			//  setTimeout(function() {
			$ionicSlideBoxDelegate.update();
			//  }, 5000);
			console.log("reponse response.data", response.data);
		});
		// $scope.bannerModel={"Banner":["img/CAKE.png","img/PASTA.png","img/PIZZA.png","img/CALZONE.png"]};
	};
	var init = function() {
		getBannerData();
	}
	init();

	$scope.tabs = [ {
		"text" : "Pizza"
	}, {
		"text" : "Pasta"
	}, {
		"text" : "Desert"
	}, {
		"text" : "Soups"
	}, {
		"text" : "Vegitables"
	}, {
		"text" : "Starter"
	} ];
	$scope.onSlideMove = function(data) {
	};

	$scope.showPopup = function(popupItem) {
		$scope.event1 = popupItem;
		$scope.data = {}

		// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			templateUrl : 'templates/itemPopup.html',
			cssClass : 'full-width;',
			scope : $scope,
			/*
			 * buttons: [ { text: '<b>Cancle</b>', type:
			 * 'button-assertive', onTap: function(e) { if
			 * ($scope.data.wifi) { //don't allow the user to close unless
			 * he enters wifi password e.preventDefault(); } else { return
			 * $scope.data.wifi; } } } ]
			 */

		});
		myPopup.then(function(res) {
			// console.log('Tapped!', res);
		});
	};
});