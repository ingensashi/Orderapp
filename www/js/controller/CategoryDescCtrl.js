'use strict';
app.controller('CategoryDescCtrl', function($scope, $http,$localStorageService,$CartService,$ionicScrollDelegate,
		$ImageCacheFactory,$window,$ionicPopup) {
	$window.dynamicIndex=$scope.getTabIndex($scope.categoryDetails.name);
	$scope.headerTitle.name=$scope.categoryDetails.catType;
	$scope.productDetails={};
	$scope.productList='';
	$scope.passiveCategory='';
	$scope.checked={};
	var myPopup=null;
	$scope.isDataLoaded=false;
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
				console.log("reponse vegList", $scope.productDetails.vegList);
				$scope.productDetails.nonvegList=response.nonveglist;
				$scope.productDetails.lastTransId=response.lasttransid;
				$scope.productDetails.prodDetails=response.proddetails;
				console.log("in controller $scope.productDetails",$scope.productDetails);
				var images = [];
				for(var i=0; i<$scope.productDetails.vegList.length;i++){
					images.push($scope.productDetails.prodDetails[$scope.productDetails.vegList[i]].imagepath);
				}
				console.log("imagepath",images);

				$ImageCacheFactory.Cache(images);
				var temp= angular.copy($scope.productDetails);
				$localStorageService.setProductDetails(catName,temp);
				$scope.hideSpinner();
				$scope.isDataLoaded=true;
			}).error(function (data, status, headers, config) {
				console.log("error",status);
				return status;
			});
		}else{
			$scope.productDetails=angular.copy($localStorageService.getProductDetails(catName));
			console.log("in else $scope.productDetails",$scope.productDetails);
			$scope.isDataLoaded=true;
			$scope.hideSpinner();
		}
	};

	var getTrendingProdDetails=function(){
		$scope.showSpinner();
		var catName=$scope.categoryDetails.name;
		$scope.productDetails.prodDetails={};
		$scope.productDetails.vegList=[];
		/*if($localStorageService.getProductDetails($scope.categoryDetails.name)==null){
			$scope.productList=null;
			return;
		}*/
		$scope.headerTitle.name="Trending";
		var trendingDetails={
				"device_id": "1234",
				"session_id" : "dgdfg",
				"cat_name" : catName,
				"cat_type" : "trending"
		};
		$http({
			url : 'http://216.15.228.130:8083/NProductTrending.php',
			method : "post",
			data : trendingDetails
		}).success(function(response) {
			console.log("reponse catname", response);
			$scope.productDetails.prodDetails=angular.copy($localStorageService.getProductDetails(catName)).prodDetails;
			for(var i=0;i<response.proddetails.length;i++){
				$scope.productDetails.vegList.push(response.proddetails[i].prodid);	
			}
			console.log("Trending vegList", $scope.productDetails.vegList);
			$scope.productList="vegList";
			$scope.hideSpinner();
			/**
			 * isdataloaded made flase so that non veg will not appear here
			 */
			$scope.isDataLoaded=false;
		}).error(function (data, status, headers, config) {
			console.log("error",status);
			return status;
		});
	}

	$scope.changeCatType=function(){
		$ionicScrollDelegate.scrollTop();
		$scope.isDataLoaded=false;
		var catType=$scope.categoryDetails.catType;
		/**
		 * ['Veg','Non Veg','Previous','Trending','Egg','Eggless']
		 */
		switch(catType){
		case 'Veg':
			$scope.passiveCategory=$scope.categoryDetails.catType;
			$scope.categoryDetails.catType="Non Veg";
			$scope.headerTitle.name="Non Veg";
			$scope.productList="nonvegList";
			break;
		case 'Non Veg':
			$scope.passiveCategory=$scope.categoryDetails.catType;
			$scope.categoryDetails.catType="Veg";
			$scope.headerTitle.name="Veg";
			$scope.productList="vegList";
			break;
		case 'Egg' :
			$scope.passiveCategory=$scope.categoryDetails.catType;
			$scope.categoryDetails.catType="Eggless";
			$scope.headerTitle.name="Eggless";
			$scope.productList="nonvegList";
			break;
		case 'Eggless':
			$scope.passiveCategory=$scope.categoryDetails.catType;
			$scope.categoryDetails.catType="Egg";
			$scope.headerTitle.name="Egg";
			$scope.productList="vegList";
			break;
		case 'Previous':
			$scope.headerTitle.name="Previous";
			break;
		case 'Trending' :
			$scope.headerTitle.name="Trending";
			break;
		}
		$scope.isDataLoaded=true;
	};


	var init=function(){
		$localStorageService.initializeProductdetails();
		var catType=$scope.categoryDetails.catType;
		switch(catType){
		case 'Previous':
			$scope.headerTitle.name="Previous";
			$scope.productList=null;
			break;
		case 'Trending' :
			getTrendingProdDetails();
			break;
		default:
			getProductDetails($scope.categoryDetails.name,"everything");
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

		}
		/*$scope.productDetails=[{"prodname":"CALZONE","rate":"50.80","proddesc":"very good CALZONE","imagepath":"img/CALZONE.png","prodid":"prod08"},
		                       {"prodname":"pizza","rate":"40.80","proddesc":"very good pizza","imagepath":"img/PIZZA.png","prodid":"prod09"},
		                       {"prodname":"CAKE","rate":"500.80","proddesc":"very good CAKE","imagepath":"img/CAKE.png","prodid":"prod10"}];*/
		if($scope.cartDetails.itemList===undefined || $scope.cartDetails.itemList===null){
			$scope.cartDetails.itemList=[];
			$scope.cartDetails.productCount=0;
			$scope.cartDetails.amount=0;
			$scope.cartDetails.taxAmount=0;
		}
		if($scope.cartDetails.nodeDetails===undefined || $scope.cartDetails.nodeDetails===null){
			$scope.cartDetails.nodeDetails={};
		}
	};
	init();
	$scope.onSlideMove = function(data) {
		console.log("onSlideMove",data.index);
		$scope.categoryDetails.name=$scope.tabs[data.index].text;
		$scope.isDataLoaded=false;
		var catType=$scope.categoryDetails.catType;
		switch(catType){
		case 'Previous':
			$scope.headerTitle.name="Previous";
			$scope.productList=null;
			break;
		case 'Trending' :
			getTrendingProdDetails();
			break;
		default:
			getProductDetails($scope.categoryDetails.name,"everything");
		}
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

	var getSizeOfCake=function(productId){
		$scope.showSpinner();
		var productDetails={
				"device_id": "1234",
				"session_id" : "dgdfg",
				"prodid" :productId 	};
		$http({
			url : 'http://216.15.228.130:8083/NProductSize.php',
			method : "post",
			data : productDetails
		}).success(function(response) {
			console.log("cake size", response);
			$scope.productSize=response.productsizedetails;
			/*for(var i=0;i<$scope.productSize.length;i++){
				$scope.productSize[i].sizerate=parseInt($scope.productSize[i].sizerate);
			}*/
			$scope.hideSpinner();
		}).error(function (data, status, headers, config) {
			console.log("error",status);
			return status;
		});
	};

	$scope.addPropertiesToProduct=function(event,data,rate,checked){

		/*//alert("checked"+checked);
		$scope.cartDetails.nodeDetails[productId].properties[event]=data;
		//alert("$scope.cartDetails.nodeDetails[productId].properties.sizeRate"+$scope.cartDetails.nodeDetails[productId].properties.sizeRate);
		var nodeDetails=$scope.cartDetails.nodeDetails[productId];
		$scope.cartDetails.productCount=$scope.cartDetails.productCount-$scope.cartDetails.nodeDetails[productId].count+1;
		//get toppins data again as toppins rate changes with size of product
		var toppinsRate=$scope.cartDetails.nodeDetails[productId].properties.toppins.toppinsRate;

		$scope.cartDetails.amount=(parseFloat( $scope.cartDetails.amount)+parseFloat(toppinsRate)+ parseFloat(rate)-parseFloat(nodeDetails.amount)).toFixed(2);
		//rate of product in json of cart details 
		$scope.cartDetails.nodeDetails[productId].product.rate=rate;
		//rate of active product updated because size of product changed
		$scope.cartDetails.activeProduct.rate=rate;
		//total rate of product including toppinsRate
		nodeDetails.amount=(parseFloat(rate)+parseFloat(toppinsRate)).toFixed(2);
		//size of single product to display on ui when size of product will change excluding rate of toppins
		nodeDetails.sizeRate=rate;
		$scope.cartDetails.nodeDetails[productId].count=1;*/
	};		


	$scope.showPopup = function(productId) {
		getSizeOfCake("IH08");
		$scope.event1 = "Size";
		myPopup = $ionicPopup.show({
			templateUrl : 'templates/itemPopup.html',
			cssClass : 'full-width;',
			scope : $scope,
		});
		myPopup.then(function(res) {
		});
	};

	$scope.hidePopup=function(){
		myPopup.close();
	};

});