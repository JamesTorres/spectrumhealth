app.controller('DashboardCtrl', DashboardCtrl);

function DashboardCtrl($scope, queueFactory, DateRange, Queue) {
    /* Retrieves objects of the form:     
            {"TotalPatients": 8, "Providers": 9, "WaitingPatients": 9, "SeenPatients": 8}
    */

    var getDateRange = function() {
        $scope.startDate = DateRange.getStartDate();
        $scope.endDate = DateRange.getEndDate();
    };

    var getQueueData = function() {
        
    };

    var requestQueues = function(start, end) {
        queueFactory.getQueues(start, end)
            .then(function(data) {
                $scope.data = parseQueueData(data); 
                $scope.data2 = parseQueueData(data); 
            }, function(error) {
                // Promise rejected
        });
    };

    var parseQueueData = function(data) {
        var alpine = [], 
            broadmoor = [];

        if (typeof data === 'object' && data[0]) {
            var d1Daycount = 0;
            var d2Daycount = 0;

            data.forEach(function(element) {
                switch (element.Department) {
                    case "ExampleDepartment":
                        alpine.push({x: (element.Hour + d1Daycount*24) + 1, y: element.TotalPatients});
                        if (element.Hour !== 0 && element.Hour % 23 === 0) { d1Daycount++; }
                        break;
                    case "ExampleDepartment2":
                        broadmoor.push({x: (element.Hour + d2Daycount*24) + 1, y: element.TotalPatients});
                        if (element.Hour !== 0 && element.Hour % 23 === 0) { d2Daycount++; }
                        break;
                    default:
                        break;
                }
            });

            return [
                {
                    values: alpine,      //values - represents the array of {x,y} data points
                    key: 'Alpine',   //key  - the name of the series.
                    color: '#ff7f0e'    //color - optional: choose your own line color.
                },
                {
                    values: broadmoor,
                    key: 'Broadmoor UC',
                    color: '#2ca02c'
                }
            ];
        }

        return [];
    };

    var createWatchers = function() {

        $scope.$watch('DateRange.getStartDate()', function(newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.startDate = DateRange.getStartDate();
                console.log($scope.startDate);
                $scope.requestQueues($scope.startDate, $scope.endDate);
            }
        });

        $scope.$watch('DateRange.getEndDate()', function(newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.endDate = DateRange.getEndDate();
                console.log($scope.endDate);
                $scope.requestQueues($scope.startDate, $scope.endDate);
            }
        });
    };

    var run = function() {

        getDateRange();
        requestQueues($scope.startDate, $scope.endDate);
        createWatchers();

        // Graph options
        $scope.options2 = {
                    chart: {
                        type: 'multiBarChart',
                        clipEdge: true,
                        staggerLabels: false,
                        transitionDuration: 500,
                        stacked: true,
                        xAxis: {
                            axisLabel: 'Hour',
                            showMaxMin: false
                        },
                        yAxis: {
                            axisLabel: 'Providers',
                            axisLabelDistance: 40,
                            tickFormat: function(d){
                                return d3.format(',.1f')(d);
                            },
                            showMaxMin: false
                        }
                    }
                };

        parseQueueData({});
    };

    run();




    // Graph options
    // $scope.options = {
    //             chart: {
    //                 type: 'lineChart',
    //                 height: 450,
    //                 margin : {
    //                     top: 20,
    //                     right: 20,
    //                     bottom: 40,
    //                     left: 20
    //                 },
    //                 x: function(d){ return d.x; },
    //                 y: function(d){ return d.y; },
    //                 useInteractiveGuideline: true,
    //                 dispatch: {
    //                     stateChange: function(e){ console.log("stateChange"); },
    //                     changeState: function(e){ console.log("changeState"); },
    //                     tooltipShow: function(e){ console.log("tooltipShow"); },
    //                     tooltipHide: function(e){ console.log("tooltipHide"); }
    //                 },
    //                 xAxis: {
    //                     axisLabel: 'Hour'
    //                 },
    //                 yAxis: {
    //                     // axisLabel: '# Patients',
    //                     // tickFormat: function(d){
    //                     //     return d3.format('.02f')(d);
    //                     // },
    //                     // axisLabelDistance: 30
    //                 },
    //                 // callback: function(chart){
    //                 //     console.log("!!! lineChart callback !!!");
    //                 // },
    //                 transitionDuration: 250
    //             }
    //         };




}

