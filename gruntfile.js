module.exports = function (grunt) {
    var fallback = require('connect-history-api-fallback'),
        log = require('connect-logger'),
        destination = 'dist/',
        sassPattern, sassPatternWatch,
        cssPattern, htmlPattern, jsPattern,
        images = ['images/**'],
        appFolders = ['app', 'admin'];

    function providedJS(file) {
        return [file, file + ".map"];
    }

    function addAppFolders(pattern) {
        var paths = [];
        appFolders.forEach(function (item) {
            paths.push(item + '/' + pattern);
        });
        if (arguments.length > 1) {
            for (i = 1; i < arguments.length; i++) {
                paths.push(arguments[i]);
            }
        }
        return paths;
    }

    sassPattern = addAppFolders('**/*.scss', 'styles.scss');
    sassPatternWatch = sassPattern.concat(['_global.scss', '_component.scss']);
    cssPattern = addAppFolders('**/*.css', 'styles.css');
    htmlPattern = addAppFolders('**/*.html', 'index.html');
    jsPattern = addAppFolders('**/*.js', 'systemjs.config.js');

    grunt.initConfig({
        clean: {
            all: {
                src: [destination].concat(cssPattern)
            }
        },
        uglify: {
            files: {
                src: jsPattern,
                dest: destination,
                expand: true
            }
        },
        copy: {
            shim: {
                src: providedJS('node_modules/core-js/client/shim.min.js'),
                dest: destination
            },
            ZoneJS: {
                src: providedJS('node_modules/zone.js/dist/zone.js'),
                dest: destination
            },
            ReflectJS: {
                src: providedJS('node_modules/reflect-metadata/Reflect.js'),
                dest: destination
            },
            SystemJS: {
                src: providedJS('node_modules/systemjs/dist/system.src.js'),
                dest: destination
            },
            rxjs: {
                src: providedJS('node_modules/rxjs/**/*.js'),
                dest: destination
            },
            angular: {
                src: [].concat(
                    providedJS('node_modules/@angular/core/bundles/core.umd.js')).concat(
                    providedJS('node_modules/@angular/common/bundles/common.umd.js')).concat(
                    providedJS('node_modules/@angular/compiler/bundles/compiler.umd.js')).concat(
                    providedJS('node_modules/@angular/platform-browser/bundles/platform-browser.umd.js')).concat(
                    providedJS('node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js')).concat(
                    providedJS('node_modules/@angular/http/bundles/http.umd.js')).concat(
                    providedJS('node_modules/@angular/router/bundles/router.umd.js')).concat(
                    providedJS('node_modules/@angular/forms/bundles/forms.umd.js'))
                ,
                dest: destination
            },
            'ng2-page-slider': {
                src: providedJS('node_modules/ng2-page-slider/ng2-page-slider.js'),
                dest: destination
            },
            fonts: {
                src: ['fonts/*'],
                dest: destination
            },
            html: {
                src: htmlPattern,
                dest: destination
            },
            images: {
                src: images,
                dest: destination
            },
            favicon: {
                src: 'favicon.ico',
                dest: destination
            }
        },
        sass: {
            compile: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    ext: '.css',
                    extDot: 'last',
                    src: sassPattern,
                    dest: '.'
                }]
            }
        },
        cssmin: {
            minify: {
                files: [{
                    expand: true,
                    src: cssPattern,
                    dest: destination
                }]
            }
        },
        watch: {
            sass: {
                files: sassPatternWatch,
                tasks: ['sass'],
                options: {
                    interrupt: true,
                    spawn: false
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: cssPattern.concat(htmlPattern).concat(jsPattern).concat(images)
                },
                options: {
                    injectChanges: false, // workaround for Angular 2 styleUrls loading
                    ui: false,
                    server: {
                        baseDir: './',
                        middleware: [
                            log({format: '%date %status %method %url'}),
                            fallback({
                                index: '/index.html',
                                htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
                            })
                        ]
                    },
                    browser: [
                        'chrome',
                        'google chrome'
                    ],
                    watchTask: true
                }
            }
        }
    });

    // Build tools
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sass');

    // Dev run tools
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');


    // register at least this one task
    grunt.registerTask('cleanBuild', ['clean', 'sass']);
    grunt.registerTask('dev', ['sass', 'browserSync', 'watch']);
    grunt.registerTask('dist', ['clean', 'uglify', 'copy', 'sass', 'cssmin']);
};