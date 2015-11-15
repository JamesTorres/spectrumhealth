app.controller('CalendarCtrl', CalendarCtrl);

function CalendarCtrl($scope) {
	$scope.dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	$scope.week = [1,2,3,4,5,6,7];
	$scope.rows = [0,1,2,3];

	$scope.expanded = false;
	$scope.expandRow = function(rowNum) {
		// Move to directive link function?? (DOM Manipulation)
		alert(rowNum);
	};
}
