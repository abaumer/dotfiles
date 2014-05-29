module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: './img/',
                        src: ['**/*.png'],
                        dest: './img/',
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: './img/',
                        src: ['**/*.jpg'],
                        dest: './img/',
                        ext: '.jpg'
                    }
                ]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            } 
        },

        less: {
            development: {
                options: {
                    compress: true
                },
                files: {
                    'css/styles.css': 'css/styles.less'
                }
            } 
        },

        autoprefixer: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.css'
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            sass: {
                files: ['css/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
            less: {
                files: ['css/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['css/*.css'],
                tasks: ['autoprefixer'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);

    // 5. Custom Tasks
    grunt.registerTask('images', ['imagemin']);

};