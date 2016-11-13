define(['module', 'exports',
        '@angular/core',
        '@angular/router',
        './menu.service'],
    function (module, exports, ngCore, ngRouter, menuService) {
        'use strict';

        function ListComponent(menuService, router) {
            this.menuService = menuService;
            this.router = router;
        }

        ListComponent.prototype.ngOnInit = function () {
            if (!this.menuService.selectedMenuRoute) {
                this.router.navigate(['admin']);
            }
        };

        ListComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'list',
                templateUrl: 'list.component.html'
            })
        ];

        ListComponent.parameters = [
            menuService.MenuService,
            ngRouter.Router
        ];

        exports.ListComponent = ListComponent;
    });
