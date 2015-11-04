app.controller('CalendarCtrl', CalendarCtrl);

function CalendarCtrl($scope, spectrumAPI) {

	$scope.title = "Spectrum Statistics";

	$scope.dropdownItems = [
		'About',
		'Logout',
		'CalendarZZZ'
	];
}
