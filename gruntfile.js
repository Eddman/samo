module.exports = function (grunt) {
    'use strict';

    //<editor-fold desc="Function definitions" defaultstate="collapsed">
    function providedJS(file) {
        return [file, file + '.map'];
    }

    function addAppFolders(pattern) {
        var i, paths = [];
        grunt.appFolders.forEach(function (item) {
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

    var // BrowserSync plugins to make logs better and to fallback to index.html
        fallback = require('connect-history-api-fallback'),
        log = require('connect-logger'),

        // Rollup plugins - used to create single bundle from all SystemJS
        nodeResolve = require('rollup-plugin-node-resolve'),
        commonjs = require('rollup-plugin-commonjs'),
        uglify = require('rollup-plugin-uglify'),

        // Project paths
        destination = 'dist/', // Destination folder for AoT version
        sassPattern, cssPattern, // SASS and compiled CSS
        htmlPattern, // HTML templates
        tsPattern, jsPattern, jsToCleanPattern, // TypeScript, JavaScript and mapping files
        images,
        mockFiles;

    grunt.appFolders = ['app', 'testing'];

    // Populate paths
    sassPattern = addAppFolders('**/*.scss', 'styles.scss').concat(['_global.scss', '_component.scss']);
    cssPattern = addAppFolders('**/*.css', 'styles.css');
    htmlPattern = addAppFolders('**/*.html', 'index.html');
    jsPattern = addAppFolders('**/*.js', 'systemjs.config.js');
    jsToCleanPattern = addAppFolders('**/*.js').concat(addAppFolders('**/*.js.map'));
    tsPattern = addAppFolders('**/*.ts');
    images = 'images/**/*';
    mockFiles = addAppFolders('**/*.json');

    grunt.initConfig({
        cleanup: {
            all: {
                src: [destination, 'ngFactories/', '.tscache/'].concat(cssPattern).concat(jsToCleanPattern)
            },
            postDist: {
                src: [destination + 'app/', destination + 'ngFactories/', 'ngFactories/']
            }
        },
        ts: {
            compile: {
                options: {
                    fast: 'never'
                },
                tsconfig: true
            },
            watchTS: {
                options: {
                    fast: 'always'
                },
                tsconfig: './tsconfig.watch.json'
            }
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
                            include: [
                                'node_modules/rxjs/**',
                                'node_modules/ng2-dragula/ng2-dragula.js',
                                'node_modules/ng2-dragula/components/**',
                                'node_modules/ng2-modal/**',
                                'node_modules/dragula/**',
                                'node_modules/contra/debounce.js',
                                'node_modules/contra/emitter.js',
                                'node_modules/crossvent/src/**',
                                'node_modules/custom-event/**',
                                'node_modules/atoa/atoa.js',
                                'node_modules/ticky/ticky.js'
                            ]
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
            'web-animations-js': {
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
            styles: {
                src: 'styles.css',
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
                files: sassPattern,
                tasks: ['sass']
            },
            devTs: {
                files: tsPattern,
                tasks: ['ts:watchTS']
            },
            dist: {
                files: sassPattern.concat(tsPattern),
                tasks: ['dist'],
                options: {
                    interrupt: false
                }
            }
        },
        browserSync: {
            options: {
                watchOptions: {
                    awaitWriteFinish: true,
                    usePolling: true,
                    interval: 5000
                },
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
                        baseDir: './' + destination,
                        middleware: [
                            log({format: '%date %status %method %url'}),
                            fallback({
                                index: '/index.html',
                                htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
                            })
                        ]
                    }
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: {
                tasks: ['browserSync:dev', 'watch:devSass', 'watch:devTs']
            },
            dist: {
                tasks: ['browserSync:dist', 'watch:dist']
            }
        }
    });

    // Build tools
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.renameTask('clean', 'cleanup'); // Renamed so we do not have name clash with our clean.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-rollup');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Our local tasks
    grunt.loadTasks('./tools/grunt_tasks');

    // Build tasks
    grunt.registerTask('clean', ['cleanup:all']);
    grunt.registerTask('compile', ['sass', 'ts:compile']);
    grunt.registerTask('build', ['cleanup:all', 'sass', 'ts:compile']);
    grunt.registerTask('run', ['build', 'concurrent:dev']);

    // Dist tasks
    grunt.registerTask('dist', ['cleanup:all', 'sass', 'cssmin', 'ngc', 'copy', 'rollup', 'cleanup:postDist']);
    grunt.registerTask('dist-run', ['dist', 'concurrent:dist']);
};