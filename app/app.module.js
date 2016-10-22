define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        './locale.service',
        './routing/routing.service',
        './routing/app-routing.module',
        './app.component',
        './menu/menu.component',
        './slider/slider.component',
        './projects/projects.module'],
    function (exports, ngCore, ngBrowser, localeService, routingService, appRouting, appComponent, menuComponent,
              sliderComponent, projectsModule) {
        function AppModule() {
        }

        AppModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    appRouting.AppRoutingModule,
                    projectsModule.ProjectsModule
                ],
                declarations: [
                    appComponent.AppComponent,
                    menuComponent.MenuComponent,
                    sliderComponent.SliderComponent
                ],
                providers: [localeService.LocaleService, routingService.RoutingService],
                bootstrap: [appComponent.AppComponent]
            })
        ];

        exports.AppModule = AppModule;
    });
