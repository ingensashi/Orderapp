'use strict';
app.controller('CategoryDescCtrl', function($scope, $http,$localStorageService,$CartService) {
	$scope.productDetails={};
	$scope.headerTitle.name=$scope.categoryDetails.catType;

	var getProductDetails=function(catName,catType){
		$scope.showSpinner();
		var tempType='';
		if(catType.indexOf('Non')>-1){
			tempType="nonveg";
		}else{
			tempType=catType;
		}
		var bannerDetails={
				"device_id": "1234",
				"session_id" : "dgdfg",
				"image_type" : "LDPI" ,
				"cat_name" : catName ,
				"cat_type" : tempType
		};
		console.log("banner",bannerDetails);
		$http({
			url : 'http://216.15.228.130:8083/NProduct.php',
			method : "post",
			data : bannerDetails
		}).success(function(response) {
			if(catType.indexOf('Non')>-1){
				$scope.productDetails = response.productdetails.nonveg;
			}else{
				$scope.productDetails = response.productdetails.Veg;
			}
			
			
//			alert("here");
			/*setTimeout(function() {
$ionicSlideBoxDelegate.update();
}, 5000);*/
			console.log("reponse response.data", response);
			$scope.hideSpinner();
		}).error(function (data, status, headers, config) {
	        console.log("error",status);
	        return status;
	});
	};


	var init=function(){
		getProductDetails($scope.categoryDetails.name,$scope.categoryDetails.catType);
		/*$scope.productDetails=[{"prodname":"CALZONE","rate":"50.80","proddesc":"very good CALZONE","imagepath":"img/CALZONE.png","prodid":"prod08"},
		                       {"prodname":"pizza","rate":"40.80","proddesc":"very good pizza","imagepath":"img/PIZZA.png","prodid":"prod09"},
		                       {"prodname":"CAKE","rate":"500.80","proddesc":"very good CAKE","imagepath":"img/CAKE.png","prodid":"prod10"}];*/
		if($scope.cartDetails.itemList===undefined || $scope.cartDetails.itemList===null){
			$scope.cartDetails.itemList=[];
			$scope.cartDetails.productCount=0;
			$scope.cartDetails.amount=0;
		}
		if($scope.cartDetails.nodeDetails===undefined || $scope.cartDetails.nodeDetails===null){
			$scope.cartDetails.nodeDetails={};
		}
	};
	init();
	$scope.onSlideMove = function(data) {
		console.log("onSlideMove",data.index);
		$scope.categoryDetails.name=$scope.tabs[data.index].text;
		$scope.categoryDetails.catId=$scope.categoryDetails.catType;
		getProductDetails($scope.categoryDetails.name,$scope.categoryDetails.catType);
	};

	$scope.addItemToCart=function(product){
		$CartService.addItemToCart(product,$scope.cartDetails);
	};

	$scope.removeItemFromCart=function(product){
		$CartService.removeItemFromCart(product,$scope.cartDetails);
	};

});