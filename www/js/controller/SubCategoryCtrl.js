'use strict';
app.controller('SubCategoryCtrl', function($scope, $http,$ionicPopup,$localStorageService,$CartService) {
	//$controller('CategoryDescCtrl', {$scope: $scope}); //making CategoryDescCtrlparent of this controller
	$scope.productSize={};
	$scope.productToppins={};
	$scope.productBase={};
	var myPopup=null;
	var init=function(){
		if(angular.isUndefined($scope.cartDetails.nodeDetails[productId].properties)){
			$scope.cartDetails.nodeDetails[productId].properties={};
			$scope.cartDetails.nodeDetails[productId].properties.toppins=[];
		}
	};
	var getProductDetails=function(event){
		switch(event){
		case 'Size':
			$scope.showSpinner();
			var productDetails={
					"device_id": "1234",
					"session_id" : "dgdfg",
					"prodid" : "M01"  	};
			console.log("banner",productDetails);
			$http({
				url : 'http://216.15.228.130:8083/NProductSize.php',
				method : "post",
				data : productDetails
			}).success(function(response) {
				console.log("reponse response.data", response);
				$scope.productSize=response.productsizedetails;
				$scope.hideSpinner();
			}).error(function (data, status, headers, config) {
				console.log("error",status);
				return status;
			});
			break;
		case 'Toppins':
			$scope.showSpinner();
			var productDetails= {
					"device_id": "1234",
					"session_id" : "dgdfg",
					"prodid" : "M001"  ,
					"prodsize":"DOUBLE"
			};
			console.log("banner",productDetails);
			$http({
				url : 'http://216.15.228.130:8083/NProductToppings.php',
				method : "post",
				data : productDetails
			}).success(function(response) {
				console.log("reponse response.data", response);
				$scope.productToppins=response.producttoppingsdetails;
				$scope.hideSpinner();
			}).error(function (data, status, headers, config) {
				console.log("error",status);
				return status;
			});
			break;
		case 'Base':
			$scope.showSpinner();
			var productDetails={
					"device_id": "1234",
					"session_id" : "dgdfg",
					"prodid" : "M01"  
			};

			console.log("banner",productDetails);
			$http({
				url : 'http://216.15.228.130:8083/NProductCrust.php',
				method : "post",
				data : productDetails
			}).success(function(response) {
				console.log("reponse response.data", response);
				$scope.productBase=response.productcrustdetails;
				$scope.hideSpinner();
			}).error(function (data, status, headers, config) {
				console.log("error",status);
				return status;
			});
			break;
		}
	};


	$scope.addvarietyToProduct=function(event,data,rate){
		var activeProduct=$scope.cartDetails.activeProduct;
		console.log("addvarietyToProduct",activeProduct);
		var productId=activeProduct.prodid;
		switch(event){
		case 'Size':
			$scope.cartDetails.nodeDetails[productId].properties[event]=data;
			break;
		case 'Toppins':
			$scope.cartDetails.nodeDetails[productId].properties.toppins.push(data);
			break;
		case 'Base':
			$scope.cartDetails.nodeDetails[productId].properties[event]=data;
			break;
		case 'cheesy':
			$scope.cartDetails.nodeDetails[productId].properties[event]=true;
			break;
		}

		$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)+ parseFloat(rate)).toFixed(2);
		console.log("$scope.cartDetails",$scope.cartDetails);
		$localStorageService.setCardDetails($scope.cartDetails);
	};


	$scope.showPopup = function(popupItem) {
		$scope.event1 = popupItem;
		$scope.data = {};
		getProductDetails($scope.event1);

		// An elaborate, custom popup
		myPopup = $ionicPopup.show({
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
	$scope.hidePopup=function(flag){
		myPopup.close();
	};
	$scope.addItemToCart=function(product){
		$CartService.addItemToCart(product,$scope.cartDetails);
	};

	$scope.removeItemFromCart=function(product){
		$CartService.removeItemFromCart(product,$scope.cartDetails);
	};
});