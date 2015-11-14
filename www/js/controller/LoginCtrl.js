'use strict';
app.controller('LoginCtrl', function($scope, $ionicPopup,$ionicLoading,$http,$localStorage,$state,$cordovaDevice,$localStorageService) {
 // console.log("$cordovaDevice",$cordovaDevice);
  // $ionicViewSwitcher.nextTransition('none');

  $scope.forgotPassword=false;
  $scope.mobileNoScreen=false;
  $scope.passwordScreen=false;
  var passwordReset={};
  var isDevelopment=true;
  $scope.choice={};
  var deviceId='';
  var deviceName='';
  var deviceVersion;
  var mobileNo="";

  $scope.activeTab="guest";
  $scope.passwordMatches=false;
  $scope.user={};
  $scope.guestReponse={};
  $scope.userResponse={};
  $scope.invalidOTP=false;
  var passwordResetResponse={};
  var myPopup=null;
  /**For production
  */

  /*document.addEventListener("deviceready", function () {

    deviceName = $cordovaDevice.getModel();

   // var cordova = $cordovaDevice.getCordova();

  //  var model = $cordovaDevice.getModel();
    //var platform = $cordovaDevice.getPlatform();

    deviceId= $cordovaDevice.getUUID();

    deviceVersion = $cordovaDevice.getVersion();
  //  alert("di  "+deviceId+" dn  "+deviceName+"  dv "+deviceVersion);

}, false);*/

  /**For development
  */
  deviceId='a3b2a43154f74e2d';
  deviceName='XT1022';
  deviceVersion='4.4.4';

  /*var init=function(){
    if($localStorageService.getUser()==null){
      $localStorageService.setUser();
    }
  };
  init();*/


  $scope.changeTab=function(tab){
    $scope.activeTab=tab;
    if( $scope.onRegister){
      $scope.gotoRegister();
    }

  };

  $scope.userLogin=function(userName,password){
    $scope.showSpinner();
    var user={};
    user.device_id=deviceId;
    user.device_name=deviceName;
    user.device_version=deviceVersion;
    user.mobile_no=userName.toString();
    user.login_password=password;
  //console.log("user",user);
  //$scope.showSpinner();
  $http({
    url:'http://216.15.228.130:8083/NUserLoginRequestwithPassword.php', 
    method: "post",
    data: user
  }).then(function(response){
    console.log("reponse userLogin",response);
    $scope.userReponse=response.data;
//$scope.hideSpinner();
if($scope.userReponse.userstatus=="success"){
  $localStorageService.setUserStatus(1);
  $localStorageService.setUserDetails($scope.userReponse.userdetails);
 $state.go('app.home');/*.then(function() {
  $scope.hideSpinner();
});*/
}else{
  $scope.hideSpinner();
  $scope.showAlert('Invalid user',$scope.userReponse.userdetails.result);
   // alert($scope.userReponse.userdetails.result);
 }

 //   $localStorage.sessionId=response.data.UserDetails.SessionId;
});

}
$scope.guestLogin=function(mobileNo){
  $scope.showSpinner();
  var guest={};
  guest.device_id=deviceId;
  guest.device_name=deviceName;
  guest.device_version=deviceVersion;
  guest.mobile_no=mobileNo.toString();
  mobileNo=guest.mobile_no;
//  console.log("guest",guest);
//$scope.showSpinner();
$http({
  url:'http://216.15.228.130:8083/NGuestRequest.php', 
  method: "post",
  data: guest
}).then(function(response){
 $scope.guestReponse=response.data;
  // console.log("reponse guestLogin",$scope.guestReponse);
  if($scope.guestReponse.gueststatus=="success"){
    $scope.showPopup();
    $scope.userReponse=undefined;
  }else{
    $scope.hideSpinner();
    $scope.showAlert('Something wrong happened','Try again');
  }
});
};

$scope.registerUser=function(registerUser){
 $scope.showSpinner();
  //console.log(registerUser);
  $scope.user=registerUser;
  var tempUser={};
  tempUser.device_id=deviceId;
  tempUser.device_name=deviceName;
  tempUser.device_version=deviceVersion;
  tempUser.customer_name=registerUser.name;
  tempUser.mobile_no=registerUser.mobileNo.toString();
  tempUser.customer_email=registerUser.email;
  tempUser.login_password=registerUser.password;
  tempUser.food_preference="0";
  if($scope.choice.veg && $scope.choice.everything){
    tempUser.food_preference="3";
  }else if($scope.choice.veg){
    tempUser.food_preference="1";
  }else if($scope.choice.everything){
    tempUser.food_preference="2";
  }
  console.log("tempUser",tempUser);
  $http({
    url:'http://216.15.228.130:8083/NUserRegistration.php', 
    method: "post",
    data: tempUser
  }).then(function(response){
  //  console.log("reponse registerUser",response);
  $scope.userReponse=response.data;
  console.log("userReponse registerUser",response);
  if($scope.userReponse.userstatus=="otp verified required" || $scope.userReponse.userstatus=="success"){
    $scope.showPopup();
    $scope.guestReponse=undefined;
  }else{
    $scope.hideSpinner();
    $scope.showAlert('Existing user',$scope.userReponse.userregistration.resultstring);
  }
});
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
   $scope.hideSpinner();
   $scope.data = {}

  // An elaborate, custom popup
  myPopup = $ionicPopup.show({
    template: ' <label class="item item-input" style="border-left:0px;border-right:0px;margin-top:4px"><input type="text" placeholder="one time password" ng-model="data.wifi"></label>'+
    '<span ng-show="invalidOTP" class="help-block" style="text-align:center;">Enter valid OTP</span>'+
    '<div style="text-align:right"><div class="button-bar"style="padding:13px">'+
    '<button class=" button button-medium button-clear" style="margin-top:3%;background-color:greenyellow;color:green;right:10px" ng-click="hidePopup(\'submit\')" >Submit</button>'+
    '<button class="button button-medium button-clear" style="margin-top:3%;background-color:greenyellow;color:green;" ng-click="hidePopup(\'cancel\')" >cancel</button></div></div>'+
    '<h3 style="text-align:center;margin-top:0px">Resend SMS</h3>',
    title: '<span style="text-align:center">Thanks! Did You get a SMS OTP?<br>Enter It here:</span>',
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

$scope.hidePopup=function(flag){
  if (window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.close();
  }
  //alert($scope.data.wifi+"$scope.data"+flag);
  if(flag=='submit'){
    if($scope.mobileNoScreen){
     if(passwordResetResponse.userdetails.otp==$scope.data.wifi){
       $scope.mobileNoScreen=false;
       $scope.passwordScreen=true;
     }
   }else if($scope.userReponse===undefined){
    if($scope.guestReponse.guestregistration.otp==$scope.data.wifi){
      $scope.showSpinner();
    
     $localStorageService.setUserStatus(0);
     $scope.guestReponse.mobileNo=mobileNo;
     $localStorageService.setUserDetails($scope.guestReponse.guestregistration);
     $state.go('app.home');/*.then(function() {
      $scope.hideSpinner();
    });;*/
}else{
  $scope.invalidOTP=true;
  return;
}
}else if($scope.guestReponse===undefined){
  //alert("2"+$scope.userReponse.userregistration.otp);
  if($scope.userReponse.userregistration.otp==$scope.data.wifi){
       // alert("3");
    //   console.log("localStorage before",$localStorage);
    $scope.showSpinner();
    var reqData={};
    reqData.device_id=deviceId;
    reqData.session_id=$scope.userReponse.userregistration.sessionid;
    reqData.mobile_no=$scope.user.mobileNo.toString();
    console.log("reqData user",reqData);
    $http({
      url:'http://216.15.228.130:8083/NUserRegistrationVerify.php', 
      method: "post",
      data: reqData
    }).then(function(response){
     console.log("reponse userregistration response",response);
   //  console.log("response.data.userdetails.userstatus"+response.data.userstatus);
   if(response.data.userstatus!="Invalid"){
    //  alert("valid request");
    $scope.userReponse=response.data;
     //   console.log("localStorage after",$localStorage);
     $state.go('app.home');
     $localStorageService.setUserStatus(1);
     $localStorageService.setUserDetails($scope.userReponse.userdetails);
   }else{
     $scope.hideSpinner();
     $scope.showAlert('Invalid request',"please try again");
   }
     /*.then(function() {
      $scope.hideSpinner();
    });;*/
  });

  }else{
    $scope.invalidOTP=true;
    return;
  }
}
}
myPopup.close();
}

$scope.showSpinner = function() {
  $ionicLoading.show({
   template: /*'<img src="img/loading.gif">'*/'<ion-spinner icon="spiral"></ion-spinner>',
  //  template: 'Loading....',
  duration : 4000
});
};
$scope.hideSpinner = function(){
  $ionicLoading.hide();
};
$scope.showAlert = function(state,msg) {
 var alertPopup = $ionicPopup.alert({
   title: state,
   template: msg
 });
 alertPopup.then(function(res) {
     //console.log('Thank you for not eating my delicious ice cream cone');
   });
};

$scope.forgotPasswordScreen=function(){
 $scope.forgotPassword=! $scope.forgotPassword;
 $scope.mobileNoScreen=true;
};


$scope.submitMobileNo=function(mobileNo){
  $scope.showSpinner();
  passwordReset.device_id=deviceId;
  passwordReset.device_version=deviceVersion;
  passwordReset.mobile_no=mobileNo.toString();
  console.log("submitMobileNo",passwordReset);
//$scope.showSpinner();
$http({
  url:'http://216.15.228.130:8083/NPasswordResetRequest.php', 
  method: "post",
  data: passwordReset
}).then(function(response){
 passwordResetResponse=response.data;
 console.log("reponse passwordResetResponse",passwordResetResponse);
 if(passwordResetResponse.userstatus=="Success"){
  $scope.showPopup();
}else{
  $scope.hideSpinner();
  $scope.showAlert('Mobile no does not exist','Register as new user');
}
});
};

$scope.resetPassword=function(password){
 $scope.showSpinner();
 passwordReset.login_password=password;
 passwordReset.session_id=passwordResetResponse.userdetails.sessionid;
 console.log("resetPassword",passwordReset);
//$scope.showSpinner();
$http({
  url:'http://216.15.228.130:8083/NUserPasswordReset.php', 
  method: "post",
  data: passwordReset
}).then(function(response){
 passwordResetResponse=response.data;
 console.log("reponse passwordResetResponse",passwordResetResponse);
 if(passwordResetResponse.passwordchangedstatus=="success"){
   $localStorageService.setUserStatus(1);
   $localStorageService.setUserDetails(passwordResetResponse.userdetails);
   $scope.forgotPassword=false;
    $scope.passwordScreen=false;
   $state.go('app.home');
 }else{
  $scope.hideSpinner();
  $scope.showAlert('Something wrong happened','Please Try again');
}
});
};

});