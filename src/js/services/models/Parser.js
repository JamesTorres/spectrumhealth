app.factory('Parser', function(Queue, UrgentCares) {

    var parser = {};
    parser.rawAPIData = null;

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

    function appendEmptyPoints(arrayOfPoints, start, end, limit) {
        for (var i = start + limit; i <= end; i += limit) {
            arrayOfPoints.push({x: i, y: 0});
        }
    }

    function buildValuesArray(array, numerator, denominator) {

        /* Builds the x-y coordinates for a UC (for a graph)

                [{x: 1, y:1}, {x: 5, y:2}, ...]
        */
        
        // Returned array
        var v = [];

        // Keeps track of the number of days, hours, months...
        var previous = -1;                                      // Start number (to determine if a new day, month, etc. has been selected)
        var count = 0;                                          // Count of the number of days, months, etc.
        var multiplier = determineMultiplier(denominator);
        
        var avgCount = 0;
        var yAvg = 0;
        var limit = 1;

        if (UrgentCares.simpleMode) { limit = UrgentCares.averageOver; }

        // Adding graph points to the array
        array.forEach(function(queue) {
        
            var xVal, yVal, current;

            // Determine the y-value base
            switch (denominator) {
                case "Hour":
                    current = queue.getHour();
                    break;
                case "Day":
                    current = queue.getDay();
                    break;
                case "Month":
                    current = queue.getMonth();
                    break;
                case "Year":
                    current = queue.getYear();
                    break;
                default:
                    break;
            }

            // Determine the x-value
            switch (numerator) {
                case "Total Patients":
                    yVal = queue.getTotalPatients();
                    break;
                case "Seen Patients":
                    yVal = queue.getSeenPatients();
                    break;
                case "Waiting Patients":
                    yVal = queue.getWaitingPatients();
                    break;
                case "Providers":
                    yVal = queue.getProviders();
                    break;
                default:
                    break;
            }

            // If we have reached a new x (where is a month, day, or year) - increase the count of x, and append empty points
            if (current < previous) { 
                count++; 
                if (UrgentCares.showEmptyPoints) {
                    appendEmptyPoints(v, previous, (current + count * multiplier), limit);  
                }
            }

            // Accounting for two data points sharing the same x-value
            xVal = current + count * multiplier;

            // Increment average numerator
            yAvg += yVal;
            avgCount++;

            // Supports averaging over a number of points
            if (avgCount == limit) {
                // Average our numbers 
                yAvg /= limit;

                // Add the point to the array
                v.push({x: xVal, y: yAvg});

                // Reset things
                avgCount = yAvg = 0;
            }

            // Save the previous
            previous = current;
        });

        return v;
    }

    parser.parseAPIDataByDept = function(data) {
        this.rawAPIData = data;
        // this.rawAPIData.sort(earlierThan);
        parseData(this.rawAPIData);
    };

    function parseData(data) {
        // Ensure we are parsing an array of data points
        if (Array.isArray(data)) {

            // Clear any previous data
            UrgentCares.clearData();

            // Presume these points are already sorted by date
            data.forEach(function(sortedPoint) {

                // Create a queue for this data point
                var q = new Queue(sortedPoint);
                
                // Determine the dept of each element
                switch (sortedPoint.Department) {
                    case "Spectrum Health Alpine Urgent Care":
                        UrgentCares.alpine.data.push(q);
                        break;
                    case "Spectrum Health East Beltline Urgent Care":
                        UrgentCares.eastBeltline.data.push(q);  
                        break;
                    case "Spectrum Health West Pavilion Urgent Care":
                        UrgentCares.westPavilion.data.push(q);
                        break;
                    case "Spectrum Health Broadmoor Urgent Care":
                        UrgentCares.broadmoor.data.push(q);
                        break;
                    default:
                        break;
                }
            });

            UrgentCares.sendUpdate();
        } 
        else {
            console.log("Data being parsed is not an array. The API may have return something else.");
        }
    }

	parser.getBarChartData = function(numerator, denominator) {

        var ret = [];

        for (var uc in UrgentCares) {
            if (UrgentCares[uc].enabled) {
                if (UrgentCares[uc].data.length > 0) {
                    var v = buildValuesArray(UrgentCares[uc].data, numerator, denominator);

                    ret.push({
                        values: v,
                        key: UrgentCares[uc].key,
                        color: UrgentCares[uc].color
                    });
                }
            }
        }

        return ret;
	};

    parser.pieChartForm = function(date) {

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

    parser.lineChartForm = function() {
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
    parser.sinAndCos = function() {
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
    parser.fakeData = function() {
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

	return parser;
});