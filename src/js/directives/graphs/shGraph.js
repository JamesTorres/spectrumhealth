app.directive("shGraph", function() {
	return {
		restrict: 'A',
		scope: {
			graph: '='
		},
		templateUrl: "src/js/directives/graphs/shGraph.html"
	};
});