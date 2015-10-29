/*
	Retrieves the Urgent Care queues from the backend. The JSON format:
	
		{"totalPatients": 8, "providers": 9, "waitingPatients": 9, "seenPatients": 8}

	Test url: 		http://jsonplaceholder.typicode.com/posts/1
	Heroku (old): 	https://peaceful-coast-3278.herokuapp.com/
	Azure (new): 	http://patientservicedeliveryplanning2068.azurewebsites.net/api/data
	Rgrok: 			https://e5a356dc.ngrok.io/api/data?m1=10&y1=2015&d1=26&h1=0&m2=10&y2=2015&d2=26&h2=3
*/
app.factory('queues', ['$http', function($http, $q) {

	return ({
		getQueues: getQueues
	});

	function getQueues(startDate, endDate) {
		var request = $http({
			method: 'GET',
			url: 'https://e5a356dc.ngrok.io/api/data',
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

		return (request.then(handleSuccess, handleError));
	}

	function handleSuccess(response) {
		return response.data;
	}

	function handleError(response) {
		// Todo
	}


	// return $http.get('https://e5a356dc.ngrok.io/api/data?m1=10&y1=2015&d1=26&h1=0&m2=10&y2=2015&d2=26&h2=3')
	// 	.success(function(data) {
	// 		return data;
	// 	})
	// 	.error(function(data) {
	// 		return data;
	// 	});
}]);		
