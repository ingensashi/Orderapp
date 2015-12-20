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
	$scope.addressSelected=false;
	$scope.outlet=false;
	var addressPopup=null;
	/**
	 * addressList
	 * addAddress
	 * pickUp
	 */
	$scope.activetab="addressList";
	
	 $scope.model = "";
     $scope.clickedValueModel = "";
     $scope.removedValueModel = "";

     $scope.itemsClicked = function (callback) {
         $scope.clickedValueModel = callback;
     };
     $scope.itemsRemoved = function (callback) {
         $scope.removedValueModel = callback;
     };


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
			return $scope.cityDetails;
		}).error(function (data, status, headers, config) {
			console.log("error",status);

		});
	};
	
	 $scope.getCityItems = function (query) {
         if (query) {
        	 var temp=returnMatchingObject($scope.cityDetails,query);
             return {
            	 cities:temp
             };
         }
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
         return {cities: $scope.cityDetails};
     };
	$scope.selectCity=function(cityId){
		console.log("cityId",cityId);
				$scope.addressDetails.city=cityId;
				var area_details={
						"device_id":"5445554",
						"session_id" : "1E4786B6C2D7492",
						"location_type":"area",
						"city_id":cityId
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
	};
	$scope.getAreaItems = function (query) {
        if (query) {
        	var temp=returnMatchingObject($scope.areaDetails,query);
            return {
            	areas: temp
            };
        }
        return {areas: $scope.areaDetails};
    };
    
    var returnMatchingObject=function(objects,searchText){
    	var temp=[];
    	for(var i=0;i<objects.length;i++){
			if(objects[i].name.toLowerCase().indexOf(searchText.toLowerCase())>-1){
				temp.push(objects[i]);
			}
		}
    	return temp;
    };

	$scope.selectArea=function(areaId){
		console.log("areaId",areaId);
		if(angular.isUndefined($scope.areaDetails)){
			return;
		}
		for(var i=0;i<$scope.areaDetails.length;i++){
			if($scope.areaDetails[i].id==areaId){
				$scope.activeArea=$scope.areaDetails[i];
				$scope.addressDetails.area=$scope.areaDetails[i].id;
			}
		}
	};
	
	$scope.activateAddress=function(address){
		$scope.address.activeAddress=address;
		console.log("modal active address",$scope.address.activeAddress);
		$scope.addressSelected=true;
	};
	$scope.changeAddress=function(){
		$scope.addressSelected=false;
	};
	
	$scope.deleteAddress=function(address){
		for(var i=0;i<$scope.addressList.length;i++){
			if($scope.addressList[i]==address){
				$scope.addressList.splice(i,1);
			}
		}
	};
	var getOutletDetails= function(areaId){
		var area_details={
				"device_id":"5445554",
				"session_id" : $scope.user.sessionId,
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