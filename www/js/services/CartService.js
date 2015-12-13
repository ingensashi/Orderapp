app.service('$CartService', function($localStorageService) {
	this.addItemWithPropsToCart=function(product,cartDetails){
		console.log("product addItemToCart",cartDetails);
		var isDuplicate=false;
		console.log("product",product)
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
			cartDetails.nodeDetails[productId].amount=0;
			cartDetails.nodeDetails[productId].sizeRate=0;
		}
		cartDetails.nodeDetails[productId].product=product;
		cartDetails.nodeDetails[productId].count=cartDetails.nodeDetails[productId].count+1;
		var properties=cartDetails.nodeDetails[productId].properties;
		var toppinsRate=0.00;
		if(angular.isDefined(properties) ){
			if(angular.isDefined(properties)){
				if(angular.isDefined(properties.toppins.toppinsRate)){
					toppinsRate=properties.toppins.toppinsRate;
				}
				if(angular.isDefined(properties.cheesyRate)){
					toppinsRate=(parseFloat(toppinsRate)+parseFloat(properties.cheesyRate)).toFixed(2);
				}
			}
		}
		console.log("toppinsRate"+toppinsRate);
		//total product count
		cartDetails.productCount=cartDetails.productCount+1;
		//total rate of product including toppinsRate
		cartDetails.nodeDetails[productId].amount=(parseFloat(cartDetails.nodeDetails[productId].amount)+parseFloat(product.rate)+parseFloat(toppinsRate)).toFixed(2) ;
		//total amount for all products
		cartDetails.amount= (parseFloat( cartDetails.amount)+ parseFloat(product.rate)+parseFloat(toppinsRate)).toFixed(2);
		cartDetails.taxAmount=(parseFloat( cartDetails.taxAmount)+ parseFloat(product.taxpercent)).toFixed(2);
		//size of single product to display on ui when size of product will change excluding rate of toppins
		cartDetails.nodeDetails[productId].sizeRate=parseFloat(product.rate).toFixed(2);
		console.log(cartDetails.taxAmount+"cartDetails");
		console.log("cartDetails",cartDetails);
		$localStorageService.setCardDetails(cartDetails);
	};

	this.removeItemWithPropsFromCart=function(product,cartDetails){
		//console.log("product addItemToCart",product.prodid);

		var productId=product.prodid;
		if(angular.isUndefined(cartDetails.nodeDetails[productId]) || cartDetails.nodeDetails[productId].count==0){
			alert("please add atleast one time");
			return;
		}
		var properties=cartDetails.nodeDetails[productId].properties;
		var toppinsRate=0.00;
		if(angular.isDefined(properties)){
			if(angular.isDefined(properties.toppins.toppinsRate)){
				toppinsRate=properties.toppins.toppinsRate;
			}
			if(angular.isDefined(properties.cheesyRate)){
				toppinsRate=toppinsRate+properties.cheesyRate;
			}
		}
		cartDetails.nodeDetails[productId].count=cartDetails.nodeDetails[productId].count-1;
		//total rate of product including toppinsRate
		cartDetails.nodeDetails[productId].amount=(parseFloat(cartDetails.nodeDetails[productId].amount)-parseFloat(product.rate)-parseFloat(toppinsRate)).toFixed(2) ;

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
		cartDetails.amount= (parseFloat( cartDetails.amount)- parseFloat(product.rate)-parseFloat(toppinsRate)).toFixed(2);
		cartDetails.taxAmount=(parseFloat( cartDetails.taxAmount)- parseFloat(product.taxpercent)).toFixed(2);
		console.log("cartDetails",cartDetails);
		$localStorageService.setCardDetails(cartDetails);
	};
	
	this.deleteItemFromCart=function(product,cartDetails){
		//console.log("product addItemToCart",product.prodid);
		var productId=product.prodid;
		var prodCount=cartDetails.nodeDetails[productId].count;
		cartDetails.productCount=cartDetails.productCount-cartDetails.nodeDetails[productId].count;
		//console.log(cartDetails.amount+"cartDetails.amount");
		cartDetails.amount= (parseFloat( cartDetails.amount)- parseFloat(cartDetails.nodeDetails[productId].amount)).toFixed(2);
		cartDetails.taxAmount= (parseFloat( cartDetails.taxAmount)- parseFloat(prodCount*product.taxpercent)).toFixed(2);
		console.log("cartDetails.taxAmount",cartDetails.taxAmount);
		for(var i=0;i<cartDetails.itemList.length;i++){
			if(cartDetails.itemList[i]==productId){
				cartDetails.itemList.splice(i, 1);
			}
		}
		delete cartDetails.nodeDetails[productId];
		$localStorageService.setCardDetails(cartDetails);
	};
	
	
	this.addItemToCart=function(product,cartDetails){
		//	console.log("product addItemToCart",product.prodid);
		var isDuplicate=false;
		console.log("product",product)
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
			cartDetails.nodeDetails[productId].amount=0;
			cartDetails.nodeDetails[productId].sizeRate=0;
		}
		cartDetails.nodeDetails[productId].product=product;
		cartDetails.nodeDetails[productId].count=cartDetails.nodeDetails[productId].count+1;
		console.log(cartDetails.amount+"cartDetails.amount");

		//total product count
		cartDetails.productCount=cartDetails.productCount+1;
		//total rate of product including toppinsRate
		cartDetails.nodeDetails[productId].amount=(parseFloat(cartDetails.nodeDetails[productId].amount)+parseFloat(product.rate)).toFixed(2) ;
		//total amount for all products
		cartDetails.amount= (parseFloat( cartDetails.amount)+ parseFloat(product.rate)).toFixed(2);
		cartDetails.taxAmount=(parseFloat( cartDetails.taxAmount)+ parseFloat(product.taxpercent)).toFixed(2);
		//size of single product to display on ui when size of product will change excluding rate of toppins
		//cartDetails.nodeDetails[productId].sizeRate=parseFloat(product.rate).toFixed(2);
		console.log("cartDetails",cartDetails);
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
		//total rate of product 
		cartDetails.nodeDetails[productId].amount=(parseFloat(cartDetails.nodeDetails[productId].amount)-parseFloat(product.rate)).toFixed(2) ;

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
		cartDetails.taxAmount=(parseFloat( cartDetails.taxAmount)- parseFloat(product.taxpercent)).toFixed(2);
		console.log("cartDetails",cartDetails);
		$localStorageService.setCardDetails(cartDetails);
	};

});