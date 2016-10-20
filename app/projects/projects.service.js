define(['exports',
        '@angular/core',
        './projects.mock',
        '../locale.service'],
    function (exports, ngCore, mockProjects, localeService) {
        function ProjectsService(localeService) {
            this.localeService = localeService;
            this.projectsSk = mockProjects.projectsSk;
            this.projectsAt = mockProjects.porjectsAt;
        }

        ProjectsService.prototype.getProjects = function () {
            if (this.localeService.getSelectedLang() == 'sk') {
                return this.projectsSk;
            } else {
                return this.projectsAt;
            }
        };
        ProjectsService.parameters = [[localeService.LocaleService]];

        exports.ProjectsService = ProjectsService;
    });
