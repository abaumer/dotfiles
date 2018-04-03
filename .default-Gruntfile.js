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
                    compress: true,
                    StrictMath: true
                },
                files: {
                    'css/styles.css': 'css/styles.less'
                }
            },
        },

        postcss2: {
            options: {
              map: {
                  inline: false, 
                  annotation: 'maps/'
              },

              processors: [
                require('pixrem')(),
                require('autoprefixer')({browsers: 'last 2 versions'}),
                require('cssnano')(),
              ],
            },
            src: 'css/styles.css'
        },

        postcss: {
          options: {
            map: true,
            processors: [
              require('autoprefixer')({browsers: ['last 1 version']})
            ]
          },
          dist: {
            src: 'css/styles.css'
          }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'js/scripts-dist.js': 'js/scripts.js'
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'js/dist.min.js': ['js/plugins.js', 'js/main.js']
                }
            }
        },

        uncss: {
            dist: {
                options: {
                  stylesheets  : ['css/styles.css'],
                  compress:true
                },
                files: [
                    { src: '*.html', dest: 'css/tidy.css'}
                ]
            }
        },

        cssmin: {
          add_banner: {
            options: {
              banner: '/* My uncss-ed and minified css file */'
            },
            files: {
              'css/tidy.min.css': ['css/tidy.css', 'css/extra-dist-css.css']
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
                tasks: ['postcss:dist', 'cssmin'],
                options: {
                    spawn: false,
                }
            },
            js: {
                files: ['js/scripts.js'],
                tasks: ['babel'],
                options: {
                    spawn: false,
                }
            }
        },

        critical: {
            test: {
                options: {
                    base: './',
                    css: [
                        'css/styles.css'
                    ],
                    width: 320,
                    height: 600
                },
                src: 'dist/index-rendered.html',
                dest: 'dist/critical-styles.css'
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-critical');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);

    // 5. Custom Tasks
    grunt.registerTask('images', ['imagemin']);
    grunt.registerTask('styles', ['postcss:dist']);
    grunt.registerTask('dist', ['postcss:dist', 'uncss', 'cssmin', 'uglify']);
    grunt.registerTask('criticalcss', ['critical']);

};