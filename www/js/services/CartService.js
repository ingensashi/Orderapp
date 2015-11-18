app.service('$CartService', function($localStorageService) {
	this.addItemToCart=function(product,cartDetails){
		//	console.log("product addItemToCart",product.prodid);
		var isDuplicate=false;
		var productId=product.prodid;
		for(var i=0;i<cartDetails.itemList.length;i++){
			if(cartDetails.itemList[i]==productId){
				isDuplicate=true;
			}
		}
		if(!isDuplicate){
			cartDetails.itemList.push(productId);
		}
		if(angular.isUndefined(cartDetails.nodeDetails[productId])){
			cartDetails.nodeDetails[productId]={};
			cartDetails.nodeDetails[productId].count=0;
		}
		cartDetails.nodeDetails[productId].product=product;
		cartDetails.nodeDetails[productId].count=cartDetails.nodeDetails[productId].count+1;
		console.log(cartDetails.amount+"cartDetails.amount");
		cartDetails.productCount=cartDetails.productCount+1;
		cartDetails.amount= (parseFloat( cartDetails.amount)+ parseFloat(product.rate)).toFixed(2);
		//	console.log("cartDetails",cartDetails);
		$localStorageService.setCardDetails(cartDetails);
	};

	this.removeItemFromCart=function(product,cartDetails){
		//console.log("product addItemToCart",product.prodid);
		var productId=product.prodid;
		if(angular.isUndefined(cartDetails.nodeDetails[productId]) || cartDetails.nodeDetails[productId].count==0){
			alert("please add atleast one time");
			return;
		}
		cartDetails.nodeDetails[productId].count=cartDetails.nodeDetails[productId].count-1;
		if(cartDetails.nodeDetails[productId].count==0){
			for(var i=0;i<cartDetails.itemList.length;i++){
				if(cartDetails.itemList[i]==productId){
					cartDetails.itemList.splice(i, 1);
				}
			}
			delete cartDetails.nodeDetails[productId].product;
		}
		cartDetails.productCount=cartDetails.productCount-1;
		//console.log(cartDetails.amount+"cartDetails.amount");
		cartDetails.amount= (parseFloat( cartDetails.amount)- parseFloat(product.rate)).toFixed(2);
		//	console.log("cartDetails",cartDetails);
		$localStorageService.setCardDetails(cartDetails);
	};

});