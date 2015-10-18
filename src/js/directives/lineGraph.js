app.directive("lineGraph", ["$window", function($window) {
  return{
    restrict: "EA",	
    scope: {
    	
    },									// Restrict to elements and attributes
    template: "<svg width='90%' height='90%'></svg>",
 	link: function(scope, elme, attrs){
    	console.log(scope);
    	console.log(elem);
    }
  };
}]);