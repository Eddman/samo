define(['exports',
        '@angular/core',
        './detail.component',
        './detail.service',
        '../content/content.module'],
    function (exports, ngCore, detailComponent, detailService, contentModule) {
        'use strict';

        function DetailModule() {
        }

        DetailModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    contentModule.ContentComponent
                ],
                exports: [
                    contentModule.ContentComponent,
                    detailComponent.DetailComponent
                ],
                declarations: [
                    detailComponent.DetailComponent
                ],
                providers: [detailService.DetailService]
            })
        ];

        exports.DetailModule = DetailModule;
    });
