app.controller('CalendarCtrl', CalendarCtrl);

function CalendarCtrl($scope, moment, Parser, backendAPI) {
	$scope.expanded = false;
	$scope.expandRow = function(rowNum) {
		// Move to directive link function?? (DOM Manipulation)
		// alert(rowNum);
	};
	$scope.today = moment();

	// console.log(moment({ year :2015, month :10, day :16, hour :0, minute :0, second :0, millisecond :0}));

	// $scope.details = [
	// 	{ date: new Date(2015, 10, 16, 4), detail: {duration:3, text:"Predicted understaffing."} },
	// 	{ date: new Date(2015, 10, 17, 1), detail: {duration:2, text:"There is expected to be a large number of patients."}},
	// 	{ date: new Date(2015, 10, 18, 9), detail: {duration:4, text:""}},
	// 	{ date: new Date(2015, 10, 19, 10), detail: {duration:1, text:"Predicted understaffing."}},
	// 	{ date: new Date(2015, 10, 20, 11), detail: {duration:1, text:"2-4pm: There is expected to be a large number of patients."}},
	// 	{ date: new Date(2015, 10, 21, 18), detail: {duration:2, text:"There is expected to be a large number of patients."}}
	// ];

	// $scope.$on('filters_changed', function() {
 //        console.log(Filters);
 //    });

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
