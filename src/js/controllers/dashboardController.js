app.controller('dashboardController', ['$scope', 'queues', function($scope, queues) {
    /* Retrieves objects of the form:     
            {"TotalPatients": 8, "Providers": 9, "WaitingPatients": 9, "SeenPatients": 8}
    */
    Date.prototype.addHours = function(h) {    
       this.setTime(this.getTime() + (h*60*60*1000)); 
       return this;   
    };

    var startDate = new Date();
    var endDate = startDate.addHours(10);

    // console.log(startDate);
    // console.log(endDate);


    queues.getQueues(startDate, endDate).then(function(data){
        $scope.queueData = data;

        if ($scope.queueData) { $scope.data = parseQueueData(); }
    });

    var parseQueueData = function() {
        var alpine = [], 
            broadmoor = [];

        console.log($scope.queueData);
        $scope.queueData.forEach(function(element){
            switch (element.Department) {
                case "ExampleDepartment":
                    alpine.push({x: element.Hour, y: element.TotalPatients});
                    break;
                case "ExampleDepartment2":
                    broadmoor.push({x: element.Hour, y: element.TotalPatients});
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
    };

    // parseQueueData();

    // Create mock data for now
    var fakeData = function() {
        var alpine = [], 
            broadmoor = [],
            southPavillion = [];

        // Generate some random patient values
        for (var i = 0; i < 31; i++) {
            alpine.push({x: i, y: Math.floor((Math.random() * 150) + 110)});
            broadmoor.push({x: i, y: Math.floor((Math.random() * 110) + 80)});
            southPavillion.push({x: i, y: Math.floor((Math.random() * 90) + 60)});
        }

        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: alpine,      //values - represents the array of {x,y} data points
                key: 'Alpine UC', //key  - the name of the series.
                color: '#ff7f0e'  //color - optional: choose your own line color.
            },
            {
                values: broadmoor,
                key: 'Broadmoor UC',
                color: '#2ca02c'
            },
            {
                values: southPavillion,
                key: 'South Pavillion UC',
                color: '#7777ff'
                // area: true      //area - set to true if you want this line to turn into a filled area chart.
            }
        ];
    };

    /*Random Data Generator */
    function sinAndCos() {
        var sin = [],sin2 = [],
            cos = [];

        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < 24; i++) {
            sin.push({x: i, y: 10 + Math.floor((Math.random() * 5) + 4) * Math.sin(i/10)});
            sin2.push({x: i, y: 10 + Math.floor((Math.random() * 3) + 1) * 4 * Math.sin(i/10) * 0.25 + 0.5});
            cos.push({x: i, y: 10 + Math.floor((Math.random() * 2) + 1) * 0.5 * Math.cos(i/10+ 2) + Math.random() / 10});
        }

        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: sin,      //values - represents the array of {x,y} data points
                key: 'Alpine UC', //key  - the name of the series.
                color: '#ff7f0e'  //color - optional: choose your own line color.
            },
            {
                values: cos,
                key: 'Broadmoor UC',
                color: '#2ca02c',
                // area: true
            },
            {
                values: sin2,
                key: 'South Pavillion UC',
                color: '#7777ff',
                // area: true      //area - set to true if you want this line to turn into a filled area chart.
            }
        ];
    }


    // Graph options
    $scope.options = {
                chart: {
                    type: 'lineChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 20
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
                        axisLabel: 'Hour'
                    },
                    yAxis: {
                        // axisLabel: '# Patients',
                        // tickFormat: function(d){
                        //     return d3.format('.02f')(d);
                        // },
                        // axisLabelDistance: 30
                    },
                    // callback: function(chart){
                    //     console.log("!!! lineChart callback !!!");
                    // },
                    transitionDuration: 250
                }
            };


    // Graph options
    $scope.options2 = {
                chart: {
                    type: 'multiBarChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 45
                    },
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

    $scope.data = sinAndCos();
    $scope.data2 = fakeData();

}]);
