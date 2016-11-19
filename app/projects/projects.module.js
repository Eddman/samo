define(['exports',
        '@angular/core',
        '@dragula/ng2-dragula',
        '../common/modal/modal.module',
        './projects.component',
        './thumbnail.component',
        './projects.service',
        '../detail/detail.module'],
    function (exports, ngCore, ngDragula, modalModule, projectsComponent, thumbnailComponent, projectsService, detailModule) {
        'use strict';

        function ProjectsModule() {
        }

        ProjectsModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngDragula.DragulaModule,
                    detailModule.DetailModule,
                    modalModule.ModalModule
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
