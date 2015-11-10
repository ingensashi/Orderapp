'use strict';

app.controller('AppCtrl', function($scope,$http,$ionicHistory,$localStorageService) {
  //$ionicHistory.nextViewOptions({disableBack: true});
  $scope.bannerModel={};
  $scope.searchBar=false;
  $scope.user={};
  $scope.user.userStatus=$localStorageService.getUserStatus();
  $scope.user.userDetails=$localStorageService.getUserDetails();
  console.log("user details",$scope.user);
  $scope.expandSerachBar=function(event){
   // alert("inside"+event);
   if(event=='front'){
    $scope.searchBar=true;
  }
  if(event=='back'){
     // alert("in");
     $scope.searchBar=false;
   }

 }
 $scope.getBannerData=function(bannerDetails){
  bannerDetails={"time": 1365674135031,"timezone": "Asia/Calcutta","session_id": 12121212,"Banner": {"BannerType": "HOME","imei": "92713746076C4D3","ImageType": "LDPI"}};
 //console.log("user",bannerDetails);
 /* $http({
    url:'http://216.15.228.130:8083/SOIService.svc/BannerRequest', 
    method: "post",
    data: bannerDetails
  }).then(function(response){
    $scope.bannerModel=response.data;
    alert("here");
    console.log("reponse",response);
    $scope.user={};
  }).error(function (data, status, headers, config) {
  $scope.showAlert('Something wrong happened','Please Try again');
  return status;
});*/
$scope.bannerModel={"Banner":["img/CAKE.png","img/PASTA.png","img/PIZZA.png","img/CALZONE.png"]};
};
var init=function(){
  $scope.getBannerData();
}
init();
});