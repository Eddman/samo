define(['exports',
        '@angular/core',
        '../mock/projects.mock',
        '../locale.service'],
    function (exports, ngCore, mockProjects, localeService) {
        function ProjectsService(localeService) {
            this.localeService = localeService;
            this.projects = mockProjects.projects;
        }

        ProjectsService.prototype.getProjects = function (config) {
            return Promise.resolve(this.projects[config.type][config.locale]);
        };
        ProjectsService.parameters = [[localeService.LocaleService]];

        exports.ProjectsService = ProjectsService;
    });
