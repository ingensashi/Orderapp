'use strict';
app.controller('CategoryDescCtrl', function($scope, $http,$localStorageService,$CartService,$ionicScrollDelegate) {
	$scope.headerTitle.name=$scope.categoryDetails.catType;
	$scope.productDetails={};
	$scope.productList='';
	$scope.passiveCategory='';
	var getProductDetailsByCatType=function(catName,catType){
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
			console.log("reponse response.data", response);
			$scope.hideSpinner();
		}).error(function (data, status, headers, config) {
			console.log("error",status);
			return status;
		});
	};

	var getProductDetails=function(catName,catType){
		$scope.showSpinner();
		$scope.productDetails.prodDetails={};
		$scope.productDetails.vegList=[];
		$scope.productDetails.nonvegList=[];
		if($localStorageService.getProductDetails(catName)==null){
			var bannerDetails={
					"device_id": "1234",
					"session_id" : "dgdfg",
					"image_type" : "LDPI",
					"cat_name" : catName,
					"cat_type" : catType,
					"trans_id" : 0
			};
			console.log("banner",bannerDetails);
			$http({
				url : 'http://216.15.228.130:8083/NProductTransactionNew.php',
				method : "post",
				data : bannerDetails
			}).success(function(response) {
				console.log("reponse catname", response);
				$scope.productDetails.vegList=response.veglist;
				$scope.productDetails.nonvegList=response.nonveglist;
				$scope.productDetails.lastTransId=response.lasttransid;
				$scope.productDetails.prodDetails=response.proddetails;
				console.log("in controller $scope.productDetails",$scope.productDetails);
				var temp= angular.copy($scope.productDetails);
				$localStorageService.setProductDetails(catName,temp);
				$scope.hideSpinner();
			}).error(function (data, status, headers, config) {
				console.log("error",status);
				return status;
			});
		}else{
			$scope.hideSpinner();
			$scope.productDetails=angular.copy($localStorageService.getProductDetails(catName));
			console.log("in else $scope.productDetails",$scope.productDetails);
		}
	};

	$scope.changeCatType=function(){
		$ionicScrollDelegate.scrollTop();
		var catType=$scope.categoryDetails.catType;
		if(catType.indexOf('Non')<0 || catType.indexOf('less')>0){
			$scope.categoryDetails.catType="Non Veg";
			$scope.headerTitle.name="Non Veg";
			$scope.productList="nonvegList";
			if(catType.indexOf('egg')>0){
				$scope.passiveCategory="Eggless";
			}else{
				$scope.passiveCategory="Veg";
			}

		}else{
			$scope.headerTitle.name="Veg";
			$scope.categoryDetails.catType="Veg";
			$scope.productList="vegList";
			if(catType.indexOf('less')>0){
				$scope.passiveCategory="Egg";
			}else{
				$scope.passiveCategory="Non veg";
			}
		}
	};


	var init=function(){
		$localStorageService.initializeProductdetails();
		getProductDetails($scope.categoryDetails.name,"everything");
		var catType=$scope.categoryDetails.catType;
		if(catType.indexOf('Non')<0 || catType.indexOf('less')>0){
			$scope.productList="vegList";
			if(catType.indexOf('less')>0){
				$scope.passiveCategory="Egg";
			}else{
				$scope.passiveCategory="Non veg";
			}
		}else{
			$scope.productList="nonvegList";
			if(catType.indexOf('egg')>0){
				$scope.passiveCategory="Eggless";
			}else{
				$scope.passiveCategory="Veg";
			}
		}
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
		getProductDetails($scope.categoryDetails.name,"everything");
	};

	$scope.addItemToCart=function(product){
		if($scope.categoryDetails.name=='Pizzas'){
			$CartService.addItemWithPropsToCart(product,$scope.cartDetails);
			$scope.moveToScreen('addToppins','','',product);
		}else{
			$CartService.addItemToCart(product,$scope.cartDetails);	
		}
	};

	$scope.removeItemFromCart=function(product){
		$CartService.removeItemFromCart(product,$scope.cartDetails);
	};

});