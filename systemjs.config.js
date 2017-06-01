/**
 * System configuration for Angular.
 */
function initApp() {
    'use strict';

    // TODO: remove after UMD package is available
    System.import('node_modules/@herbis/ngx-modal/@herbis/ngx-modal.system.js');

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
            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            // ng2-gragula
            'ng2-dragula': 'npm:ng2-dragula',
            'dragula': 'npm:dragula',
            'contra': 'npm:contra',
            'crossvent': 'npm:crossvent/dist/crossvent.min.js',
            'atoa': 'npm:atoa/atoa.js',
            'ticky': 'npm:ticky/ticky.js',

            // ngx-modal
            // TODO: remove after UMD package is available
            '@herbis/ngx-modal': 'ngx-modal',
            //'@herbis/ngx-modal': 'npm:@herbis/ngx-modal/@herbis/ngx-modal.umd.js',

            // ng2-page-slider
            'ng2-page-slider': 'npm:ng2-page-slider/bundles/ng2-page-slider.umd.js',

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
            'ng2-dragula': {
                defaultExtension: 'js'
            },
            'dragula': {
                main: './dragula.js',
                defaultExtension: 'js'
            },
            'contra': {
                defaultExtension: 'js'
            }
        }
    });
}
initApp();