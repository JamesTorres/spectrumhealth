app.factory('Filters', function($rootScope) {

	var filters = {};

	filters.thresholds = {
		total: 5,
		waiting: 2,
		seen: 3, 
		providers: 1
	};

	filters.ratios = {
		providerPerPatient: 0.02,
		waitingPerTotal: 0.1
	};

	filters.sendUpdate = function() {
		$rootScope.$broadcast('filters_changed');
	};

	filters.setFilters = function(array) {

		var self = this;

		array.forEach(function(e){
			switch (e.name) {
				case "Provider/Patient Ratio":
					self.ratios.providerPerPatient = parseFloat(e.value);
					break;
				case "Total Patient Threshold":
					self.thresholds.total = parseFloat(e.value);
					break;
				case "Waiting Threshold":
					self.thresholds.waiting = parseFloat(e.value);
					break;
				default:
					break;
			}
		});

		// this.sendUpdate();
	};

	return filters;
});