app.controller('DateRangeCtrl', DateRangeCtrl);

function DateRangeCtrl($scope, DateRange) {

    // Angular UI Datepicker

    $scope.clearDates = function () {
        $scope.startDate = null;
        $scope.endDate = null;
    };

    $scope.maxDate = new Date(2020, 5, 22);
    $scope.minDate = new Date(2015, 1, 1);

    $scope.hstep = 1;
    $scope.mstep = 5;
    $scope.ismeridian = true;

    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    $scope.setDateRange = function(start, end) {
        DateRange.sendDateRange(start, end);
    };

    var getDates = function() {
        $scope.startDate = DateRange.getStartDate();
        $scope.endDate = DateRange.getEndDate();
    };

    getDates();

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.status = {
        opened: false
    };

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };

}