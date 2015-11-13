'use strict';
app.controller('CategoryDescCtrl', function($scope, $http) {
	alert("CategoryDescCtrl");
	$scope.addToppinsSreen=false;
	$scope.addMenu=false;
	
	 $scope.goToToppinsScreen=function(){
	 	alert("inside");
	 	$scope.addToppinsSreen=true;
  	};

  	 $scope.goToMenuScreen=function(){
	 	alert("inside2");
	 	$scope.addMenu=true;
  	};

});