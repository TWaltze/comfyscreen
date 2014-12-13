module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Compile and minify all less into styles.css
		less: {
			dev: {
				options: {
					yuicompress: true
				},
				files: {
					'dev/css/style.css': 'src/css/less/style.less'
				}
			},
			dist: {
				options: {
					yuicompress: true
				},
				files: {
					'dist/css/style.css': 'src/css/less/style.less'
				}
			}
		},
		copy: {
			dev: {
				files: [{
					// Move all files in css/ (sans .less) into dev/css/
					expand: true,
					cwd: 'src/css',
					src: ['**', '!less/**'],
					dest: 'dev/css'
				}, {
					// Move all files in src/ (sans css) into dev/
					expand: true,
					dot: true,
					cwd: 'src',
					src: ['**', '!css/**'],
					dest: 'dev'
				}]
			},
			dist: {
				files: [{
					// Move all files in css/ (sans .less) into build/css/
					expand: true,
					cwd: 'src/css',
					src: ['**', '!less/**'],
					dest: 'dist/css'
				}, {
					// Move all files in js/ (sans js/controllers,js/services,js/phonegap) into build/js/
					expand: true,
					cwd: 'src/js',
					src: ['**', '!controllers/**', '!services/**', '!phonegap/**'],
					dest: 'dist/js'
				}, {
					// Move all files in src/ (sans css & js) into build/
					expand: true,
					dot: true,
					cwd: 'src',
					src: ['**', '!js/**', '!css/**'],
					dest: 'dist'
				}]
			}
		},
		autoprefixer: {
			options: {
				// browsers: ['last 5 version', 'ie 8', 'ie 9']
			},
			dev: {
				src: 'dev/css/style.css',
				dest: 'dev/css/style.css'
			}
		},
		watch: {
			files: ['src/**'],
			tasks: ['dev'],
		},
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('dev', ['less:dev', 'autoprefixer:dev', 'copy:dev']);
	grunt.registerTask('dist', ['less:dist', 'concat:dist', 'copy:dist']);
	grunt.registerTask('default', []);
};