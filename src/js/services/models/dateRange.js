/*
	Model representing the selected date range for the dashboard view, and other things
*/
app.factory('DateRange', function() {

	// Private variables
	var startDate = new Date();
	var endDate = new Date();

	// Set the default day span to be three days
	endDate.setDate(startDate.getDate() + 3);

	return {
		getStartDate: function() { return startDate; }, 
		getEndDate: function() { return endDate; },
		setStartDate: function(date) { startDate = date; },
		setEndDate: function(date) { endDate = date; }
	};
});