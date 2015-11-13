'use strict';
app.controller('CategoryCtrl', function($scope, $stateParams,$http) {

	$scope.categoryId=$stateParams.categoryId;
	if($scope.categoryId==null){
		$scope.categoryId="pizza";
	}

	var getBannerData=function(bannerDetails){
		bannerDetails={
			"device_id": "12341",
			"session_id":"67C2D3920E30495",
			"banner_type": "HOME",
			"image_type": "LDPI" 
		};

		console.log("user",bannerDetails);
		$http({
			url:'http://216.15.228.130:8083/NBanner.php', 
			method: "post",
			data: bannerDetails
		}).then(function(response){
   //$scope.bannerModel=response.data;
  // alert("here");
	  	console.log("reponse response.data",response.data);
		});
		$scope.bannerModel={"Banner":["img/CAKE.png","img/PASTA.png","img/PIZZA.png","img/CALZONE.png"]};
	};
	var init=function(){
		getBannerData();
	}
	init();
	$scope.bannerModel={"Banner":["img/soiWebs/soi5.jpg","img/soiWebs/soi.jpg","img/soiWebs/soi1.jpg","img/soiWebs/soi3.jpg"]};

//alert("categoryId"+$scope.categoryId);
});