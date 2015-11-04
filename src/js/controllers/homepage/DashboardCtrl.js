app.controller('DashboardCtrl', DashboardCtrl);

function DashboardCtrl($scope, spectrumAPI, dateRange) {
    /* Retrieves objects of the form:     
            {"TotalPatients": 8, "Providers": 9, "WaitingPatients": 9, "SeenPatients": 8}
    */

    $scope.startDate = dateRange.getStartDate();
    $scope.endDate = dateRange.getEndDate();

    spectrumAPI.getQueues($scope.startDate, $scope.endDate).then(function(data) {
        $scope.queueData = data;

        if ($scope.queueData) { 
            $scope.data = parseQueueData(); 
            $scope.data2 = parseQueueData(); 
        }
    });

    var parseQueueData = function() {
        var alpine = [], 
            broadmoor = [];

        if ($scope.queueData != null) {
            var d1Daycount = 0;
            var d2Daycount = 0;

            $scope.queueData.forEach(function(element) {
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

            console.log(alpine);

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


    // Graph options
    $scope.options2 = {
                chart: {
                    type: 'multiBarChart',
                    // height: 450,
                    // margin : {
                    //     top: 20,
                    //     right: 20,
                    //     bottom: 60,
                    //     left: 45
                    // },
                    clipEdge: true,
                    staggerLabels: false,
                    transitionDuration: 500,
                    stacked: true,
                    xAxis: {
                        axisLabel: 'Days',
                        showMaxMin: false
                    },
                    yAxis: {
                        axisLabel: 'Y Axis',
                        axisLabelDistance: 40,
                        tickFormat: function(d){
                            return d3.format(',.1f')(d);
                        },
                        showMaxMin: false
                    }
                }
            };

}

