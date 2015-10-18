var app = angular.module("myApp", ['ngRoute', 'ui.bootstrap', 'nvd3']);

app.config(function ($routeProvider) { 
	$routeProvider 
		.when('/login', { 
			controller: 'loginController', 
			templateUrl: 'src/views/login.html' 
		}) 
		.when('/dashboard', {
			controller: 'homepageController',
			templateUrl: 'src/views/homepage.html'
		})
		.otherwise({
			redirectTo: '/login' 
		});

	// $locationProvider.html5Mode(true); //Remove the '#' from URL.
});
