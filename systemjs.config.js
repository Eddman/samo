/**
 * System configuration for Angular.
 */
function initApp() {
    'use strict';

    // Import ng2-page-slider-aot-fix
    System.import('node_modules/ng2-page-slider-aot-fix/ng2-page-slider.js');

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
            'ng2-meta/src': 'npm:ng2-meta/dist',

            // ng2-gragula
            'ng2-dragula': 'npm:ng2-dragula',
            'dragula': 'npm:dragula',
            'contra': 'npm:contra',
            'crossvent': 'npm:crossvent/dist/crossvent.min.js',
            'atoa': 'npm:atoa/atoa.js',
            'ticky': 'npm:ticky/ticky.js',

            // ng2-modal
            'ng2-modal': 'npm:ng2-modal',

            // ng2-page-slider-aot-fix
            'ng2-page-slider-aot-fix/index': 'index',
            'ng2-page-slider-aot-fix/src/components/pageslider.component': 'src/components/pageslider.component',

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
            'ng2-meta/src': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ng2-dragula': {
                defaultExtension: 'js'
            },
            'dragula': {
                main: './dragula.js',
                defaultExtension: 'js'
            },
            'contra': {
                defaultExtension: 'js'
            },
            'ng2-modal': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            'ng2-page-slider-aot-fix': {
                defaultExtension: 'js'
            }
        }
    });
}
initApp();