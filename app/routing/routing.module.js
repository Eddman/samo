define(['exports',
        '@angular/core',
        '@angular/router',
        './router.component',
        '../slider/slider.module',
        '../projects/projects.module',
        '../detail/detail.module',
        '../list/list.module'],
    function (exports, ngCore, ngRouter, routerComponent, sliderModule,
              projectsModule, detailModule, listModule) {
        'use strict';

        var i, routes = [], path = '';
        routes.push({
            path: path,
            component: routerComponent.RouterComponent
        });
        for (i = 0; i <= 3; i += 1) {
            path += ':p' + i;
            routes.push({
                path: path,
                pathMatch: 'full',
                component: routerComponent.RouterComponent
            });
            path += '/';
        }

        function AppRoutingModule() {
        }

        AppRoutingModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngRouter.RouterModule.forChild(routes),
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
