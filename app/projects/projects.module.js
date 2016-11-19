define(['exports',
        '@angular/core',
        '@dragula/ng2-dragula',
        './projects.component',
        './thumbnail.component',
        './projects.service',
        '../detail/detail.module'],
    function (exports, ngCore, ngDragula, projectsComponent, thumbnailComponent, projectsService, detailModule) {
        'use strict';

        function ProjectsModule() {
        }

        ProjectsModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngDragula.DragulaModule,
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
