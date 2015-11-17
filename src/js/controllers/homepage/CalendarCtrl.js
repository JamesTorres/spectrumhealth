app.controller('CalendarCtrl', CalendarCtrl);

function CalendarCtrl($scope, moment) {
	$scope.expanded = false;
	$scope.expandRow = function(rowNum) {
		// Move to directive link function?? (DOM Manipulation)
		// alert(rowNum);
	};

	// console.log(moment({ year :2015, month :10, day :16, hour :0, minute :0, second :0, millisecond :0}));

	$scope.details = [
		{ date: new Date(2015, 10, 16, 4), detail: {duration:3, text:"Predicted understaffing."} },
		{ date: new Date(2015, 10, 17, 1), detail: {duration:2, text:"There is expected to be a large number of patients."}},
		{ date: new Date(2015, 10, 18, 9), detail: {duration:4, text:""}},
		{ date: new Date(2015, 10, 19, 10), detail: {duration:1, text:"Predicted understaffing."}},
		{ date: new Date(2015, 10, 20, 11), detail: {duration:1, text:"2-4pm: There is expected to be a large number of patients."}},
		{ date: new Date(2015, 10, 21, 18), detail: {duration:2, text:"There is expected to be a large number of patients."}}
	];

	$scope.today = moment();

	// $scope.details = ["6-9pm: Predicted understaffing.", "2-4pm: There is expected to be a large number of patients."];	

	// $scope.calendarView = 'month';
}
