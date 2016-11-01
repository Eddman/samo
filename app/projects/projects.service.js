define(['exports',
        '../mock/projects.mock'],
    function (exports, mockProjects) {
        'use strict';

        function ProjectsService() {
            this.projects = mockProjects.projects;
        }

        ProjectsService.prototype.getProjects = function (config) {
            //noinspection AmdModulesDependencies
            return Promise.resolve(this.projects[config.type][config.locale]);
        };

        exports.ProjectsService = ProjectsService;
    });
