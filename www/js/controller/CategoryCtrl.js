'use strict';
app.controller('CategoryCtrl', function($scope, $http,$ionicSlideBoxDelegate) {
	$scope.subCategoryDetail={};
	$scope.headerTitle.name=$scope.categoryDetails.name;
	var getSubCategoryName=function(catName){
		$scope.subCategoryDetail.name=[];
		switch(catName){
		case 'Cakes':
			$scope.subCategoryDetail.name=['Egg','Eggless','Previous','Trending'];
			$scope.subCategoryDetail.images=["img/CAKE.png","img/PASTA.png","img/recent.jpg","img/trend.png"];
			break;
		case 'Beverages':
			$scope.subCategoryDetail.name=['Previous','Trending'];
			$scope.subCategoryDetail.images=["img/recent.jpg","img/trend.png"];
			break;
		default:
			$scope.subCategoryDetail.name=['Veg','Non Veg','Previous','Trending'];	
		$scope.subCategoryDetail.images=["img/veg.png","img/nonveg.png","img/recent.jpg","img/trend.png"];
		}
	};

	var bannerDetails;
	var getBannerData = function(catId) {
		$scope.showSpinner();
		$scope.catBannerModel={bannerimages:{imagepath:"img/PIZZA.png"}};
		bannerDetails = {
				"device_id" : "1234",
				"session_id" : "dgdfg",
				"banner_type" : "HOME",
				"image_type" : "LDPI",
				"cat_id" : catId
		};
		console.log("bannerDetails", bannerDetails);
		$http({
			url : 'http://216.15.228.130:8083/NBanner.php',
			method : "post",
			data : bannerDetails
		}).success(function(response) {
			console.log("response",response);
			$scope.catBannerModel = response.bannerimages;
			// alert("here");
			/*setTimeout(function() {*/
			$ionicSlideBoxDelegate.update();
			$scope.hideSpinner();
			/*   }, 5000);*/
		}).error(function (data, status, headers, config) {
	        console.log("error",status);
	        return status;
	});
		//$scope.bannerModel=["img/CAKE.png","img/PASTA.png","img/PIZZA.png","img/CALZONE.png"];
	};
	var init = function() {
		getSubCategoryName($scope.categoryDetails.name);
		getBannerData($scope.categoryDetails.catId);
	}
	init();
	$scope.onSlideMove = function(data) {
		console.log("onSlideMove",data.index);
		$scope.categoryDetails.name=$scope.tabs[data.index].text;
		$scope.categoryDetails.catId=$scope.tabs[data.index].catId;
		getSubCategoryName($scope.categoryDetails.name);
		getBannerData($scope.categoryDetails.catId);
	};

//	$scope.bannerModel={"Banner":["img/soiWebs/soi5.jpg","img/soiWebs/soi.jpg","img/soiWebs/soi1.jpg","img/soiWebs/soi3.jpg"]};

//	alert("categoryId"+$scope.categoryId);
});