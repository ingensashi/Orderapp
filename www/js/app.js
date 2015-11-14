var user;
//Ionic Starter App

//angular.module is a global place for creating, registering and retrieving Angular modules
//'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
//the 2nd parameter is an array of 'requires'
var app=angular.module('foodApp', ['ionic','ngStorage','ngCordova','tabSlideBox'])

.run(function($ionicPlatform,$localStorage,$state,$timeout,$ionicScrollDelegate,$rootScope) {
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
	});

	$ionicPlatform.registerBackButtonAction(function () {
		if ($state.current.name!='login') {
			if($rootScope.stateArray.length==0){
				alert("exiting app");
				navigator.app.exitApp();
			}else{
				var popElement=$rootScope.stateArray.pop();
				console.log("$rootScope.stateArray.pop() after  " +$rootScope.stateArray);
				angular.element(document.querySelector('#homeView')).scope().activeScreenDetail.name=popElement;
				angular.element(document.querySelector('#homeView')).scope().$apply();
			}
		} else {
			alert("exiting app");
			navigator.app.exitApp();
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
});

