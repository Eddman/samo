define(['exports',
        '@angular/core',
        './projects.component',
        './projects.service',
        '../detail/detail.module'],
    function (exports, ngCore, projectsComponent, projectsService, detailModule) {
        'use strict';

        function ProjectsModule() {
        }

        ProjectsModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    detailModule.DetailModule
                ],
                exports: [
                    projectsComponent.ProjectsComponent
                ],
                declarations: [
                    projectsComponent.ProjectsComponent
                ],
                providers: [projectsService.ProjectsService]
            })
        ];

        exports.ProjectsModule = ProjectsModule;
    });
