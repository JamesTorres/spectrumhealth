app.directive('calendar', function(){
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

            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));
            scope.display = true;

            scope.getDetailsForDate = function(day) {
                var details = [];

            	for (i=0; i < scope.details.length; i++) {
                    var dObj = scope.details[i];
            		if (dObj.date.getDate() == day.date() && dObj.data.getMonth() == day.month()) {
                        for (y=0; y<details.length; y++) {
                            var d = details[y];
                            if (dObj.date.getHours() == d.h1) {
                                d.h2 = d.h1 + dObj.detail.duration;
                                d.text = dObj.detail.text;
                            }
                        }
                        // details.forEach(function(d) {
                        //     if (dObj.date.getHours() == d.h1) {
                        //         d.h2 = d.h1 + dObj.detail.duration;
                        //         d.text = dObj.detail.text;
                        //     }
                        // });
            		}
            	}

            	return details;
            };

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
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month()-1).date(1));
                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
            };

            scope.showDetails = function(week) {
            	console.log(week);
            	//TODO
                week.show = !week.show;
            };

        }
	};

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
        var dayInfo = scope.getDetailsForDate(date);
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date,
                info: dayInfo
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
});