app.controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $window) {           
	$scope.submitForm = function(isValid) {
		if (isValid) {
			$window.location.href = '#/homepage';
		}
	};

	$scope.title = "Spectrum Statistics";

	$scope.dropdownItems = [
		'About'
	];
}