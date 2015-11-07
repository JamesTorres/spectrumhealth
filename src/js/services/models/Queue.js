app.factory('Queue',  function(){



	var mDepartment = null;
	var mTotalPatients = null;
	var mProviders = null;
	var mSeenPatients = null;
	var mWaitingPatients = null;

	return {
		getDepartment: function() { return mDepartment; },
		getTotalPatients: function() { return mTotalPatients; },
		getProviders: function() { return mProviders; },
		getSeenPatients: function() { return mSeenPatients; },
		getWaitingPatients: function() { return mWaitingPatients; },
		setDepartment: function(department) { mDepartment = department; },
		setTotalPatients: function(total) { mTotalPatients = total; },
		setProviders: function(providers) { mProviders = providers; },
		setSeenPatients: function(seenPatients) { mSeenPatients = seenPatients; },
		setWaitingPatients: function(waitingPatients) { mWaitingPatients = waitingPatients; 3}
	}
});