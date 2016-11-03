module.exports = function (grunt) {
    var destination = 'dist/';
    grunt.initConfig({
        clean: {
            build: {
                src: [destination]
            }
        },
        uglify: {
            files: {
                src: ['app/**/*.js',
                    'systemjs.config.js'
                ],
                dest: destination,
                expand: true,
                flatten: false
            }
        },
        copy: {
            shim: {
                src: ['node_modules/core-js/client/shim.min.js'],
                dest: destination
            },
            ZoneJS: {
                src: ['node_modules/zone.js/dist/zone.js'],
                dest: destination
            },
            ReflectJS: {
                src: ['node_modules/reflect-metadata/Reflect.js'],
                dest: destination
            },
            SystemJS: {
                src: ['node_modules/systemjs/dist/system.src.js'],
                dest: destination
            },
            rxjs: {
                src: ['node_modules/rxjs/**/*.js'],
                dest: destination
            },
            angular: {
                src: [
                    'node_modules/@angular/core/bundles/core.umd.js',
                    'node_modules/@angular/common/bundles/common.umd.js',
                    'node_modules/@angular/compiler/bundles/compiler.umd.js',
                    'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
                    'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
                    'node_modules/@angular/http/bundles/http.umd.js',
                    'node_modules/@angular/router/bundles/router.umd.js',
                    'node_modules/@angular/forms/bundles/forms.umd.js'
                ],
                dest: destination
            },
            'ng2-page-slider': {
                src: ['node_modules/ng2-page-slider/ng2-page-slider.js'],
                dest: destination
            },
            fonts: {
                src: ['fonts/*'],
                dest: destination
            },
            html: {
                src: ['app/**/*.html',
                    'index.html'
                ],
                dest: destination
            }
        },
        cssmin: {
            minify: {
                files: [{
                    expand: true,
                    src: ['**/*.css', '!node_modules/**'],
                    dest: destination
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


// register at least this one task
    grunt.registerTask('default', ['clean', 'uglify', 'copy', 'cssmin']);
};