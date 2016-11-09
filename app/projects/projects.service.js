define(['exports',
        '../mock/projects.mock'],
    function (exports, mockProjects) {
        'use strict';

        function ProjectsService() {
            this.projects = mockProjects.projects;
        }

        ProjectsService.prototype.getProjects = function (config) {
            //noinspection AmdModulesDependencies
            var projectsTree = this.projects;
            Object.keys(config.type).forEach(function (i) {
                projectsTree = projectsTree[config.type[i]];
            });
            return Promise.resolve(projectsTree);
        };

        exports.ProjectsService = ProjectsService;
    });
