'use strict';
app.controller('CategoryCtrl', function($scope, $stateParams) {

 $scope.categoryId=$stateParams.categoryId;
 if($scope.categoryId==null){
  $scope.categoryId="pizza";
}
$scope.bannerModel={"Banner":["img/CAKE.png","img/PASTA.png","img/PIZZA.png","img/CALZONE.png"]};

//alert("categoryId"+$scope.categoryId);
});