define(['module',
        'exports',
        '../abstract.component',
        './projects.service'],
    function (module, exports, abstractComponent, projectService) {
        'use strict';

        function ProjectsComponent(metaService, authService, projectService) {
            abstractComponent.AbstractComponent.apply(this, arguments);
            this.projectService = projectService;
            this.isEdit = false;
        }

        abstractComponent.inherit(ProjectsComponent, {
            ngOnChanges: function () {
                this.projectService.getProject({
                    type: this.route.configuration.type
                }).then(function (projects) {
                    Object.keys(projects).forEach(function (i) {
                        projects[i].index = +i;
                    });

                    this.setSEODescription();
                    this.setSEOImage();

                    if (projects) {
                        if (this.route.parameters && this.route.parameters.length && projects[this.route.parameters[0]]) {
                            this.setSEOImage(projects[this.route.parameters[0] - 1].thumbUrl);
                        } else {
                            this.setSEOImage(projects[0].thumbUrl);
                        }
                    }
                    this.projects = projects;
                }.bind(this));
            }
        }, [projectService.ProjectsService]);

        exports.ProjectsComponent = abstractComponent.component(ProjectsComponent, module, 'projects-view', 'projects.component');
    });
