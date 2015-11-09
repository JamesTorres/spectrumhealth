app.factory('Queues', function(Queue, $rootScope) {

    var queues = {};

    queues.apiData = null;


    queues.sendAPIData = function(data) {
        this.apiData = data;
        $rootScope.$broadcast('api_data_changed');
    };

	queues.barChartForm = function() {

        var alpine = [], 
            broadmoor = [];

   		// If we were given an object, and that object has at least one property
        if (typeof this.apiData === 'object' && this.apiData != null && this.apiData[0]) {
            var d1Daycount = 0;
            var d2Daycount = 0;

            this.apiData.forEach(function(element) {
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
                    values: alpine,             //values - represents the array of {x,y} data points
                    key: 'Alpine',              //key  - the name of the series.
                    color: '#ff7f0e'            //color - optional: choose your own line color.
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

    queues.pieChartForm = function(date) {
        var ret = [];

        if (typeof this.apiData === 'object' && this.apiData != null && this.apiData[0]) { 
            this.apiData.forEach(function(element) {
                if (element.Hour == date.getHours() && element.Day == date.getDate() && element.Month == date.getMonth() && element.Year == date.getFullYear()) { 
                    var dataPoint = element;

                    ret = [
                    {
                        key: "TotalPatients",
                        y: dataPoint.TotalPatients
                    }, 
                    {
                        key: "Providers",
                        y: dataPoint.Providers
                    }, 
                    {
                        key: "SeenPatients",
                        y: dataPoint.SeenPatients
                    }, 
                    {
                        key: "WaitingPatients",
                        y: dataPoint.WaitingPatients
                    }
                    ];
                }
            });
        }

        return ret;
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
        return stream_layers(3, 50+Math.random()*50, 0.1).map(function(data, i) {
            return {
                key: 'Stream' + i,
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