define(['exports',
        '@angular/core',
        './list.component',
        './list.service',
        '../content/content.module'],
    function (exports, ngCore, listComponent, listService, contentModule) {
        'use strict';

        function ListModule() {
        }

        ListModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    contentModule.ContentComponent
                ],
                exports: [
                    listComponent.ListComponent
                ],
                declarations: [
                    listComponent.ListComponent
                ],
                providers: [
                    listService.ListService
                ]
            })
        ];

        exports.ListModule = ListModule;
    });
