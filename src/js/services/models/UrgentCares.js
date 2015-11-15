app.factory('UrgentCares', function($rootScope) { 

	var urgentCares = {
		showEmptyPoints: false,
		simpleMode: false,
		averageOver: 3,
		alpine: {
			key: "Alpine",			// Graph legend value
			data: [],				// Array of Queue objects
			color: "#f0ab30",		// Color for graphs
			enabled: true			// If the usage is enabled
		},
		broadmoor: {
			key: "Broadmoor",
			data: [],
			color: "#18375a",
			enabled: false
		},
		eastBeltline: {
			key: "East Beltline",
			data: [],
			color: "#000",
			enabled: false
		}, 
		westPavilion: {
			key: "West Pavilion",
			data: [],
			color: "#1f3",
			enabled: false
		}
	};

	urgentCares.changeSelected = function(array) {
		var self = this;

		array.forEach(function(e) {
			switch (e.name) {
				case "Alpine":
					self.alpine.enabled = e.enabled;
					break;
				case "Broadmoor":
					self.broadmoor.enabled = e.enabled;
					break;
				case "East Beltline":
					self.eastBeltline.enabled = e.enabled;
					break;
				case "West Pavilion":
					self.westPavilion.enabled = e.enabled;
					break;
				default:
					break;
			}
		});

		// Broadcasts that the selected UCs changed. This is handled in... Queues.js
		$rootScope.$broadcast('urgent_cares_changed');

		return true;
	};

	urgentCares.changeShowEmptyPoints = function(b) {
		this.showEmptyPoints = b;
		$rootScope.$broadcast('urgent_cares_changed');
	};

	urgentCares.changeSimpleMode = function(b) {
		this.simpleMode = b;
		$rootScope.$broadcast('urgent_cares_changed');
	};

	urgentCares.sendUpdate = function() {
		$rootScope.$broadcast('urgent_cares_changed');
	};

	urgentCares.clearData = function() {
		this.alpine.data = [];
		this.broadmoor.data = [];
		this.eastBeltline.data = [];
		this.westPavilion.data = [];
	};

	return urgentCares;
});