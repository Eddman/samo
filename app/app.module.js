define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/router',
        '@angular/http',
        '@angular/meta/index',
        './routing/routing.service',
        './routing/routing.module',
        './app.component',
        './menu/menu.component',
        '../admin/admin.module'],
    function (exports, ngCore, ngBrowser, ngRouter, ngHttp, ngMeta, routingService, appRouting, appComponent,
              menuComponent, adminModule) {
        'use strict';

        var metaConfig;

        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//"
                + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }

        metaConfig = {
            defaults: {
                title: 'SAMUEL NETOČNÝ, architekt'
            }
        };

        function AppModule() {
        }

        AppModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    ngRouter.RouterModule.forRoot({}),
                    ngMeta.MetaModule.forRoot(metaConfig),
                    adminModule.AdminModule,
                    appRouting.AppRoutingModule,
                    ngHttp.HttpModule,
                    ngHttp.JsonpModule
                ],
                declarations: [
                    appComponent.AppComponent,
                    menuComponent.MenuComponent
                ],
                providers: [routingService.RoutingService],
                bootstrap: [appComponent.AppComponent]
            })
        ];

        exports.AppModule = AppModule;
    });
