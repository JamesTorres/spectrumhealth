/*
	Controls the reports/graphs on a page.
*/
app.controller('reportController', ['$scope', 'queues', function($scope, queues) {
    queues.success(function(data) {
    	$scope.queues = data;
    	console.log(data);
    });
}]);