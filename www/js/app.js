var user;
//Ionic Starter App

//angular.module is a global place for creating, registering and retrieving Angular modules
//'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
//the 2nd parameter is an array of 'requires'
var app=angular.module('foodApp', ['ionic','ngStorage','ngCordova','tabSlideBox',
                                   'ion-autocomplete','ionic.ion.imageCacheFactory'])


.run(function($ionicPlatform,$http,$localStorage,$state,$timeout,$ionicScrollDelegate,$rootScope,
		$ionicPopup) {
	user=$localStorage.user;
	$rootScope.stateArray=[];
	console.log("$localStorage app run",user);
	var city_details={
			"device_id":"5445554",
			"session_id" : "1E4786B6C2D7492",
			"location_type":"city"
	}

	/*$http({
		url : 'http://216.15.228.130:8083/NLocationRequest.php',
		method : "post",
		data : city_details
	}).success(function(response) {
		console.log("cityDetails connected ", response);
	}).error(function (data, status, headers, config) {
		console.log("error",status);
		alert("you are not connected to internet");
	});*/

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
		document.addEventListener("resume", function() {
			//alert("here"+angular.element(document.querySelector('body')).scope().isAddressRequired);
			if(angular.element(document.querySelector('body')).scope().isAddressRequired){
				angular.element(document.querySelector('body')).scope().showLocation();
			}
			console.log("The application is resuming from the background");
		}, false);
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

		cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
			// alert("GPS location is " + (enabled ? "enabled" : "disabled"));
		}, function(error){
			//alert("The following gps error occurred: "+error);
		});
		cordova.plugins.diagnostic.isNetworkLocationEnabled(function(enabled){
			//alert("Network location is " + (enabled ? "enabled" : "disabled"));
		}, function(error){
			//alert("The following net error occurred: "+error);
		});
		cordova.plugins.diagnostic.getLocationMode(function(mode){
			//alert("Current location mode is: " + mode);
		}, function(error){
			// alert("The following error occurred: "+error);
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
				if(popElement=='home'){
					angular.element(document.querySelector('#homeView')).scope().headerTitle.name='Home';
				}
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

app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
	$httpProvider.interceptors.push('reqResInterceptor');
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

.factory('reqResInterceptor',['$q',function($q) {
 return {
  responseError: function(res){
  console.info("Failed to open url: " + res.config.url, res);
  //Angular returns "success" by default, but we will call "error" if data were not obtained.
   if(res.data == null && res.status === 0 && res.statusText === ""){
   alert("you are not connected to internet");
   return $q.reject(res) //callback error()
   }       
   return res //return default success()
    }
    };  
    }]);

/*['$q',function($q) {  
	var timestampMarker = {
			request: function(config) {
				alert("in request");
				config.requestTimestamp = new Date().getTime();
				return config;
			},
			response: function(response) {
				console.log(response);
				alert("in response");
				response.config.responseTimestamp = new Date().getTime();
				return response;
			},
			responseError: function(response) {
				alert("connection error");
				return $q.reject(response);
			}
	};
	return timestampMarker;
}]);*/

/*module.config(['$httpProvider', function($httpProvider) {  

}]);*/