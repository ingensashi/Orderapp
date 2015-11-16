'use strict';
app.controller('CategoryDescCtrl', function($scope, $http,$localStorageService) {
	$scope.productDetails={};
	$scope.headerTitle.name=$scope.categoryDetails.catType;

	var getProductDetails=function(catName,catType){
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
		}).then(function(response) {
			if(catType.indexOf('Non')>-1){
				$scope.productDetails = response.data.productdetails.nonveg;
			}else{
				$scope.productDetails = response.data.productdetails.Veg;
			}

//			alert("here");
			/*setTimeout(function() {
$ionicSlideBoxDelegate.update();
}, 5000);*/
			console.log("reponse response.data", response.data);
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
		//	console.log("product addItemToCart",product.prodid);
		var isDuplicate=false;
		var productId=product.prodid;
		for(var i=0;i<$scope.cartDetails.itemList.length;i++){
			if($scope.cartDetails.itemList[i]==productId){
				isDuplicate=true;
			}
		}
		if(!isDuplicate){
			$scope.cartDetails.itemList.push(productId);
		}
		if(angular.isUndefined($scope.cartDetails.nodeDetails[productId])){
			$scope.cartDetails.nodeDetails[productId]={};
			$scope.cartDetails.nodeDetails[productId].count=0;
		}
		$scope.cartDetails.nodeDetails[productId].product=product;
		$scope.cartDetails.nodeDetails[productId].count=$scope.cartDetails.nodeDetails[productId].count+1;
		console.log($scope.cartDetails.amount+"$scope.cartDetails.amount");
		$scope.cartDetails.productCount=$scope.cartDetails.productCount+1;
		$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)+ parseFloat(product.rate)).toFixed(2);
		//	console.log("$scope.cartDetails",$scope.cartDetails);
		$localStorageService.setCardDetails($scope.cartDetails);
	};

	$scope.removeItemFromCart=function(product){
		//console.log("product addItemToCart",product.prodid);
		var productId=product.prodid;
		if(angular.isUndefined($scope.cartDetails.nodeDetails[productId]) || $scope.cartDetails.nodeDetails[productId].count==0){
			alert("please add atleast one time");
			return;
		}
		$scope.cartDetails.nodeDetails[productId].count=$scope.cartDetails.nodeDetails[productId].count-1;
		if($scope.cartDetails.nodeDetails[productId].count==0){
			for(var i=0;i<$scope.cartDetails.itemList.length;i++){
				if($scope.cartDetails.itemList[i]==productId){
					$scope.cartDetails.itemList.splice(i, 1);
				}
			}
			delete $scope.cartDetails.nodeDetails[productId].product;
		}
		$scope.cartDetails.productCount=$scope.cartDetails.productCount-1;
		//console.log($scope.cartDetails.amount+"$scope.cartDetails.amount");
		$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)- parseFloat(product.rate)).toFixed(2);
		//	console.log("$scope.cartDetails",$scope.cartDetails);
		$localStorageService.setCardDetails($scope.cartDetails);
	};

});