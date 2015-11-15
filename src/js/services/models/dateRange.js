/*
	Model representing the selected date range for the dashboard view, and other things
*/
app.factory('DateRange', function($rootScope) {

	var dateRange = {};

	dateRange.startDate = new Date();
	dateRange.endDate = new Date();
	// dateRange.endDate.setDate(dateRange.startDate.getDate() + 2);
	dateRange.startDate.setDate(dateRange.startDate.getDate() - 2);

	dateRange.getStartDate = function() { return this.startDate; };
	dateRange.getEndDate = function() { return this.endDate; };

	dateRange.sendDateRange = function(start, end) {
		this.startDate = start;
		this.endDate = end;
		$rootScope.$broadcast('date_range_changed');
	};

	return dateRange;
});