app.controller("HomepageCtrl", HomepageCtrl);

function HomepageCtrl($scope, localStorage) {

	// Homepage defaults to dashboard for now
	$scope.view = 'Calendar';

	// Keep track of if we have already queried the API (per page)
	$scope.initialized = {
		dashboard: false,
		calendar: false
	};

    // Saves preferences to localStorage
    $scope.savePreferences = function() {
        localStorage.setObject('view', $scope.view);
    };

    // Loads preferences from localStorage (using service "storage")
    $scope.loadPreferences = function(){
        // If we have preferences in localStorage, get them
        if (localStorage.getObject('view') !== null) {
            $scope.view = localStorage.getObject('view');
        }
    };

    $scope.loadPreferences();
}