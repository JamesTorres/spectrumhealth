app.controller('headerController', ['$scope', function($scope) { 
	$scope.title = "Spectrum Statistics";

	$scope.dropdownItems = [
		'About',
		'Calendar',
		'Logout'
	];
}]);