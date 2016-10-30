define(['exports',
        '../mock/projects.mock'],
    function (exports, mockProjects) {
        function ProjectsService() {
            this.projects = mockProjects.projects;
        }

        ProjectsService.prototype.getProjects = function (config) {
            return Promise.resolve(this.projects[config.type][config.locale]);
        };

        exports.ProjectsService = ProjectsService;
    });
