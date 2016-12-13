module.exports = function (grunt) {
    'use strict';

    var fallback = require('connect-history-api-fallback'),
        log = require('connect-logger'),
        destination = 'dist/',
        sassPattern, sassPatternWatch,
        cssPattern, htmlPattern, tsPattern, compiledJSPattern, jsPattern, mockFiles,
        images = ['images/**'],
        appFolders = ['app'],
        distTask,
        nodeResolve = require('rollup-plugin-node-resolve'),
        commonjs = require('rollup-plugin-commonjs'),
        uglify = require('rollup-plugin-uglify');

    //<editor-fold desc="Task and function definition" defaultstate="collapsed">
    function runProcess(command, args) {
        return function () {
            var done = this.async(), start = Date.now(), src = command + ' ' + args.join(' ');

            grunt.log.writeln('-> '.cyan + 'executing ' + src.cyan);


            //use spawn so we don't have to depend on process.exit();
            function tsc(callback) {

                var child = grunt.util.spawn(
                    {
                        cmd: command,
                        args: args
                    },
                    function (error, result, code) {
                        if (error) {
                            grunt.fail.warn('-> '.cyan + 'error '.red + ('' + code).red + ' ' + src.cyan + ' (' + (Date.now() - start) + 'ms)');
                            callback(error);
                        } else if (code !== 0) {
                            grunt.fail.warn('-> '.cyan + 'exitcode '.red + ('' + code).red + ' ' + src.cyan + ' (' + (Date.now() - start) + 'ms)');
                            callback(new Error('bad exit code ' + code), code);
                        } else {
                            grunt.log.writeln('-> '.cyan + 'completed ' + src.cyan + ' (' + (Date.now() - start) + 'ms)');
                            callback();
                        }
                    }
                );

                child.stdout.on('data', function (data) {
                    grunt.log.write(data);
                });
                child.stderr.on('data', function (data) {
                    grunt.log.write(('' + data).red);
                });

            }

            grunt.util.async.series([
                    tsc
                ],
                function (err) {
                    grunt.log.writeln('');
                    if (err) {
                        grunt.log.writeln(err);
                        done(false);
                    }
                    else {
                        done();
                    }
                });
        };
    }

    grunt.registerMultiTask('ts', 'Run TypeScript compiler', runProcess('tsc', ['-p', './tsconfig.json']));
    grunt.registerMultiTask('ngc', 'Run Angular 2 compiler', runProcess('npm', ['run', 'ngc']));

    function providedJS(file) {
        return [file, file + ".map"];
    }

    function addAppFolders(pattern) {
        var i, paths = [];
        appFolders.forEach(function (item) {
            paths.push(item + '/' + pattern);
        });
        if (arguments.length > 1) {
            for (i = 1; i < arguments.length; i += 1) {
                paths.push(arguments[i]);
            }
        }
        return paths;
    }

    //</editor-fold>

    sassPattern = addAppFolders('**/*.scss', 'styles.scss');
    sassPatternWatch = sassPattern.concat(['_global.scss', '_component.scss']);
    cssPattern = addAppFolders('**/*.css', 'styles.css');
    htmlPattern = addAppFolders('**/*.html', 'index.html');
    jsPattern = addAppFolders('**/*.js', 'systemjs.config.js');
    compiledJSPattern = addAppFolders('**/*.js').concat(addAppFolders('**/*.js.map'));
    tsPattern = addAppFolders('**/*.ts');
    mockFiles = addAppFolders('**/*.json');

    grunt.initConfig({
        clean: {
            all: {
                src: [destination, 'ngFactories/'].concat(cssPattern).concat(compiledJSPattern)
            }
        },
        ts: {
            default: {}
        },
        ngc: {
            default: {}
        },
        rollup: {
            options: {
                sourceMap: false,
                format: 'iife',
                plugins: function () {
                    return [
                        nodeResolve({jsnext: true, module: true}),
                        commonjs({
                            include: 'node_modules/rxjs/**',
                            namedExports: {
                                'node_modules/ng2-dragula/components/dragula.provider.js': ['DragulaService'],
                                'node_modules/ng2-meta/src/meta.service.js': ['MetaService'],
                                'node_modules/ng2-meta/src/meta.module.js': ['MetaModule', 'META_CONFIG'],
                                'node_modules/ng2-page-slider/index.js': ['PageSliderModule'],
                                'node_modules/ng2-dragula/ng2-dragula.js': ['DragulaModule'],
                                'node_modules/ng2-modal/index.js': ['ModalModule']
                            }
                        }),
                        uglify()
                    ];
                }
            },
            default: {
                files: {
                    'dist/samo.js': [destination + 'app/main.aot.js'] // Only one source file is permitted
                }
            }
        },
        copy: {
            shim: {
                src: providedJS('node_modules/core-js/client/shim.min.js'),
                dest: destination
            },
            "web-animations-js": {
                src: providedJS('node_modules/web-animations-js/web-animations.min.js'),
                dest: destination
            },
            ZoneJS: {
                src: 'node_modules/zone.js/dist/zone.min.js',
                dest: destination
            },
            html: {
                src: 'index.aot.html',
                dest: destination + 'index.html'
            },
            images: {
                src: images,
                dest: destination
            },
            favicon: {
                src: 'favicon.ico',
                dest: destination
            },
            mock: {
                src: mockFiles,
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
                    dest: '.'
                }]
            }
        },
        watch: {
            options: {
                interrupt: true,
                spawn: false
            },
            devSass: {
                files: sassPatternWatch,
                tasks: ['sass']
            },
            devTs: {
                files: tsPattern,
                tasks: ['ts']
            },
            dist: {
                files: sassPatternWatch.concat(tsPattern),
                tasks: distTask,
                options: {
                    interrupt: true,
                    spawn: false
                }
            }
        },
        browserSync: {
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
                ]
            },
            dev: {
                bsFiles: {
                    src: cssPattern.concat(htmlPattern).concat(jsPattern).concat(images).concat(mockFiles)
                }
            },
            dist: {
                bsFiles: {
                    src: destination + '**/*'
                },
                options: {
                    server: {
                        baseDir: './' + destination
                    }
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: {
                target: ['browserSync:dev', 'watch:devSass', 'watch:devTs']
            },
            dist: {
                target: ['browserSync:dist', 'watch:dist']
            }
        }
    });

    // Build tools
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-rollup');
    grunt.loadNpmTasks('grunt-sass');

    // Dev run tools
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');


    // register at least this one task
    distTask = ['clean', 'sass', 'cssmin', 'ngc', 'copy', 'rollup'];
    grunt.registerTask('cleanBuild', ['clean', 'sass', 'ts']);
    grunt.registerTask('dev', ['cleanBuild', 'concurrent:dev']);
    grunt.registerTask('testDist', distTask.concat(['concurent:dist']));
    grunt.registerTask('dist', distTask);
};