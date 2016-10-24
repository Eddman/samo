define(['exports',
        '@angular/core',
        '../mock/projects.mock'],
    function (exports, ngCore, mockProjects) {
        function ProjectsService() {
            this.projects = mockProjects.projects;
        }

        ProjectsService.prototype.getProjects = function (config) {
            return Promise.resolve(this.projects[config.type][config.locale]);
        };

        exports.ProjectsService = ProjectsService;
    });
