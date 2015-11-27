'use strict';
app.controller('SubCategoryCtrl', function($scope, $http,$ionicPopup,$localStorageService,$CartService) {
	//$controller('CategoryDescCtrl', {$scope: $scope}); //making CategoryDescCtrlparent of this controller
	$scope.productSize={};
	$scope.productToppins={};
	$scope.productBase={};
	$scope.checked={};
	//$scope.baseChecked=false;
	$scope.toppinsChecked={};
	var activeProduct=$scope.cartDetails.activeProduct;
	console.log("init",activeProduct);
	var productId=activeProduct.prodid;
	//$scope.cheesyChecked=false;
	var myPopup=null;
	var init=function(){
		if($scope.cartDetails.nodeDetails===undefined || $scope.cartDetails.nodeDetails===null){
			$scope.cartDetails.nodeDetails={};
		}

		if(angular.isUndefined($scope.cartDetails.nodeDetails[productId])){
			$scope.cartDetails.nodeDetails[productId]={};
			$scope.cartDetails.nodeDetails[productId].count=0;
		}
		if(angular.isUndefined($scope.cartDetails.nodeDetails[productId].properties)){
			$scope.cartDetails.nodeDetails[productId].properties={};
			$scope.cartDetails.nodeDetails[productId].properties.Size="SOLO";
			$scope.cartDetails.nodeDetails[productId].properties.toppins=[];
			$scope.checked.size="SOLO";
			$scope.cartDetails.nodeDetails[productId].properties.toppins.toppinsRate=0;
		}else{
			$scope.checked.size=$scope.cartDetails.nodeDetails[productId].properties.Size;
			$scope.checked.baseChecked=$scope.cartDetails.nodeDetails[productId].properties.Base;
		}
		/*if(angular.isUndefined($scope.activeProperty[productId])){
			$scope.activeProperty[productId]={};
			$scope.activeProperty[productId].size="SOLO";
			$scope.activeProperty[productId].base="";
		}*/
	};
	init();
	var getProductDetails=function(event){
		switch(event){
		case 'Size':
			$scope.showSpinner();
			var productDetails={
					"device_id": "1234",
					"session_id" : "dgdfg",
					"prodid" :productId 	};
			console.log("banner",productDetails);
			$http({
				url : 'http://216.15.228.130:8083/NProductSize.php',
				method : "post",
				data : productDetails
			}).success(function(response) {
				console.log("reponse response.data", response);
				$scope.productSize=response.productsizedetails;
				for(var i=0;i<$scope.productSize.length;i++){
					$scope.productSize[i].sizerate=parseInt($scope.productSize[i].sizerate);
				}
				$scope.hideSpinner();
			}).error(function (data, status, headers, config) {
				console.log("error",status);
				return status;
			});
			break;
		case 'Toppins':
			$scope.showSpinner();
			var productDetails= {
					"device_id": "1234",
					"session_id" : "dgdfg",
					"prodid" :productId  ,
					"prodsize":$scope.cartDetails.nodeDetails[productId].properties.Size
			};
			console.log("banner",productDetails);
			$http({
				url : 'http://216.15.228.130:8083/NProductToppings.php',
				method : "post",
				data : productDetails
			}).success(function(response) {
				$scope.productToppins=response.producttoppingsdetails;
				console.log("$scope.productToppins ",$scope.productToppins[0].toppingid);
				for(var i=0;i<$scope.productToppins.length;i++){
					$scope.toppinsChecked[$scope.productToppins[i].toppingid]={};
					$scope.toppinsChecked[$scope.productToppins[i].toppingid].checked=false;
				}
				for(var j=0;j<$scope.cartDetails.nodeDetails[productId].properties.toppins.length;j++){
					$scope.toppinsChecked[$scope.cartDetails.nodeDetails[productId].properties.toppins[j]].checked=true;
				}
				$scope.hideSpinner();
			}).error(function (data, status, headers, config) {
				console.log("error",status);
				return status;
			});
			break;
		case 'Base':
			$scope.showSpinner();
			var productDetails={
					"device_id": "1234",
					"session_id" : "dgdfg",
					"prodid" : productId  
			};

			console.log("banner",productDetails);
			$http({
				url : 'http://216.15.228.130:8083/NProductCrust.php',
				method : "post",
				data : productDetails
			}).success(function(response) {
				console.log("reponse response.data", response);
				$scope.productBase=response.productcrustdetails;
				$scope.checked.baseChecked=$scope.productBase[0].prodcrust;
				$scope.hideSpinner();
			}).error(function (data, status, headers, config) {
				console.log("error",status);
				return status;
			});
			break;
		}
	};


	$scope.addPropertiesToProduct=function(event,data,rate,checked){
		//alert("checked"+checked);
		console.log("rate",rate);
		switch(event){
		case 'Size':
			$scope.cartDetails.nodeDetails[productId].properties[event]=data;
			//alert("$scope.cartDetails.nodeDetails[productId].properties.sizeRate"+$scope.cartDetails.nodeDetails[productId].properties.sizeRate);
			var nodeDetails=$scope.cartDetails.nodeDetails[productId];
			$scope.cartDetails.productCount=$scope.cartDetails.productCount-$scope.cartDetails.nodeDetails[productId].count+1;
			//get toppins data again as toppins rate changes with size of product
			
			
			var toppinsRate=$scope.cartDetails.nodeDetails[productId].properties.toppins.toppinsRate;

			$scope.cartDetails.amount=(parseFloat( $scope.cartDetails.amount)+parseFloat(toppinsRate)+ parseFloat(rate)-parseFloat(nodeDetails.amount)).toFixed(2);
			//rate of product in json of cart details 
			$scope.cartDetails.nodeDetails[productId].product.rate=rate;
			//rate of active product updated because size of product changed
			$scope.cartDetails.activeProduct.rate=rate;
			//total rate of product including toppinsRate
			nodeDetails.amount=(parseFloat(rate)+parseFloat(toppinsRate)).toFixed(2);
			//size of single product to display on ui when size of product will change excluding rate of toppins
			nodeDetails.sizeRate=rate;
			$scope.cartDetails.nodeDetails[productId].count=1;
			break;
		case 'Toppins':
			if(checked){
				var count=$scope.cartDetails.nodeDetails[productId].count;
				var properties=$scope.cartDetails.nodeDetails[productId].properties;
				properties.toppins.push(data);
				//rate contains all the toppins details put  on toppins id
				/**
				 * bug if one topping detail is added it cannot be deleted as it would be part of another product
				 */
				$scope.cartDetails.nodeDetails[data]=rate;
				//toppins rate is sum of all toppins added to single product  only(not more than one product
				properties.toppins.toppinsRate=(parseFloat(properties.toppins.toppinsRate)+ parseFloat(rate.toppingrate)).toFixed(2);
				$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)+ parseFloat(count*rate.toppingrate)).toFixed(2);
				$scope.cartDetails.nodeDetails[productId].amount= (parseFloat( $scope.cartDetails.nodeDetails[productId].amount)+ parseFloat(count*rate.toppingrate)).toFixed(2);
			}else{
				$scope.removePropertiesFromProduct(event,data,rate.toppingrate);
			}
			break;
		case 'Base':
			$scope.cartDetails.nodeDetails[productId].properties[event]=data;
			if(rate>0){
				alert("handle this");
			}
			break;
		case 'cheesy':
			var count=$scope.cartDetails.nodeDetails[productId].count;
			if(checked){
				$scope.cartDetails.nodeDetails[productId].properties[event]=true;
				$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)+ parseFloat(count*rate)).toFixed(2);
				$scope.cartDetails.nodeDetails[productId].amount= (parseFloat( $scope.cartDetails.nodeDetails[productId].amount)+ parseFloat(count*rate)).toFixed(2);
				//cheesy rate is rate of single product with cheese
				$scope.cartDetails.nodeDetails[productId].properties.cheesyRate=rate;
			}else{
				$scope.cartDetails.nodeDetails[productId].properties[event]=false;
				$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)- parseFloat(count*rate)).toFixed(2);
				$scope.cartDetails.nodeDetails[productId].amount= (parseFloat( $scope.cartDetails.nodeDetails[productId].amount)- parseFloat(count*rate)).toFixed(2);
				$scope.cartDetails.nodeDetails[productId].properties.cheesyRate=0;
			}
			break;
		}

		console.log("$scope.cartDetails",$scope.cartDetails);
		$localStorageService.setCardDetails($scope.cartDetails);
	};

	$scope.removePropertiesFromProduct=function(event,data,rate){
		var activeProduct=$scope.cartDetails.activeProduct;
		console.log("addvarietyToProduct",activeProduct);
		var productId=activeProduct.prodid;
		switch(event){
		case 'Size':
			$scope.cartDetails.nodeDetails[productId].properties.sizeRate=0;
			$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)- parseFloat(rate)).toFixed(2);
			break;
		case 'Toppins':
			var count=$scope.cartDetails.nodeDetails[productId].count;
			for(var i=0;i<$scope.cartDetails.nodeDetails[productId].properties.toppins.length;i++){
				if($scope.cartDetails.nodeDetails[productId].properties.toppins[i]==data){
					$scope.cartDetails.nodeDetails[productId].properties.toppins.splice(i, 1);
					$scope.cartDetails.amount= (parseFloat( $scope.cartDetails.amount)- parseFloat(count*rate)).toFixed(2);
					var properties=$scope.cartDetails.nodeDetails[productId].properties;
					//toppins rate is sum of all toppins added to single product  only(not more than one product
					properties.toppins.toppinsRate=(parseFloat(properties.toppins.toppinsRate)- parseFloat(rate)).toFixed(2);
					$scope.cartDetails.nodeDetails[productId].amount= (parseFloat( $scope.cartDetails.nodeDetails[productId].amount)- parseFloat(count*rate)).toFixed(2);
				}
			}
			break;
		}
	};


	$scope.showPopup = function(popupItem) {
		$scope.event1 = popupItem;
		getProductDetails($scope.event1);
		myPopup = $ionicPopup.show({
			templateUrl : 'templates/itemPopup.html',
			cssClass : 'full-width;',
			scope : $scope,
		});
		myPopup.then(function(res) {
		});
	};
	$scope.hidePopup=function(flag){
		myPopup.close();
	};
	$scope.addItemToCart=function(product){
		$CartService.addItemWithPropsToCart(product,$scope.cartDetails);
	};

	$scope.removeItemFromCart=function(product){
		$CartService.removeItemWithPropsFromCart(product,$scope.cartDetails);
	};
});