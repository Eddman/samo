define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/router',
        './locale.service',
        './routing/routing.service',
        './routing/routing.module',
        './app.component',
        './menu/menu.component',
        '../admin/admin.module'],
    function (exports, ngCore, ngBrowser, ngRouter, localeService, routingService, appRouting, appComponent,
              menuComponent, adminModule) {
        'use strict';

        function AppModule() {
        }

        AppModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    ngRouter.RouterModule.forRoot({ }),
                    adminModule.AdminModule,
                    appRouting.AppRoutingModule
                ],
                declarations: [
                    appComponent.AppComponent,
                    menuComponent.MenuComponent
                ],
                providers: [localeService.LocaleService, routingService.RoutingService],
                bootstrap: [appComponent.AppComponent]
            })
        ];

        exports.AppModule = AppModule;
    });
