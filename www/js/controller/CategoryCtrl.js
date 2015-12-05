'use strict';
app.controller('CategoryCtrl', function($scope, $http,$ionicSlideBoxDelegate,$ImageCacheFactory,$window) {
	$scope.subCategoryDetail={};
	$scope.headerTitle.name=$scope.categoryDetails.name;
	$window.dynamicIndex=$scope.getTabIndex($scope.categoryDetails.name);
	var getSubCategoryName=function(catName){
		$scope.subCategoryDetail.name=[];
		switch(catName){
		case 'Cakes':
			$scope.subCategoryDetail.name=['Egg','Eggless','Previous','Trending'];
			$scope.subCategoryDetail.images=["img/CAKE.png","img/PASTA.png","img/recent.jpg","img/trend.png"];
			$ImageCacheFactory.Cache($scope.subCategoryDetail.images);
			break;
		case 'Beverages':
			$scope.subCategoryDetail.name=['Veg','Previous','Trending'];
			$scope.subCategoryDetail.images=["img/veg.png","img/recent.jpg","img/trend.png"];
			$ImageCacheFactory.Cache($scope.subCategoryDetail.images);
			break;
		default:
			$scope.subCategoryDetail.name=['Veg','Non Veg','Previous','Trending'];	
		    $scope.subCategoryDetail.images=["img/veg.png","img/nonveg.png","img/recent.jpg","img/trend.png"];
		    $ImageCacheFactory.Cache($scope.subCategoryDetail.images);
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
			/*var images = [];
			for(var i=0; i<$scope.catBannerModel.length;i++){
				images.push($scope.catBannerModel[i].imagepath);
			}
			console.log("imagepath",images);

			$ImageCacheFactory.Cache(images);*/
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
	};
	init();
	$scope.onSlideMove = function(data) {
		console.log("onSlideMove",data.index);
		$scope.categoryDetails.name=$scope.tabs[data.index].text;
		$scope.categoryDetails.catId=$scope.tabs[data.index].catId;
		getSubCategoryName($scope.categoryDetails.name);
		$scope.headerTitle.name=$scope.categoryDetails.name;
		getBannerData($scope.categoryDetails.catId);
	};

//	$scope.bannerModel={"Banner":["img/soiWebs/soi5.jpg","img/soiWebs/soi.jpg","img/soiWebs/soi1.jpg","img/soiWebs/soi3.jpg"]};

//	alert("categoryId"+$scope.categoryId);
});