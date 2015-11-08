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
        $scope.$on('start_date_changed', function() {
            $scope.startDate = DateRange.getStartDate();
            console.log("Start date changed: ",$scope.startDate);
            getQueueData();
        });
        $scope.$on('end_date_changed', function() {
            $scope.endDate = DateRange.getEndDate();
            console.log("End date changed: ",$scope.endDate);
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

