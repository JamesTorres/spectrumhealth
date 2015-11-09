/*
	Retrieves the Urgent Care queues from the BACKEND. The JSON format:
	
		{"totalPatients": 8, "providers": 9, "waitingPatients": 9, "seenPatients": 8}

	Test url: 		http://jsonplaceholder.typicode.com/posts/1
	Heroku (old): 	https://peaceful-coast-3278.herokuapp.com/
	Azure (new): 	http://patientservicedeliveryplanning.azurewebsites.net/api/data
	Ngrok: 			https://2c926ff3.ngrok.io/api/data
*/
app.service('backendAPI', function($http, $q) {
	
	this.getQueues = function(startDate, endDate) {

		var urlBase = "https://2c926ff3.ngrok.io/api/data";

		var request = $http({
			method: 'GET',
			url: urlBase,
			params: {
				"m1": startDate.getMonth(),
				"y1": startDate.getFullYear(),
				"d1": startDate.getDate(),
				"h1": startDate.getHours(),
				"m2": endDate.getMonth(),
				"y2": endDate.getFullYear(),
				"d2": endDate.getDate(),
				"h2": endDate.getHours()
			}
		});

		// $http returns a promise by default, as it extends the $q service
		return request.then(function(response) {

				if (typeof response.data === 'object') {
					console.log("API returned an object.", response.data);
					return response.data;
				}
				console.log("The response came back with something other than an object. Perhaps the API is returning the wrong data type?");
                return $q.reject(response.data);

			}, function(response) {
				console.log("There was an error when retrieving the response. Perhaps the API is down, or you don't have correct access permissions?");
				return $q.reject(response.data);
			});
	};

	this.getQueuesForDept = function(startDate, endDate, department) {

		var urlBase = "http://patientservicedeliveryplanning.azurewebsites.net/api/data";

		var request = $http({
			method: 'GET',
			url: urlBase,
			params: {
				"m1": startDate.getMonth(),
				"y1": startDate.getFullYear(),
				"d1": startDate.getDate(),
				"h1": startDate.getHours(),
				"m2": endDate.getMonth(),
				"y2": endDate.getFullYear(),
				"d2": endDate.getDate(),
				"h2": endDate.getHours(),
				"dept": department
			}
		});

		// $http returns a promise by default, as it extends the $q service
		return request.then(function(response) {

				if (typeof response.data === 'object') {
					console.log("API returned an object.", response.data);
					return response.data;
				}
				console.log("The response came back with something other than an object. Perhaps the API is returning the wrong data type?");
                return $q.reject(response.data);

			}, function(response) {
				console.log("There was an error when retrieving the response. Perhaps the API is down, or you don't have correct access permissions?");
				return $q.reject(response.data);
			});
	};

});		
