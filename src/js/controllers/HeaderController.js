app.controller('headerController', ['$scope', function($scope) { 
	$scope.title = "Spectrum Statistics";

	$scope.dropdownItems = [
		'About',
		'Calendar',
		'Logout'
	];

	$scope.dropdownStatus = {
		isopen: false
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};
}]);