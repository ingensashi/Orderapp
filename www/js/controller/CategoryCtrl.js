'use strict';
app.controller('CategoryCtrl', function($scope, $stateParams) {

 $scope.categoryId=$stateParams.categoryId;
 if($scope.categoryId==null){
  $scope.categoryId="pizza";
}
$scope.bannerModel={"Banner":["img/soiWebs/soi5.jpg","img/soiWebs/soi.jpg","img/soiWebs/soi1.jpg","img/soiWebs/soi3.jpg"]};

//alert("categoryId"+$scope.categoryId);
});