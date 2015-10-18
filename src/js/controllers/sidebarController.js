app.controller('sidebarController', ['$scope', function($scope) {
	/*
		Sidebar contains preferences:
			- API's to use
			- Order of graphs
			- Theme
			- Model?
	*/
    $scope.state = false;
    
    $scope.toggleState = function() {
        $scope.state = !$scope.state;
    };
}]);