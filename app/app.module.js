define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        './locale.service',
        './routing/routing.service',
        './routing/routing.module',
        './app.component',
        './menu/menu.component'],
    function (exports, ngCore, ngBrowser, localeService, routingService, appRouting, appComponent, menuComponent) {
        function AppModule() {
        }

        AppModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
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
