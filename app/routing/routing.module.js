define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/router',
        './router.component',
        '../projects/projects.module',
        '../slider/slider.module',
        '../detail/detail.module'],
    function (exports, ngCore, ngBrowser, ngRouter, routerComponent,
              projectsModule, sliderModule, detailModule) {

        var i, routes = [], path = '';
        routes.push({
            path: path,
            component: routerComponent.RouterComponent
        });
        for (i = 0; i <= 100; i++) {
            path += ':p' + i;
            routes.push({
                path: path,
                component: routerComponent.RouterComponent
            });
            path += '/';
        }

        function AppRoutingModule() {
        }

        AppRoutingModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    ngRouter.RouterModule.forRoot(routes),
                    projectsModule.ProjectsModule,
                    sliderModule.SliderModule,
                    detailModule.DetailModule
                ],
                exports: [ngRouter.RouterModule],
                declarations: [routerComponent.RouterComponent]
            })
        ];

        exports.AppRoutingModule = AppRoutingModule;
    }
);
