/*
	Retrieves the Urgent Care queues from the backend. The JSON format:
		{"totalPatients": 8, "providers": 9, "waitingPatients": 9, "seenPatients": 8}

	Test url: 		http://jsonplaceholder.typicode.com/posts/1
	Heroku (old): 	https://peaceful-coast-3278.herokuapp.com/
	Azure (new): 	http://patientservicedeliveryplanning2068.azurewebsites.net/api/data
*/
app.factory('queues', ['$http', function($http) {
	return $http.get('http://patientservicedeliveryplanning2068.azurewebsites.net/api/data')
		.success(function(data) {
			return data;
		})
		.error(function(data) {
			return data;
		});
}]);		
