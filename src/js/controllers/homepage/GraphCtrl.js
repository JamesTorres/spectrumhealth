app.controller('GraphCtrl', GraphCtrl);

function GraphCtrl($scope, Queues, DateRange) {

    $scope.bar = {
        title: "Total Patients / Hour",
        data: [],
        options: {
            chart: {
                type: 'multiBarChart',
                clipEdge: true,
                staggerLabels: false,
                transitionDuration: 500,
                stacked: true,
                xAxis: {
                    axisLabel: 'Hour',
                    showMaxMin: false,

                },
                yAxis: {
                    axisLabel: 'Providers',
                    axisLabelDistance: 40,
                    tickFormat: function(d){
                        return d3.format('')(d);
                    },
                    showMaxMin: false
                },
                reduceXTicks: true,
                noData: null,
                tooltip: {
                    headerFormatter: function(d, i) {
                        var tempDate = new Date(DateRange.getStartDate());
                        tempDate.setDate(tempDate.getDate() - 1);           // This function is off... bug
                        tempDate.setHours(tempDate.getHours() + d - 1);
                        return tempDate.getDate() + '/' + tempDate.getMonth() + '/' + tempDate.getFullYear() + ": " + tempDate.getHours() + " o'clock";
                    }
                }
            }
        }
    };

    var d = new Date();
    d.setDate(d.getDate() - 2);

    $scope.pie = {
        title: "Current Information" ,
        data: Queues.pieChartForm(d),
        options: {
            chart: {
                type: 'pieChart',
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: false,
                transitionDuration: 500,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        }
    };

    $scope.line = {
        title: "Providers / Hour", 
        data: [],
        options: {
            chart: {
                zoom: {
                    //NOTE: All attributes below are optional
                    enabled: true,
                    scale: 1,
                    scaleExtent: [1, 10],
                    translate: [0, 0],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: false,
                    zoomed: function(xDomain, yDomain) {
                        var domains = {x1: 0, x2: 0, y1: 1, y2: 1};
                        return domains;
                    },
                    unzoomed: function(xDomain, yDomain) {
                        var domains = {x1: 0, x2: 0, y1: 0, y2: 0};
                        return domains;
                    },
                    unzoomEventType: 'dblclick.zoom'
                },
                type: 'lineChart',
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time (ms)'
                },
                yAxis: {
                    axisLabel: 'Voltage (v)',
                    // tickFormat: function(d){
                    //     return d3.format('.02f')(d);
                    // },
                    axisLabelDistance: 30
                },
                callback: function(chart){
                    // ??
                }
            }
        }
    };

    $scope.$on('api_data_changed', function() {
        $scope.bar.data = Queues.getBarChartData("TotalPatients", "Hour");      // The api has camelcase properties... match please
        // $scope.bar.options.chart.xAxis.tickFormat = Queues.getBarChartXLabels();

        $scope.pie.data = Queues.pieChartForm(DateRange.getEndDate());
        $scope.line.data = Queues.getBarChartData("Providers", "Hour");
        // $scope.api.update();
        // TODO - add calls for other graphs
        console.log("API Data Changed: ", $scope.bar.data);
    });
}
