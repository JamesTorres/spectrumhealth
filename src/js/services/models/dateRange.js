/*
	Model representing the selected date range for the dashboard view, and other things
*/
app.factory('dateRange', function() {

	var startDate = new Date();
	var endDate = new Date();
	endDate.setDate(startDate.getDate() + 3);	// 3 day span

	return {
		getStartDate: function() {
			return startDate;
		}, 
		getEndDate: function() {
			return endDate;
		},
		setStartDate: function(date) {
			startDate = date;
		},
		setEndDate: function(date) {
			endDate = date;
		}
	};
});