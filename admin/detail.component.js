define(['module', 'exports',
        '@angular/core',
        '@angular/router',
        './menu.service'],
    function (module, exports, ngCore, ngRouter, menuService) {
        'use strict';

        function DetailComponent(menuService, router) {
            this.menuService = menuService;
            this.router = router;
        }

        DetailComponent.prototype.ngOnInit = function() {
            if(!this.menuService.selectedMenuRoute) {
                this.router.navigate(['admin']);
            }
        };

        DetailComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'detail',
                templateUrl: 'detail.component.html'
            })
        ];

        DetailComponent.parameters = [
            menuService.MenuService,
            ngRouter.Router
        ];

        exports.DetailComponent = DetailComponent;
    });
