app.controller('DashboardCtrl', DashboardCtrl);

function DashboardCtrl($scope, backendAPI, DateRange, Queues) {

    var getDateRange = function() {
        $scope.startDate = DateRange.getStartDate();
        $scope.endDate = DateRange.getEndDate();
    };

    var getQueueData = function() {
        backendAPI.getQueues($scope.startDate, $scope.endDate)
            .then(function(data) {
                Queues.sendAPIData(data);
                $scope.initialized.dashboard = true;
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
        // Gets the default date range (located in DateRange service)
        getDateRange();

        // Initialized flag is located in the HomepageCtrl. This keeps track of if we need to query API on Controller load
        if (!$scope.initialized.dashboard) { getQueueData(); }

        // Creates watchers to check for date_range_changes. Upon change, we query API again
        createWatchers();
    };

    run();

}

