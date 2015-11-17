app.controller('CalendarCtrl', CalendarCtrl);

function CalendarCtrl($scope, moment, Parser, backendAPI) {
	$scope.expanded = false;
	$scope.expandRow = function(rowNum) {
		// Move to directive link function?? (DOM Manipulation)
		// alert(rowNum);
	};
	$scope.today = moment();

	// TODO - handle requerying after switching month?	(move this code to calendar.js, or implement watcher)

    var getQueueData = function() {
    	var range = getMonthDateRange($scope.today.year(), $scope.today.month());

        backendAPI.getQueuesWithMoment(range.start, range.end)
            .then(function(data) {
                Parser.parseAPIForCalendar(data);
                $scope.initialized.calendar = true;
            }, function(data) {
                // Error
        });
    };

    // Taken sort-of from stack overflow 	(http://stackoverflow.com/questions/26131003/moment-js-start-and-end-of-given-month)
    var getMonthDateRange = function(year, month) {
    	var startDate = moment([year, month]);
    	var endDate = moment(startDate).endOf('month');

    	return { start: startDate, end: endDate };
    };


    $scope.$on('filters_changed', function() {
        $scope.details = Parser.getDetails();
    });

    getQueueData();


	// $scope.details = ["6-9pm: Predicted understaffing.", "2-4pm: There is expected to be a large number of patients."];	

	// $scope.calendarView = 'month';
}
