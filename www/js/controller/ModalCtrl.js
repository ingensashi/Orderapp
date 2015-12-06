'use strict';

app.controller('AddressCtrl',
		function($scope, $http,$ionicPopup) {
	$scope.count=1;
	$scope.activeArea='';
	$scope.cityDetails={};
	$scope.areaDetails={};
	$scope.outletDetails={};
	$scope.addressDetails={};
	$scope.addressList=[];
	$scope.outlet=false;
	var addressPopup=null;
	/**
	 * addressList
	 * addAddress
	 * pickUp
	 */
	$scope.activetab="addressList";

	$scope.changeTab=function(flag){
		$scope.activetab=flag;
		if(addressPopup!=null){
			$scope.addressDetails={};
			addressPopup.close();
		}
	};
	var getCityList=function(){
		var city_details={
				"device_id":"5445554",
				"session_id" : "1E4786B6C2D7492",
				"location_type":"city"
		}

		$http({
			url : 'http://216.15.228.130:8083/NLocationRequest.php',
			method : "post",
			data : city_details
		}).success(function(response) {
			$scope.cityDetails=response;
			console.log("cityDetails ", response);
		}).error(function (data, status, headers, config) {
			console.log("error",status);

		});
	}
	$scope.selectCity=function(cityId){
		console.log("dsfdsfrtdf",cityId);
		for(var i=0;i<$scope.cityDetails.length;i++){
			if($scope.cityDetails[i].name==cityId){
				$scope.addressDetails.city=$scope.cityDetails[i].id;
				var area_details={
						"device_id":"5445554",
						"session_id" : "1E4786B6C2D7492",
						"location_type":"area",
						"city_id":$scope.cityDetails[i].id
				}
				$http({
					url : 'http://216.15.228.130:8083/NLocationRequest.php',
					method : "post",
					data : area_details
				}).success(function(response) {
					$scope.areaDetails=response;
					console.log("areaDetails ", response);
				}).error(function (data, status, headers, config) {
					console.log("error",status);

				});
			}
		}

	};
	$scope.selectArea=function(areaId){
		console.log("dsfdsfrtdf",areaId);
		if(angular.isUndefined($scope.areaDetails)){
			return;
		}
		for(var i=0;i<$scope.areaDetails.length;i++){
			if($scope.areaDetails[i].name==areaId){
				$scope.activeArea=$scope.areaDetails[i];
				$scope.addressDetails.area=$scope.areaDetails[i].id;
			}
		}
	};
	var getOutletDetails= function(areaId){
		var area_details={
				"device_id":"5445554",
				"session_id" : "1E4786B6C2D7492",
				"location_type":"outlet",
				"area_id":areaId 
		}
		$http({
			url : 'http://216.15.228.130:8083/NLocationRequest.php',
			method : "post",
			data : area_details
		}).success(function(response) {
			$scope.outletDetails=response;
			console.log("outletDetails ", response);
		}).error(function (data, status, headers, config) {
			console.log("error",status);

		});
	} ;
	var getAddressList=function(){
		var addressList={
			"device_id":"5445554",
			"session_id" : "32F179622B8F4FC",
			"flag" :"addresslist"
			}
		$http({
			url : 'http://216.15.228.130:8083/NAddressList.php',
			method : "post",
			data : addressList
		}).success(function(response) {
			console.log("addressList  :",response);
			$scope.addressList=response.addresslist;
		}).error(function (data, status, headers, config) {
			console.log("error",status);
			alert("something wrong happened please try again");
		});
	};


	$scope.findOutlet=function(){
		$scope.outlet=true;
		getOutletDetails($scope.activeArea.id);
	};

	$scope.saveAddress=function(){
		$scope.addressDetails.device_id="5445554";
		$scope.addressDetails.session_id="32F179622B8F4FC";
		console.log($scope.addressDetails)
		$http({
			url : 'http://216.15.228.130:8083/NAddressSave.php',
			method : "post",
			data : $scope.addressDetails
		}).success(function(response) {
			addressConfirmPopup();
			getAddressList();
		}).error(function (data, status, headers, config) {
			console.log("error",status);
			alert("something wrong happened please try again");
		});
	};

	var addressConfirmPopup = function() {
		addressPopup = $ionicPopup.show({
			templateUrl : 'templates/addressConfirmPopup.html',
			cssClass : 'full-width;',
			scope : $scope,
		});
		addressPopup.then(function(res) {
		});
	};
	var init=function(){
		getCityList();
		getAddressList();
	}
	init();
});

app.controller('WalletCtrl',
		function($scope, $http) {
	$scope.count=1;
	/**
	 * addressList
	 * addAddress
	 * pickUp
	 */
	$scope.activetab="walletAmount";
	$scope.changeTab=function(flag){
		$scope.activetab=flag;	
	};

	$scope.addAmountToWallet=function(){

	};

});