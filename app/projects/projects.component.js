define(['module', 'exports',
        '@angular/core',
        './projects.service'],
    function (module, exports, ngCore, projectService) {
        function ProjectsComponent(projectService) {
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

        ProjectsComponent.parameters = [[projectService.ProjectsService]];

        exports.ProjectsComponent = ProjectsComponent;
    });
