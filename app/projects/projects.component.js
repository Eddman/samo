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
                this.loadProjects();
            },
            loadProjects: function () {
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
                    this.projects = [].concat(projects);
                }.bind(this));
            },
            edit: function () {
                this.isEdit = true;
            },
            save: function () {
                this.isEdit = false;
            },
            cancel: function () {
                this.isEdit = false;
                this.loadProjects();
            },
            addNewProject: function () {
                this.projects.push({});
            }
        }, [projectService.ProjectsService]);

        exports.ProjectsComponent = abstractComponent.component(ProjectsComponent, module, 'projects-view', 'projects.component');
    });
