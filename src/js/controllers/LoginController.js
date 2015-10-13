app.controller('loginController', ['$scope', function($scope) {           
	$scope.submitForm = function(isValid) {
		if (isValid) {
			alert('valid form');
		}
	};
}]);