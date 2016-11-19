/**
 * System configuration for Angular.
 */
function initApp() {
    'use strict';

    // Import ng2-page-slider
    System.import('node_modules/ng2-page-slider/ng2-page-slider.js');

    //noinspection ES6ModulesDependencies
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.min.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.min.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.min.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.min.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.min.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.min.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.min.js',

            // ng2-meta
            '@meta': 'npm:ng2-meta/dist',

            // ng2-gragula
            '@dragula': 'npm:ng2-dragula',
            'dragula': 'npm:dragula',
            'contra': 'npm:contra',
            'crossvent': 'npm:crossvent/dist/crossvent.min.js',
            'atoa': 'npm:atoa/atoa.js',
            'ticky': 'npm:ticky/ticky.js',

            // ng2-modal
            '@modal': 'node_modules/ng2-modal',

            // other libraries
            'rxjs': 'npm:rxjs'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            '@meta': {
                defaultExtension: 'js'
            },
            '@dragula': {
                defaultExtension: 'js'
            },
            'dragula': {
                main: './dragula.js',
                defaultExtension: 'js'
            },
            'contra': {
                defaultExtension: 'js'
            },
            '@modal': {
                main: 'index.js',
                defaultExtension: 'js'
            }
        }
    });
}
initApp();