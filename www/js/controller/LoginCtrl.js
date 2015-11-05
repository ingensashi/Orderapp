'use strict';
app.controller('LoginCtrl', function($scope, $ionicPopup,$http) {
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

$scope.userLogin=function(userName,password){
  var user={};
  user.device_id="123";
  user.device_name="moto_e";
  user.device_version="4.4";
  user.mobile_no=userName;
  user.login_password=password;
  console.log("user",user);
  $http({
    url:'http://216.15.228.130:8083/NUserLoginRequestwithPassword.php', 
    method: "post",
    data: user
  }).then(function(response){
    console.log("reponse userLogin",response);
    alert("data"+JSON.stringify(reponse.data));
  });

}
$scope.guestLogin=function(mobileNo){
  var guest={};
  guest.device_id="123";
  guest.device_name="moto_e";
  guest.device_version="4.4";
  guest.mobile_no=mobileNo;
  console.log("guest",guest);
  $http({
    url:'http://216.15.228.130:8083/NGuestRequest.php', 
    method: "post",
    data: guest
  }).then(function(response){
    console.log("reponse guestLogin",response);
  });
}

$scope.registerUser=function(registerUser){
  console.log(registerUser);
  var tempUser={};
  tempUser.device_id="123";
  tempUser.device_name="moto_e";
  tempUser.device_version="4.4";
  tempUser.customer_name=registerUser.name;
  tempUser.mobile_no=registerUser.mobileNo;
  tempUser.customer_email=registerUser.email;
  tempUser.login_password=registerUser.password;
  tempUser.food_preference="0";
  console.log("tempUrer",tempUser);
  $http({
    url:'http://216.15.228.130:8083/NUserRegistration.php', 
    method: "post",
    data: tempUser
  }).then(function(response){
    console.log("reponse registerUser",response);
    $scope.user={};
  });
}


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