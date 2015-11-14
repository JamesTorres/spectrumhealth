app.factory('Queues', function(Queue, $rootScope) {

    var queues = {};

    queues.rawAPIData = null;
    queues.barChart = {};

    showEmptyPoints = true;

    function earlierThan(a, b) {
        if (a.Year < b.Year) { return -1; } 
        if (a.Year > b.Year) { return 1; } 
        if (a.Month < b.Month) { return -1; } 
        if (a.Month > b.Month) { return 1; } 
        if (a.Day < b.Day) { return -1; }
        if (a.Day > b.Day) { return 1; }
        if (a.Hour < b.Hour) { return -1; } 
        if (a.Hour > b.Hour) { return 1; } 
        return 0;
    }

    function determineMultiplier(denominator) {
        switch (denominator) {
            case "Month":
                return 12;
            case "Day":
                // TODO
            case "Hour":
                return 24;
            default:
                return 0;
        }
    }

    function appendEmptyPoints(arrayOfPoints, start, end) {
        if (showEmptyPoints) {
            for (var i = start + 1; i <= end; i++) {
                arrayOfPoints.push({x: i, y: 0});
            }
        }
    }

    queues.sendAPIData = function(data) {
        data.sort(earlierThan);
        this.rawAPIData = data;
        $rootScope.$broadcast('api_data_changed');
    };

    queues.getBarChartXLabels = function() {
        return ['a','b','c'];
    };

	queues.getBarChartData = function(numerator, denominator) {

        /* 
            Algorithm:
                1) Ensure our data was returned as an array
                    2) Sort the array
                    3) Set the starting count (days, hours, years, etc.)
                    4) Determine the multiplier for this count
                    5) Iterate
                        6) Push to appropriate dept
                        7) Increment the count (& timechecker/start) if necessary
        */

        var parsedData = {
            alpine: {
                values: [],
                key: "Alpine",
                color: '#ff7f0e'
            },
            test: []
        };

        // this.rawAPIData = [
        //     {Department:"Spectrum Health Alpine Urgent Care",TotalPatients:4,Hour:2},
        //     {Department:"Spectrum Health Alpine Urgent Care",TotalPatients:6,Hour:2}
        // ];

        // If we recieved an array (sorted)
        if (Array.isArray(this.rawAPIData) && this.rawAPIData[0]) {

            // Keeps track of the number of days, hours, months...
            var previous = this.rawAPIData[0][denominator];         // Start number (to determine if a new day, month, etc. has been selected)
            var count = 0;                                          // Count of the number of days, months, etc.
            var multiplier = determineMultiplier(denominator);

            // Iterate and add appropriately
            this.rawAPIData.forEach(function(sortedPoint) {

                // Append to the appropriate department
                switch (sortedPoint.Department) {
                    case "Spectrum Health Alpine Urgent Care": 
                        if (sortedPoint[denominator] < previous) { count++; appendEmptyPoints(parsedData.alpine.values, previous, (sortedPoint[denominator] + count*multiplier));  }
                        var d = (sortedPoint[denominator] + count * multiplier);
                        parsedData.alpine.values.push({x: d, y: sortedPoint[numerator]});
                        previous = sortedPoint[denominator];
                        break;
                    case "Test":
                        parsedData.test.push({x: (sortedPoint[denominator] + count*multiplier), y: sortedPoint[numerator]});
                        break;
                    default:
                        break;
                }            
            });
        }

        return [
            {
                values: parsedData.alpine.values,
                key: parsedData.alpine.key,
                color: parsedData.alpine.color
            }
        ];  
	};

    queues.pieChartForm = function(date) {

        var ret = [];

        if (typeof this.rawAPIData === 'object' && this.rawAPIData != null && this.rawAPIData[0]) { 
            this.rawAPIData.forEach(function(element) {
                if (element.Day == date.getDate() && element.Month == date.getMonth() + 1 && element.Year == date.getFullYear()) { 
                    var dataPoint = element;

                    ret = [
                    {
                        key: "TotalPatients",
                        y: element.TotalPatients
                    }, 
                    {
                        key: "Providers",
                        y: element.Providers
                    }, 
                    {
                        key: "SeenPatients",
                        y: element.SeenPatients
                    }, 
                    {
                        key: "WaitingPatients",
                        y: element.WaitingPatients
                    }
                    ];
                }
            });
        }

        return ret;
    };

    queues.lineChartForm = function() {
        var alpine = [];

        // If we were given an object, and that object has at least one property
        if (typeof this.rawAPIData === 'object' && this.rawAPIData != null && this.rawAPIData[0]) {
            var d1Daycount = 0;
            var d2Daycount = 0;

            this.rawAPIData.forEach(function(element) {
                if (element.Department) {
                    switch (element.Department) {
                        case "Spectrum Health Alpine Urgent Care":
                            alpine.push({x: (element.Hour + d1Daycount*24) + 1, y: element.TotalPatients});
                            if (element.Hour !== 0 && element.Hour % 23 === 0) { d1Daycount++; }
                            break;
                        default:
                            break;
                    }
                }
            });

            return [
                {
                    values: alpine,             //values - represents the array of {x,y} data points
                    key: 'Alpine',              //key  - the name of the series.
                    color: '#ff7f0e'            //color - optional: choose your own line color.
                }
            ];
        }
    };

    /*Random Data Generator */
    queues.sinAndCos = function() {
        var sin = [],sin2 = [],
            cos = [];

        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i/10)});
            sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
            cos.push({x: i, y: 0.5 * Math.cos(i/10+ 2) + Math.random() / 10});
        }

        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: sin,      //values - represents the array of {x,y} data points
                key: 'Sine Wave', //key  - the name of the series.
                color: '#ff7f0e'  //color - optional: choose your own line color.
            },
            {
                values: cos,
                key: 'Cosine Wave',
                color: '#2ca02c'
            },
            {
                values: sin2,
                key: 'Another sine wave',
                color: '#7777ff',
                area: true      //area - set to true if you want this line to turn into a filled area chart.
            }
        ];
    };


    /* Random Data Generator (took from nvd3.org) */
    queues.fakeData = function() {
        var names = ["Alpine", "Broadmoor", "West Pavillion"];
        return stream_layers(3, 50+Math.random()*50, 0.1).map(function(data, i) {
            return {
                key: names[i],
                values: data
            };
        });
    };

    /* Inspired by Lee Byron's test data generator. */
    function stream_layers(n, m, o) {
        if (arguments.length < 3) { o = 0; }
        function bump(a) {
            var x = 1 / (0.1 + Math.random()),
                y = 2 * Math.random() - 0.5,
                z = 10 / (0.1 + Math.random());
            for (var i = 0; i < m; i++) {
                var w = (i / m - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }
        return d3.range(n).map(function() {
            var a = [], i;
            for (i = 0; i < m; i++) { a[i] = o + o * Math.random(); }
            for (i = 0; i < 5; i++) { bump(a); }
            return a.map(stream_index);
        });
    }

    /* Another layer generator using gamma distributions. */
    function stream_waves(n, m) {
        return d3.range(n).map(function(i) {
            return d3.range(m).map(function(j) {
                var x = 20 * j / m - i / 3;
                return 2 * x * Math.exp(-0.5 * x);
            }).map(stream_index);
        });
    }

    function stream_index(d, i) {
        return {x: i, y: Math.max(0, d)};
    }

	return queues;
});