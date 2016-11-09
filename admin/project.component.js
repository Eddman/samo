define(['module', 'exports',
        '@angular/core',
        '@angular/router',
        './menu.service'],
    function (module, exports, ngCore, ngRouter, menuService) {
        'use strict';

        function ProjectsComponent(menuService, router) {
            this.menuService = menuService;
            this.router = router;
        }

        ProjectsComponent.prototype.ngOnInit = function() {
            if(!this.menuService.selectedMenuRoute) {
                this.router.navigate(['admin']);
            }
        };

        ProjectsComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'project',
                templateUrl: 'project.component.html'
            })
        ];

        ProjectsComponent.parameters = [
            menuService.MenuService,
            ngRouter.Router
        ];

        exports.ProjectsComponent = ProjectsComponent;
    });
