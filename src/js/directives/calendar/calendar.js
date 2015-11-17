app.directive('calendar', function(Parser, Filters){
	// Runs during compile
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: "src/js/directives/calendar/calendar.html",
		replace: false,
		scope: {
            selected: "=",
            details: "="
        },
        link: function(scope) {
            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            console.log(scope.month.month());

            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));
            scope.display = true;

            _buildMonth(scope, start, scope.month);

            scope.select = function(day) {
                scope.selected = day.date;  
                console.log(day);
            };

            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month()+1).date(1));
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
                scope.getDetails();
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month()-1).date(1));
                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
                scope.getDetails();
            };

            scope.showDetails = function(week) {
            	// console.log(week);
            	//TODO
                week.show = !week.show;
            };

            scope.$on('urgent_cares_changed', function() {
                scope.getDetails();
            });

            scope.$on('filters_changed', function() {
                scope.getDetails();
            });

            scope.getDetails = function() {
                scope.details = Parser.getDetails();
                setDetailsForAllDates(scope);

                console.log("Filters: ", Filters);
                console.log("Parser: ", Parser);
                console.log("Details list: ", scope.details);
                console.log("Weeks list: ", scope.weeks);
            };

            scope.hours = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

        }
	};

    function clearDetailsForAllDates(scope) {
        if (scope.weeks) {
            for (var y = 0; y < scope.weeks.length; y++) {
                var week = scope.weeks[y];
                for (var x = 0; x < week.days.length; x++) {
                    var day = week.days[x];

                    day.details = [];
                }
            }
        }
    }

    function setDetailsForAllDates(scope) {

        clearDetailsForAllDates(scope);

        // For details
        for (i=0; i < scope.details.length; i++) {

            var detail = scope.details[i];

            // For days
            if (scope.weeks) {
                for (var y = 0; y < scope.weeks.length; y++) {
                    var week = scope.weeks[y];
                    for (var x = 0; x < week.days.length; x++) {
                        var day = week.days[x];
                        console.log(day.date.hours());

                        // If this day has a detail
                        if (detail.date == day.date.date()) {

                            // TODO - fix... we are iterating over days, not hours
                            // console.log(detail.hour == day.date.hour(), detail.hour, day.date.hour());

                            // Save it
                            day.details.push(detail);
                        }
                    }
                }
            }
        }
    }

	function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ 
                days: _buildWeek(scope, date.clone(), month),
                show: false
            });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(scope, date, month) {
        var days = [];
        var dayDetails = [];                                       // Initialized in the intiializeDetails function etc.
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date,
                details: dayDetails
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
});