define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        './projects.component',
        './projects.service'],
    function (exports, ngCore, ngBrowser, projectsComponent, projectsService) {
        function ProjectsModule() {
        }

        ProjectsModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule
                ],
                declarations: [
                    projectsComponent.ProjectsComponent
                ],
                providers: [projectsService.ProjectsService]
            })
        ];

        exports.ProjectsModule = ProjectsModule;
    });
