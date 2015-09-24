/* 

Introduction
	
	We are using a multitude of tools. This Gruntfile allows Grunt to appropriately run and manage tasks, so we don't have to. 
	
	A list of the dependencies (for both devs and users) is in the 'package.json' file. Go to "npmjs.com" to find most of these packages.
	
	With Grunt, we are using:
		grunt-watch:	watches for changes in our files, then rebuilds
		grunt-concat:	concatenates our javascript files into one 
		jshint:			detects syntax errors in our javascript in console
		sass:			a precompiler that turns SCSS files (fancy CSS) into CSS files
		karma:			generates a test runner HTML file and runs a server, allowing us to instantly test in many browsers
		mocha:			an actual testing library for javascript
		chai:			extended testing language for mocha (gives us better assertions, expects, etc.)
		
*/


module.exports = function(grunt) {
	// Creating a config file, by passing a JSON object with our tasks and their options
	grunt.initConfig(
		{
			pkg: grunt.file.readJSON('package.json'),
			concat: {
				options: {
					// define a string to put between each file in the concatenated output
					separator: ';'
				},
				dist: {
					// the files to concatenate
					src: ['src/js/*.js'],
					// the location of the resulting JS file
					dest: 'build/<%= pkg.name %>.js'
				}
			},
			jshint: {
				// define the files to lint
				files: ['gruntfile.js', 'src/js/*.js', 'test/*.js'],
				// configure JSHint (documented at http://www.jshint.com/docs/)
				options: {
					// more options here if you want to override JSHint defaults
					globals: {
						jQuery: false,
						console: true,
						module: true
					},
					
				}
			}, 
			watch: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint, karma:unit:run']
			},
			sass: {                              // Task 
				dist: {                            // Target 
					options: {                       // Target options 
						style: 'expanded'
					},
					files: {                       // Dictionary of files 
						'build/main.css': 'src/scss/main.scss'      // 'destination': 'source' 
					}
				}
			},
			karma: {		// TODO - get working
				unit: {
					files: [
						{ src: ['test/**/*.js'], served: true },
						{ src: ['src/js/*.js'], served: true, included: false }
					],
					frameworks: ['mocha', 'chai'],
					colors: true,
					logLevel: 'INFO',
					browsers: ['Firefox', 'Chrome', 'Safari'],
					background: true,
					singleRun: false
				}
			},
			mocha: {
				all: {
					src: ['test/testrunner.html'],
				},
				options: {
					run: true
				}
			}
		}
	);
	
	
	
	/***  Load our Node Package Manager tasks ***/
	
	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-mocha');
	
	
	/*** Create our runnable Command-line tasks ***/
	
	// the default task can be run just by typing "grunt" on the command line
	grunt.registerTask('default', ['sass', 'jshint', 'mocha', 'watch']);
};
