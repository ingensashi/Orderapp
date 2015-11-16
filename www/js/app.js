var user;
//Ionic Starter App

//angular.module is a global place for creating, registering and retrieving Angular modules
//'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
//the 2nd parameter is an array of 'requires'
var app=angular.module('foodApp', ['ionic','ngStorage','ngCordova','tabSlideBox'])

.run(function($ionicPlatform,$localStorage,$state,$timeout,$ionicScrollDelegate,$rootScope,$ionicPopup) {
	user=$localStorage.user;
	$rootScope.stateArray=[];
	console.log("$localStorage app run",user);

	if(user!==undefined && user.userStatus!=undefined){
		// alert("1");
		if(user.userStatus==1){
			// alert("2");
			//  $state.go('home');
			$timeout(function() {
				$state.go('app.home');
			});
		}else{
			//  alert("3")
			$state.go('login');
		}
	}
	$rootScope.showConfirm = function() {
		   var confirmPopup = $ionicPopup.confirm({
		     title: 'Alert',
		     template: 'Are you sure you want Exit App?'
		   });
		   confirmPopup.then(function(res) {
		     if(res) {
		    	 navigator.app.exitApp();
		     } else {
		       console.log('You are not sure');
		     }
		   });
		 };
	$ionicPlatform.ready(function() {
	$ionicScrollDelegate.scrollTop();
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs).
		// The reason we default this to hidden is that native apps don't usually show an accessory bar, at
		// least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
		// useful especially with forms, though we would prefer giving the user a little more room
		// to interact with the app.
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			// Set the statusbar to use the default style, tweak this to
			// remove the status bar on iOS or change it to use white instead of dark colors.
			StatusBar.styleDefault();
		}
		
		cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
		    alert("Location is " + (enabled ? "enabled" : "disabled"));
		}, function(error){
		    alert("The following error occurred: "+error);
		});
		
		cordova.plugins.diagnostic.switchToLocationSettings();
		
		cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
		    alert("GPS location is " + (enabled ? "enabled" : "disabled"));
		}, function(error){
		    alert("The following gps error occurred: "+error);
		});
		cordova.plugins.diagnostic.isNetworkLocationEnabled(function(enabled){
		    alert("Network location is " + (enabled ? "enabled" : "disabled"));
		}, function(error){
		    alert("The following net error occurred: "+error);
		});
		cordova.plugins.diagnostic.getLocationMode(function(mode){
		    alert("Current location mode is: " + mode);
		}, function(error){
		    alert("The following error occurred: "+error);
		});
		

	});
	
	

	$ionicPlatform.registerBackButtonAction(function () {
		if ($state.current.name!='login') {
			if($rootScope.stateArray.length==0){
				/*alert("exiting app");
				navigator.app.exitApp();*/
				$rootScope.showConfirm();
			}else{
				var popElement=$rootScope.stateArray.pop();
				console.log("$rootScope.stateArray.pop() after  " +$rootScope.stateArray);
				angular.element(document.querySelector('#homeView')).scope().activeScreenDetail.name=popElement;
				angular.element(document.querySelector('#homeView')).scope().$apply();
			}
		} else {
			$rootScope.showConfirm();
			//handle back action!
		}
	}, 100);
	/*$rootScope.$on('$ionicView.loaded', function() {
  ionic.Platform.ready( function() {
    $timeout(function() {
      if (device.platform == "Android") {
        $cordovaSplashscreen.hide();
        //alert("hiding");
      }
      if (device.platform == "iPhone" || device.platform == "iOS") {
       if(navigator && navigator.splashscreen){
         navigator.splashscreen.hide();
       } 
     }
   }, 500);
  })
});*/
});

app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

	if(!ionic.Platform.isIOS()){
		$ionicConfigProvider.scrolling.jsScrolling(false);
	} 
	$ionicConfigProvider.tabs.position('bottom'); 
	$stateProvider
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'index.html'
	})

	.state('app.home', {
		url: '/home',
		views:{
			'app-home':{
				templateUrl: 'templates/home.html',
				controller: 'AppCtrl'
			}
		}

	})

	.state('login', {
		url: '/login',
		templateUrl: 'templates/login.html',
		controller: 'LoginCtrl'


	})
	/*  .state('app.category', {
    url: '/category',
    views:{
      'app-home':{
        templateUrl: 'templates/category.html',
        params : {categoryId: null},
        controller: 'AppCtrl'
      }
    }


  })
  .state('app.menu', {
    url: '/menu',
    views:{
    'app-home':{
       templateUrl: 'templates/item.html',
       controller: 'AppCtrl'
     }
   }


 })

  .state('app.subCategory', {
    url: '/subCategory',
    views:{
      'app-home':{
       templateUrl: 'templates/subCategory.html',
       controller: 'AppCtrl'
     }
   }


 })*/;

	$urlRouterProvider.otherwise("/login");

	/*$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});*/
})
.config(function($httpProvider) {
	$httpProvider.interceptors.push(function() {
		return {
			'response': function(response) {
				var status = response.status; // error code
				//alert("status"+status);
				if ((status >= 400) && (status < 500)) {
					alert("AuthError", status);
					return;
				}
				if ( (status >= 500) && (status < 600) ) {
					alert("ServerError", status);
					return;
				}
				return response;
			}
		};
	});


});

