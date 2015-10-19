app.controller('loginController', ['$scope', '$window', function($scope, $window) {           
	$scope.submitForm = function(isValid) {
		if (isValid) {
			$window.location.href = '#/dashboard';
		}
	};

	$scope.title = "Spectrum Statistics";

	$scope.dropdownItems = [
		'About'
	];
}]);