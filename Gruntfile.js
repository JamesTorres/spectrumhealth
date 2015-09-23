module.exports = function(grunt) {
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
				files: ['gruntfile.js', 'src/js/*.js'],
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
				tasks: ['jshint']
			},
			sass: {
				dist: {
					files: 
					[{
						expand: true,
						cwd: 'styles',
						src: ['src/scss/*.scss'],
						dest: 'build/main.css',
						ext: '.css'
					}]
				}
			}
		}
	);
	
	
	
	/***  Load our Node Package Manager tasks ***/
	
	// Grunt plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	// External (doesn't need to be registered as a task - is registered on load)
	grunt.loadNpmTasks('grunt-sass');
	
	
	
	
	/*** Create our runnable Command-line tasks ***/
	
	// this would be run by typing "grunt test" on the command line
	grunt.registerTask('hint', ['jshint']);
	
	// the default task can be run just by typing "grunt" on the command line
	grunt.registerTask('default', ['jshint', 'concat', 'watch']);
};
