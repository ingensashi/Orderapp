'use strict';
app.controller('LoginCtrl', function($scope, $ionicPopup) {
 $scope.activeTab="guest";
 $scope.passwordMatches=false;
 $scope.user={};
 var myPopup=null;
 $scope.changeTab=function(tab){
 	$scope.activeTab=tab;
  if( $scope.onRegister){
    $scope.gotoRegister();
  }

};

 $scope.comparePassword=function(password,conPassword){
    if( conPassword !==undefined && conPassword.length>7 && password==conPassword){
      $scope.passwordMatches=true;
     // alert("password matches");
    }else{
      $scope.passwordMatches=false;
      //alert("password do not match");
    }
   };


$scope.onRegister=false;

$scope.gotoRegister=function(){
  $scope.onRegister=!$scope.onRegister;
}

 // Triggered on a button click, or some other target
 $scope.showPopup = function() {
  $scope.data = {}

  // An elaborate, custom popup
  myPopup = $ionicPopup.show({
    template: ' <label class="item item-input"><input type="text" placeholder="one time password" ng-model="data.wifi"></label>'+
    '<div style="text-align:center"><div class="button-bar"><button class="button  button-positive" style="margin-top:3%;" ng-click="hidePopup()" ui-sref="home">Submit</button>'+
    '<button class="button  button-assertive" style="margin-top:3%;" ng-click="hidePopup()">Cancel</button></div><br>'+
    '<label>Resend OTP</label></div>',
    title: '<span style="text-align:center">Enter one time Password</span>',
    subTitle: 'Four digit OTP number',
    cssClass:'full-width',
    scope: $scope,
    /*buttons: [
    {
      text: '<b>Cancle</b>',
      type: 'button-assertive',
      onTap: function(e) {
        if ($scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
      
      ]*/

    });
myPopup.then(function(res) {
 //console.log('Tapped!', res);
});
};

$scope.hidePopup=function(){
  myPopup.close();
}

});