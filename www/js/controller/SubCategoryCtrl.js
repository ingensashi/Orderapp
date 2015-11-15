'use strict';
app.controller('SubCategoryCtrl', function($scope, $http,$ionicPopup) {
	$scope.productSize={};
	$scope.productToppins={};
	$scope.productBase={};
	var myPopup=null;

	 var getProductDetails=function(event){
		switch(event){
		case 'Size':
			var productDetails={
				"device_id": "1234",
				"session_id" : "dgdfg",
				"prodid" : "M01"  	};
			console.log("banner",productDetails);
			$http({
				url : 'http://216.15.228.130:8083/NProductSize.php',
				method : "post",
				data : productDetails
			}).then(function(response) {
				console.log("reponse response.data", response.data);
				$scope.productSize=response.data.productsizedetails;
			});
			break;
		case 'Toppins':
			var productDetails= {
				"device_id": "1234",
				"session_id" : "dgdfg",
				"prodid" : "M001"  ,
				"prodsize":"DOUBLE"
		};
			console.log("banner",productDetails);
			$http({
				url : 'http://216.15.228.130:8083/NProductToppings.php',
				method : "post",
				data : productDetails
			}).then(function(response) {
				console.log("reponse response.data", response.data);
				$scope.productToppins=response.data.producttoppingsdetails;
			});
			break;
		case 'Base':
			var productDetails={
				"device_id": "1234",
				"session_id" : "dgdfg",
				"prodid" : "M01"  
		};

			console.log("banner",productDetails);
			$http({
				url : 'http://216.15.228.130:8083/NProductCrust.php',
				method : "post",
				data : productDetails
			}).then(function(response) {
				console.log("reponse response.data", response.data);
				$scope.productBase=response.data.productcrustdetails;
			});
			break;
		}
	};


	$scope.showPopup = function(popupItem) {
		$scope.event1 = popupItem;
		$scope.data = {};
		getProductDetails($scope.event1);

		// An elaborate, custom popup
		 myPopup = $ionicPopup.show({
			templateUrl : 'templates/itemPopup.html',
			cssClass : 'full-width;',
			scope : $scope,
			/*
			 * buttons: [ { text: '<b>Cancle</b>', type:
			 * 'button-assertive', onTap: function(e) { if
			 * ($scope.data.wifi) { //don't allow the user to close unless
			 * he enters wifi password e.preventDefault(); } else { return
			 * $scope.data.wifi; } } } ]
			 */

		});
		myPopup.then(function(res) {
			// console.log('Tapped!', res);
		});
	};
$scope.hidePopup=function(flag){
	myPopup.close();
}
});