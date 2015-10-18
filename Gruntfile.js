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
				files: ['gruntfile.js', 'src/js/*.js', 'test/*.js', 'src/js/**/*.js', '!src/js/services/d3.js'],
				// configure JSHint (documented at http://www.jshint.com/docs/)
				options: {
					curly: true,
					newcap: true,
					noarg: true,
					sub: true,
					boss: true,
					eqnull: true,
					
					// more options here if you want to override JSHint defaults
					globals: {
						jQuery: false,
						console: true,
						module: true
					},
				}
			}, 
			watch: {
				css: {
					files: ['src/scss/*.scss', 'src/scss/**/*.scss'],
					tasks: ['sass'],
					options: {
						livereload: true
					}
				},
				html: {
					files: ['*.html', 'src/views/*.html'],
					options: {
						livereload: true
					}
				},
				scripts: {
					files: ['<%= jshint.files %>'],
					tasks: ['jshint'], // Include , 'karma:unit:run' or 'karma:continuous:run' when ready
					options: {
						livereload: true
					}
				}
			},
			sass: {                              // Task 
				dist: {                            // Target 
					options: {                       // Target options 
						style: 'expanded'
					},
					files: {                       								// Dictionary of files 
						'build/main.css': 'src/scss/main.scss'      			// 'destination': 'source' 
					}
				}
			},
			karma: {
				options: {
					configFile: 'karma.conf.js',
					files: [      
						// 'node_modules/angular/angular.js',
      // 					'node_modules/angular-mocks/angular-mocks.js',
      // 					'node_modules/chai/chai.js',
      					'test/example-test.js'
      				]
				},
				unit: {
					singleRun: true
				},
				continuous: {
					// keep karma running in the background
					background: true
				}
			},
			mocha: {
				all: {
					src: ['test/index.html'],
				},
				options: {
					run: true,
					threshold: 60		// 60% minimum code coverage
				}
			},
			connect: {
			  server: {
			    options: {
			      port: 9000
			    }
			  }
			}
		}
	);
	
	
	
	/***  Load our Node Package Manager tasks ***/
	
	// Load grunt tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-connect');
	
	
	/*** Create our runnable Command-line tasks ***/

	// Start web server
	grunt.registerTask('serve', [
		'connect:server',
		'watch'
	]);
	
	/* 	The default task can be run just by typing "grunt" on the command line
			1) Compiles sass to CSS
			2) Runs jshint to look for syntax errors in our JS
			3) Starts our grunt file watcher
	*/
	grunt.registerTask('default', ['sass', 'jshint', 'serve']);	// include karma when ready

};
