app.directive("header", function() {
	return {
		restrict: 'A',
		scope: {
			page: '='
		},
		templateUrl: "src/js/directives/header/header.html"
	};
});