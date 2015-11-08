app.factory("Queue", function() {

	function Queue(dataPoint) {
		this.mHour = dataPoint.Hour;
		this.mDay = dataPoint.Day;
		this.mMonth = dataPoint.Month;
		this.mYear = dataPoint.Year;
		this.mTotalPatients = dataPoint.TotalPatients;
		this.mProviders = dataPoint.Providers;
		this.mSeenPatients = dataPoint.SeenPatients;
		this.mWaitingPatients = dataPoint.WaitingPatients;
	}

	Queue.prototype.getHour = function() { return mHour; };
	Queue.prototype.getDay = function() { return mDay; };
	Queue.prototype.getMonth = function() { return mMonth; };
	Queue.prototype.getYear = function() { return mYear; };
	Queue.prototype.getTotalPatients = function() { return mTotalPatients; };
	Queue.prototype.getProviders = function() { return mProviders; };
	Queue.prototype.getSeenPatients = function() { return mSeenPatients; };
	Queue.prototype.getWaitingPatients = function() { return mWaitingPatients; };

	Queue.prototype.setHour = function(hour) { mHour = hour; };
	Queue.prototype.setDay = function(day) { mDay = day; };
	Queue.prototype.setMonth = function(month) { mMonth = month; };
	Queue.prototype.setYear = function(year) { mYear = year; };
	Queue.prototype.setTotalPatients = function(total) { mTotalPatients = total; };
	Queue.prototype.setProviders = function(providers) { mProviders = providers; };
	Queue.prototype.setSeenPatients = function(seenPatients) { mSeenPatients = seenPatients; };
	Queue.prototype.setWaitingPatients = function(waitingPatients) { mWaitingPatients = waitingPatients; };

	return Queue;
});