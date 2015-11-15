'use strict';
app.controller('CategoryDescCtrl', function($scope, $http) {
	//alert("CategoryDescCtrl");
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
	};
	init();
	/*$scope.onSlideMove = function(data) {
		console.log("onSlideMove",data.index);
		$scope.categoryDetails.name=$scope.tabs[data.index].text;
		$scope.categoryDetails.catId=$scope.categoryDetails.catType;
		getProductDetails($scope.categoryDetails.name,$scope.categoryDetails.catType);
	};*/

});