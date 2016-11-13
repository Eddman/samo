define(['module', 'exports',
        '@angular/core',
        '@angular/router',
        './menu.service'],
    function (module, exports, ngCore, ngRouter, menuService) {
        'use strict';

        function GroupComponent(menuService, router) {
            this.menuService = menuService;
            this.router = router;
        }

        GroupComponent.prototype.ngOnInit = function () {
            if (!this.menuService.selectedMenuRoute) {
                this.router.navigate(['admin']);
            }
        };

        GroupComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'group',
                templateUrl: 'group.component.html'
            })
        ];

        GroupComponent.parameters = [
            menuService.MenuService,
            ngRouter.Router
        ];

        exports.GroupComponent = GroupComponent;
    });
