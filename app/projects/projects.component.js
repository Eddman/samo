define(['module', 'exports',
        '@angular/core',
        '@angular/router',
        '../locale.service',
        './projects.service'],
    function (module, exports, ngCore, ngRouter, localeService, projectService) {
        function ProjectsComponent(route, localeService, projectService) {
            this.route = route;
            this.localeService = localeService;
            this.projectService = projectService;
        }

        ProjectsComponent.prototype.ngOnInit = function () {
            var self = this;
            this.route.params.forEach(
                function (params) {
                    self.localeService.setSelectedLang(params['lang']);
                    self.projectService.getProjects().then(function (projects) {
                        self.projects = projects;
                    });
                });
        };

        ProjectsComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'projects-view',
                templateUrl: 'projects.component.html',
                styleUrls: ['projects.component.css']
            })
        ];

        ProjectsComponent.parameters = [
            ngRouter.ActivatedRoute,
            localeService.LocaleService,
            projectService.ProjectsService
        ];

        exports.ProjectsComponent = ProjectsComponent;
    });
