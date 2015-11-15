app.controller("HomepageCtrl", HomepageCtrl);

function HomepageCtrl($scope) {

	// Homepage defaults to dashboard for now
	$scope.view = 'Calendar';

	// Keep track of if we have already queried the API (per page)
	$scope.initialized = {
		dashboard: false,
		calendar: false
	};
}