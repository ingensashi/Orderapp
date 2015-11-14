'use strict';
app.controller('CategoryDescCtrl', function($scope, $http) {
	//alert("CategoryDescCtrl");
	$scope.productDetails={};
	$scope.headerTitle.name='CategoryDesc';
	var bannerDetails={
		"device_id": "1234",
		"session_id" : "dgdfg",
		"image_type" : "LDPI" ,
		"cat_name" : "PIZZA"  
	};

	$http({
		url : 'http://216.15.228.130:8083/NProduct.php',
		method : "post",
		data : bannerDetails
	}).then(function(response) {
	$scope.productDetails = response.data.productdetails;
// alert("here");
/*setTimeout(function() {
$ionicSlideBoxDelegate.update();
}, 5000);*/
	console.log("reponse response.data", response.data);
});

});