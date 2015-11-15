app.factory("Queue", function() {

	function Queue(dataPoint) {
		this.mDate = new Date(dataPoint.Year, dataPoint.Month, dataPoint.Day, dataPoint.Hour);
		this.mTotalPatients = dataPoint.TotalPatients;
		this.mProviders = dataPoint.Providers;
		this.mSeenPatients = dataPoint.SeenPatients;
		this.mWaitingPatients = dataPoint.WaitingPatients;
	}

	Queue.prototype.getDate = function() { return this.mDate; };
	Queue.prototype.getHour = function() { return this.mDate.getHours(); };
	Queue.prototype.getDay = function() { return this.mDate.getDate(); };
	Queue.prototype.getMonth = function() { return this.mDate.getMonth(); };
	Queue.prototype.getYear = function() { return this.mDate.getFullYear(); };
	Queue.prototype.getTotalPatients = function() { return this.mTotalPatients; };
	Queue.prototype.getProviders = function() { return this.mProviders; };
	Queue.prototype.getSeenPatients = function() { return this.mSeenPatients; };
	Queue.prototype.getWaitingPatients = function() { return this.mWaitingPatients; };

	Queue.prototype.setDate = function(date) { this.mDate = date; };
	Queue.prototype.setHour = function(hour) { this.mDate.setHours(hour); };
	Queue.prototype.setDay = function(day) { this.mDate.setDate(day); };
	Queue.prototype.setMonth = function(month) { this.mDate.setMonth(month); };
	Queue.prototype.setYear = function(year) { this.mDate.setFullYear(year); };
	Queue.prototype.setTotalPatients = function(total) { this.mTotalPatients = total; };
	Queue.prototype.setProviders = function(providers) { this.mProviders = providers; };
	Queue.prototype.setSeenPatients = function(seenPatients) { this.mSeenPatients = seenPatients; };
	Queue.prototype.setWaitingPatients = function(waitingPatients) { this.mWaitingPatients = waitingPatients; };

	return Queue;
});