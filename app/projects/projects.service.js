define(['exports',
        '@angular/core',
        '../mock/projects.mock',
        '../locale.service'],
    function (exports, ngCore, mockProjects, localeService) {
        function ProjectsService(localeService) {
            this.localeService = localeService;
            this.projectsSk = mockProjects.projectsSk;
            this.projectsAt = mockProjects.projectsAt;
        }

        ProjectsService.prototype.getProjects = function () {
            if (this.localeService.getSelectedLang() == 'sk') {
                return Promise.resolve(this.projectsSk);
            } else {
                return Promise.resolve(this.projectsAt);
            }
        };
        ProjectsService.parameters = [[localeService.LocaleService]];

        exports.ProjectsService = ProjectsService;
    });
