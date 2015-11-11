var user;
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('foodApp', ['ionic','ngStorage','ngCordova'])

.run(function($ionicPlatform,$localStorage,$state,$timeout,$ionicScrollDelegate) {
  user=$localStorage.user;
  console.log("$localStorage app run",user);

  if(user!==undefined && user.userStatus!=undefined){
   // alert("1");
    if(user.userStatus==1){
     // alert("2");
    //  $state.go('home');
      $timeout(function() {
        $state.go('home');
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
})

app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  if(!ionic.Platform.isIOS()){
    $ionicConfigProvider.scrolling.jsScrolling(false);
  } 
  $ionicConfigProvider.tabs.position('bottom'); 
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'AppCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  }).state('category', {
    url: '/category',
    templateUrl: 'templates/category.html',
    params : {categoryId: null},
    controller: 'CategoryCtrl'
  });
 // alert("here");
  $urlRouterProvider.otherwise('/login');
       /*.state('user', {
        url: '/user',
        templateUrl: '/templates/login.html'
      });
 */ /*$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});*/
});

