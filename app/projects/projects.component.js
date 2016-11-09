define(['module', 'exports',
        '@angular/core',
        './projects.service'],
    function (module, exports, ngCore, projectService) {
        'use strict';

        function ProjectsComponent(projectService) {
            this.projectService = projectService;
            this.headerChange = new ngCore.EventEmitter();
        }

        //noinspection JSUnusedGlobalSymbols
        ProjectsComponent.prototype.ngOnChanges = function () {
            this.projectService.getProjects({
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
                inputs: ['route'],
                outputs: ['headerChange']
            })
        ];

        ProjectsComponent.parameters = [[projectService.ProjectsService]];

        exports.ProjectsComponent = ProjectsComponent;
    });
