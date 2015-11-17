app.service('$locationService', function($cordovaGeolocation) {

	this.getCurrentLocation=function(callback){
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
		$cordovaGeolocation
		.getCurrentPosition(posOptions)
		.then(function (position) {
			console.log("pos",position);
			var pos={};
			pos.lat  = position.coords.latitude;
			pos.long = position.coords.longitude;
			console.log("pos",pos);
			callback(pos);
		}, function(err) {
			// error
		});

	};
	this.watchLocation=function(){
		var watchOptions = {
				timeout : 3000,
				enableHighAccuracy: false // may cause errors if true
		};

		var watch = $cordovaGeolocation.watchPosition(watchOptions);
		watch.then(
				null,
				function(err) {
					// error
				},
				function(position) {
					var pos={};
					pos.lat  = position.coords.latitude
					pos.long = position.coords.longitude
					return pos;
				});
	};
	this.clearLocationWatch=function(){
		watch.clearWatch();
		// OR
		$cordovaGeolocation.clearWatch(watch)
		.then(function(result) {
			// success
		}, function (error) {
			// error
		});
	};

});