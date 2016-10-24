define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/router',
        './router.component',
        '../slider/slider.module',
        '../projects/projects.module',
        '../detail/detail.module',
        '../list/list.module'],
    function (exports, ngCore, ngBrowser, ngRouter, routerComponent, sliderModule,
              projectsModule, detailModule, listModule) {

        var i, routes = [], path = '';
        routes.push({
            path: path,
            component: routerComponent.RouterComponent
        });
        for (i = 0; i <= 10; i++) {
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
                    sliderModule.SliderModule,
                    projectsModule.ProjectsModule,
                    detailModule.DetailModule,
                    listModule.ListModule
                ],
                exports: [ngRouter.RouterModule],
                declarations: [routerComponent.RouterComponent]
            })
        ];

        exports.AppRoutingModule = AppRoutingModule;
    }
);
