'use strict';
app.controller('CategoryDescCtrl', function($scope, $http,$localStorageService,$CartService) {
	$scope.headerTitle.name=$scope.categoryDetails.catType;
	$scope.productDetails={};
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
					"trans_id" : 100
			};
			console.log("banner",bannerDetails);
			$http({
				url : 'http://216.15.228.130:8083/NProductTransaction.php',
				method : "post",
				data : bannerDetails
			}).success(function(response) {
				console.log("reponse catname", response);
				for(var i=0;i<response.productdetails.veg.length;i++){
					$scope.productDetails.prodDetails[response.productdetails.veg[i].prodid]=response.productdetails.veg[i];
					$scope.productDetails.vegList.push(response.productdetails.veg[i].prodid);
				}
				for(var j=0;j<response.productdetails.nonveg.length;j++){
					$scope.productDetails.prodDetails[response.productdetails.nonveg[j].prodid]=response.productdetails.nonveg[i];
					$scope.productDetails.nonvegList.push(response.productdetails.nonveg[j].prodid);
				}
				$scope.productDetails.lastTransId=response.productdetails.lasttransid[0];
			//	console.log("in controller $scope.productDetails",$scope.productDetails);
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
		//	console.log("in else $scope.productDetails",$scope.productDetails);
		}
	};


	var init=function(){
		$localStorageService.initializeProductdetails();
		getProductDetails($scope.categoryDetails.name,"everything");
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
		$scope.moveToScreen('addToppins','','',product);
	};

	$scope.removeItemFromCart=function(product){
		$CartService.removeItemFromCart(product,$scope.cartDetails);
	};

});