app.controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $window) {           
	$scope.submitForm = function(isValid) {
		if (isValid) {
			$window.location.href = '#/dashboard';
		}
	};

	$scope.title = "Spectrum Statistics";

	$scope.dropdownItems = [
		'About'
	];
}