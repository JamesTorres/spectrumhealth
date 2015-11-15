app.controller('GraphCtrl', GraphCtrl);

function GraphCtrl($scope, Parser, DateRange) {

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
                    tickFormat: function(d) {
                        var tempDate = new Date(DateRange.getStartDate());
                        tempDate.setDate(tempDate.getDate() - 1);           // This function is off... bug
                        tempDate.setHours(0 + d );
                        return tempDate.getMonth() + '/' + tempDate.getDate();
                    },
                    staggerLabels: false,
                    rotateLabels: null
                },
                yAxis: {
                    axisLabel: 'Total Patients',
                    axisLabelDistance: -20,
                    tickFormat: function(d){
                        return d3.format('')(d);
                    },
                    showMaxMin: false,
                    rotateYLabel: true
                },
                reduceXTicks: true,
                noData: "No data. Please query, or check the API call.",
                tooltip: {
                    headerFormatter: function(d, i) {
                        var tempDate = new Date(DateRange.getStartDate());
                        tempDate.setDate(tempDate.getDate() - 1);           // This function is off... bug
                        tempDate.setHours(0 + d );
                        return tempDate.getMonth() + '/' + tempDate.getDate() + '/' + tempDate.getFullYear() + ": " + tempDate.toLocaleTimeString('en-US');
                    },
                    valueFormatter: function(d) {
                        return d + " Patients";
                    }
                },
                groupSpacing: 0.08
            }
        }
    };

    var d = new Date();
    d.setDate(d.getDate() - 2);

    $scope.pie = {
        title: "Most Recent Information" ,
        data: [],
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

    $scope.$on('urgent_cares_changed', function() {
        $scope.bar.data = Parser.getBarChartData("Total Patients", "Hour");      // The api has camelcase properties... match please
        // $scope.bar.options.chart.xAxis.tickFormat = Queues.getBarChartXLabels();

        $scope.pie.data = Parser.pieChartForm(DateRange.getEndDate());
        $scope.line.data = Parser.getBarChartData("Providers", "Hour");

        console.log("API Data Changed: ", $scope.bar.data);
    });
}
