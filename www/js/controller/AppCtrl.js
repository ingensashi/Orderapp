'use strict';

app.controller('AppCtrl', function($scope,$http,$ionicHistory,$localStorageService,$ionicModal) {
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

 $ionicModal.fromTemplateUrl('templates/paymentModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    //modal.show();
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    console.log("open modal",$scope.modal);
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  /*// Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });*/


 $scope.getBannerData=function(bannerDetails){
  bannerDetails={
    "device_id": "12341",
    "session_id":"67C2D3920E30495",
    "banner_type": "HOME",
    "image_type": "LDPI" 
  };
 //console.log("user",bannerDetails);
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
  $scope.getBannerData();
}
init();
});