define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/router',
        './projects.component',
        './projects.service',
        '../detail/detail.module'],
    function (exports, ngCore, ngBrowser, ngRouter, projectsComponent, projectsService, detailModule) {
        function ProjectsModule() {
        }

        ProjectsModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    ngRouter.RouterModule,
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
