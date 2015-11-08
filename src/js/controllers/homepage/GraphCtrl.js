app.controller('GraphCtrl', GraphCtrl);

function GraphCtrl($scope, Queues) {

    $scope.bar = {
        title: "Providers / Hour",
        data: Queues.fakeData(),
        options: {
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
                lines: { //options for basic line model; main chart
                    forceX: 30
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
        }
    };

    $scope.pie = {
        title: "Test / You",
        data: [
            {
                key: "One",
                y: 5
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            },
            {
                key: "Seven",
                y: 0.5
            }
        ],
        options: {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
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
        title: "A Line Chart", 
        data: Queues.sinAndCos(),
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
                height: 450,
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
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: 30
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
        }
    };

    $scope.$on('api_data_changed', function() {
        $scope.bar.data = Queues.barChartForm();
        $scope.api.update();
        // TODO - add calls for other graphs
        console.log("API Data Changed: ", $scope.bar.data);
    });
}
