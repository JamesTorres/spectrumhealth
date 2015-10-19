var app = angular.module("myApp", ['ngRoute', 'ui.bootstrap', 'nvd3']);

app.config(function ($routeProvider) { 
	$routeProvider 
		.when('/login', { 
			// controller: 'loginController', 	// Can specify controller if needed ...
			templateUrl: 'src/views/login.html' 
		}) 
		.when('/dashboard', {
			templateUrl: 'src/views/homepage.html'
		})
		.when('/about', {
			templateUrl: 'src/views/about.html'
		})
		.otherwise({
			redirectTo: '/login' 
		});

	// $locationProvider.html5Mode(true); //Remove the '#' from URL.
});
