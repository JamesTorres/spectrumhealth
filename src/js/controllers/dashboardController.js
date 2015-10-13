/*
	Controls the dashboard (basically the homepage)
*/
app.controller('dashboardController', ['$scope', 'queues', function($scope, queues) {
    queues.success(function(data) {
    	$scope.queues = data;
    });

    $scope.generateGraph = function() {
    	
    };
}]);
