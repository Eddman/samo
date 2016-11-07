define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        './admin.component'],
    function (exports, ngCore, ngBrowser, adminComponent) {
        'use strict';

        function AdminModule() {
        }

        AdminModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule
                ],
                declarations: [adminComponent.AdminComponent],
                providers: [],
                bootstrap: [adminComponent.AdminComponent]
            })
        ];

        exports.AdminModule = AdminModule;
    });
