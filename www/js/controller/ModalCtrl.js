'use strict';

app.controller('AddressCtrl',
		function($scope, $http) {
	$scope.count=1;
	/**
	 * addressList
	 * addAddress
	 * pickUp
	 */
	$scope.activetab="addressList";
	$scope.changeTab=function(flag){
		$scope.activetab=flag;	
	};
	
	$scope.addressInput=function(){
		
	};

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