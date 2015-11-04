app.controller('HomepageCtrl', HomepageCtrl);

function HomepageCtrl($scope) {           
	$scope.title = "Spectrum Statistics";

	$scope.dropdownItems = [
		'About',
		'Logout',
		'Calendar'
	];

}
