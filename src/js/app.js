// Following style guide at: 	https://github.com/mgechev/angularjs-style-guide

// "use strict";

var app = angular.module("spectrumStatistics", ['ngRoute', 'ui.bootstrap', 'nvd3', 'ngFitText', 'angularMoment']);

app.config(function ($routeProvider) { 
	$routeProvider 
		.when('/login', { 
			// controller: 'loginController', 	// Can specify controller if needed ...
			templateUrl: 'src/views/login.html',
			controller: 'LoginCtrl'
		}) 
		.when('/homepage', {
			templateUrl: 'src/views/homepage.html',
			controller: 'HomepageCtrl'
		})
		.when('/about', {
			templateUrl: 'src/views/about.html',
			controller: 'AboutCtrl'
		})
		.otherwise({
			redirectTo: '/login'
		});

	// $locationProvider.html5Mode(true); //Remove the '#' from URL.
});
