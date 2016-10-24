define(['module', 'exports',
        '@angular/core',
        '../locale.service',
        './projects.service'],
    function (module, exports, ngCore, localeService, projectService) {
        function ProjectsComponent(localeService, projectService) {
            this.localeService = localeService;
            this.projectService = projectService;
        }

        //noinspection JSUnusedGlobalSymbols
        ProjectsComponent.prototype.ngOnChanges = function () {
            this.projectService.getProjects({
                locale: this.route.locale,
                type: this.route.configuration.type
            }).then(function (projects) {
                this.projects = projects;
            }.bind(this));
        };

        ProjectsComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'projects-view',
                templateUrl: 'projects.component.html',
                styleUrls: ['projects.component.css'],
                inputs: ['route']
            })
        ];

        ProjectsComponent.parameters = [
            localeService.LocaleService,
            projectService.ProjectsService
        ];

        exports.ProjectsComponent = ProjectsComponent;
    });
