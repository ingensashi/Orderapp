'use strict';

app.controller('AppCtrl', function($scope,$http) {
  $scope.user={};
   $scope.bannerModel={};
 $scope.getBannerData=function(bannerDetails){
  bannerDetails={"time": 1365674135031,"timezone": "Asia/Calcutta","session_id": 12121212,"Banner": {"BannerType": "HOME","imei": "92713746076C4D3","ImageType": "LDPI"}};
 console.log("user",bannerDetails);
  /*$http({
    url:'http://216.15.228.130:8083/SOIService.svc/BannerRequest', 
    method: "post",
    data: bannerDetails
  }).then(function(response){
    $scope.bannerModel=response.data;
    console.log("reponse",response);
    $scope.user={};
  });*/
$scope.bannerModel={"Banner":["img/PASTA.png","img/PIZZA.png","img/CAKE.png","img/CALZONE.png"]};
 };
 var init=function(){
  $scope.getBannerData();
 }
 init();
});