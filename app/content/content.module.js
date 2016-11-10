define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/router',
        '../slider/slider.module',
        './content.component',
        './img.directive',
        './columns.directive'],
    function (exports, ngCore, ngBrowser, ngRouter, sliderModule, contentComponent, imgDirective, columnsDirective) {
        'use strict';

        function ContentModule() {
        }

        ContentModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    ngRouter.RouterModule,
                    sliderModule.SliderModule
                ],
                exports: [
                    contentComponent.ContentComponent,
                    ngBrowser.BrowserModule,
                    ngRouter.RouterModule
                ],
                declarations: [
                    contentComponent.ContentComponent, imgDirective.ImageDirective, columnsDirective.ColumnsDirective
                ]
            })
        ];

        exports.ContentModule = ContentModule;
    });
