/*
	Uses localStorage to save preferences and some other values
*/
app.factory('localStorage', ['$window', function($window) {
	return {
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
			return JSON.parse($window.localStorage[key] || null);
		},
		clear: function() {
			$window.localStorage.clear();
		}
	};
}]);