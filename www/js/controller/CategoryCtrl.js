'use strict';
app.controller('CategoryCtrl', function($scope, $http) {
	//$scope.goToProductSreen=false;
	/*$scope.categoryId=$stateParams.categoryId;
	if($scope.categoryId==null){
		$scope.categoryId="pizza";
	}
*/
	/* $scope.goToProduct=function(){
	 	$scope.goToProductSreen=true;
  	};*/

	var bannerDetails;
	var getBannerData = function(bannerDetails) {
		//$scope.bannerModel={bannerimages:{imagepath:"img/PIZZA.png"}};
		bannerDetails = {
			"device_id" : "1234",
			"session_id" : "dgdfg",
			"banner_type" : "HOME",
			"image_type" : "LDPI",
			"cat_id" : "0"
		};
		console.log("bannerDetails", bannerDetails);
		$http({
			url : 'http://216.15.228.130:8083/NBanner.php',
			method : "post",
			data : bannerDetails
		}).then(function(response) {
			//$scope.bannerModel = response.data.bannerimages;
      // alert("here");
     /*setTimeout(function() {
    	$ionicSlideBoxDelegate.update();
      }, 5000);*/
		console.log("reponse response.data", response.data);
	});
     $scope.bannerModel=["img/CAKE.png","img/PASTA.png","img/PIZZA.png","img/CALZONE.png"];
};
var init = function() {
	getBannerData();
}
init();

//$scope.bannerModel={"Banner":["img/soiWebs/soi5.jpg","img/soiWebs/soi.jpg","img/soiWebs/soi1.jpg","img/soiWebs/soi3.jpg"]};

//alert("categoryId"+$scope.categoryId);
});