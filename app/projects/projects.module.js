define(['exports',
        '@angular/core',
        './projects.component',
        './thumbnail.component',
        './projects.service',
        '../detail/detail.module'],
    function (exports, ngCore, projectsComponent, thumbnailComponent, projectsService, detailModule) {
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
                    projectsComponent.ProjectsComponent,
                    thumbnailComponent.ThumbnailComponent
                ],
                providers: [projectsService.ProjectsService]
            })
        ];

        exports.ProjectsModule = ProjectsModule;
    });
