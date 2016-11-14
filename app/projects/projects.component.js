define(['module', 'exports',
        '@angular/core',
        '@angular/meta/index',
        './projects.service'],
    function (module, exports, ngCore, ngMeta, projectService) {
        'use strict';

        function ProjectsComponent(projectService, metaService) {
            this.projectService = projectService;
            this.metaService = metaService;
            this.headerChange = new ngCore.EventEmitter();
        }

        //noinspection JSUnusedGlobalSymbols
        ProjectsComponent.prototype.ngOnChanges = function () {
            this.projectService.getProjects({
                type: this.route.configuration.type
            }).then(function (projects) {
                Object.keys(projects).forEach(function (i) {
                    projects[i].index = +i;
                });
                this.metaService.setTag('description');
                if (this.route.parameters && this.route.parameters.length && projects[this.route.parameters[0]]) {
                    this.metaService.setTag('og:image', window.location.origin
                        + projects[this.route.parameters[0] - 1].thumbUrl);
                } else {
                    this.metaService.setTag('og:image', window.location.origin + projects[0].thumbUrl);
                }
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

        ProjectsComponent.parameters = [projectService.ProjectsService, ngMeta.MetaService];

        exports.ProjectsComponent = ProjectsComponent;
    });
