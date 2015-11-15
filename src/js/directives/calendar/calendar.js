app.directive('calendar', function(){
	// Runs during compile
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: "src/js/directives/calendar/calendar.html",
		replace: true
	};
});