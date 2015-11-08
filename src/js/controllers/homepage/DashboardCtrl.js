app.controller('DashboardCtrl', DashboardCtrl);

function DashboardCtrl($scope, backendAPI, DateRange, Queues) {
    /* Retrieves objects of the form:     
            {"TotalPatients": 8, "Providers": 9, "WaitingPatients": 9, "SeenPatients": 8}
    */

    var getDateRange = function() {
        $scope.startDate = DateRange.getStartDate();
        $scope.endDate = DateRange.getEndDate();
    };

    var getQueueData = function() {
        backendAPI.getQueues($scope.startDate, $scope.endDate)
            .then(function(data) {
                Queues.sendAPIData(data);
            }, function(data) {
                // Error
        });
    };

    var createWatchers = function() {
        // Detects broadcast messages from the service. The service broadcasts these message through $rootScope
        $scope.$on('date_range_changed', function() {
            $scope.startDate = DateRange.getStartDate();
            $scope.endDate = DateRange.getEndDate();
            console.log("Date range changed: ", $scope.startDate, '-', $scope.endDate);
            getQueueData();
        });
    };

    var run = function() {
        getDateRange();
        getQueueData();
        createWatchers();
    };

    run();

}

