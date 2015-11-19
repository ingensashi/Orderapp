'use strict';
app.controller('SubCategoryCtrl', function($scope, $http,$ionicPopup,$localStorageService,$CartService) {
	//$controller('CategoryDescCtrl', {$scope: $scope}); //making CategoryDescCtrlparent of this controller
	$scope.productSize={};
	$scope.productToppins={};
	$scope.productBase={};
	$scope.sizeChecked=false;
	$scope.baseChecked=false;
	$scope.toppinsChecked={};
	var activeProduct=$scope.cartDetails.activeProduct;
	console.log("init",activeProduct);
	var productId=activeProduct.prodid;
	//$scope.cheesyChecked=false;
	var myPopup=null;
	var init=function(){
		if(angular.isUndefined($scope.cartDetails.nodeDetails[productId])){
			$scope.cartDetails.nodeDetails[productId]={};
			$scope.cartDetails.nodeDetails[productId].count=0;
		}
		if(angular.isUndefined($scope.cartDetails.nodeDetails[productId].properties)){
			$scope.cartDetails.nodeDetails[productId].properties={};
			$scope.cartDetails.nodeDetails[productId].properties.toppins=[];
			$scope.cartDetails.nodeDetails[productId].properties.sizeRate=0;
		}
	};
	init();
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
				$scope.productToppins=response.producttoppingsdetails;
				console.log("$scope.productToppins ",$scope.productToppins[0].toppingid);
				for(var i=0;i<$scope.productToppins.length;i++){
					$scope.toppinsChecked[$scope.productToppins[i].toppingid]={};
					$scope.toppinsChecked[$scope.productToppins[i].toppingid].checked=false;
				}
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


	$scope.addPropertiesToProduct=function(event,data,rate,checked){
		//alert("checked"+checked);
		switch(event){
		case 'Size':
			$scope.cartDetails.nodeDetails[productId].properties[event]=data;
			//alert("$scope.cartDetails.nodeDetails[productId].properties.sizeRate"+$scope.cartDetails.nodeDetails[productId].properties.sizeRate);
			if($scope.cartDetails.nodeDetails[productId].properties.sizeRate==0){
				$scope.cartDetails.nodeDetails[productId].properties.sizeRate=rate;
				$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)+ parseFloat(rate)).toFixed(2);
			}else{
				$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)- $scope.cartDetails.nodeDetails[productId].properties.sizeRate+
						parseFloat(rate)).toFixed(2);
				$scope.cartDetails.nodeDetails[productId].properties.sizeRate=rate;
			}
			break;
		case 'Toppins':
			if(checked){
				$scope.cartDetails.nodeDetails[productId].properties.toppins.push(data);
				$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)+ parseFloat(rate)).toFixed(2);
			}else{
				$scope.removePropertiesFromProduct(event,data,rate);
			}
			break;
		case 'Base':
			$scope.cartDetails.nodeDetails[productId].properties[event]=data;
			if(rate>0){
				alert("handle this");
			}
			break;
		case 'cheesy':
			if(checked){
				$scope.cartDetails.nodeDetails[productId].properties[event]=true;
				$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)+ parseFloat(rate)).toFixed(2);
			}else{
				$scope.cartDetails.nodeDetails[productId].properties[event]=false;
				$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)- parseFloat(rate)).toFixed(2);
			}
			break;
		}

		console.log("$scope.cartDetails",$scope.cartDetails);
		$localStorageService.setCardDetails($scope.cartDetails);
	};

	$scope.removePropertiesFromProduct=function(event,data,rate){
		var activeProduct=$scope.cartDetails.activeProduct;
		console.log("addvarietyToProduct",activeProduct);
		var productId=activeProduct.prodid;
		switch(event){
		case 'Size':
			$scope.cartDetails.nodeDetails[productId].properties.sizeRate=0;
			$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)- parseFloat(rate)).toFixed(2);
			break;
		case 'Toppins':
			for(var i=0;i<$scope.cartDetails.nodeDetails[productId].properties.toppins.length;i++){
				if($scope.cartDetails.nodeDetails[productId].properties.toppins[i]==data){
					$scope.cartDetails.nodeDetails[productId].properties.toppins.splice(i, 1);
					$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)- parseFloat(rate)).toFixed(2);
				}
			}
			break;
		}
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