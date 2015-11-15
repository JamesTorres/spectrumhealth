app.controller('CalendarCtrl', CalendarCtrl);

function CalendarCtrl($scope) {
	$scope.dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	$scope.week = [1,2,3,4,5,6,7];
	$scope.rows = [0,1,2,3];
}
