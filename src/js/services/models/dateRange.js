/*
	Model representing the selected date range for the dashboard view, and other things
*/
app.factory('DateRange', function($rootScope) {

	var dateRange = {};

	dateRange.startDate = new Date();
	dateRange.endDate = new Date();
	dateRange.endDate.setDate(dateRange.startDate.getDate() + 3);

	dateRange.getStartDate = function() { return this.startDate; };
	dateRange.getEndDate = function() { return this.endDate; };

	dateRange.sendStartDate = function(start) {
		this.startDate = start;
		$rootScope.$broadcast('start_date_changed');
	};
	dateRange.sendEndDate = function(end) {
		this.endDate = end;
		$rootScope.$broadcast('end_date_changed');
	};

	return dateRange;
});