define(['module', 'exports',
        '@angular/core',
        '@angular/router',
        './menu.service'],
    function (module, exports, ngCore, ngRouter, menuService) {
        'use strict';

        function SliderComponent(menuService, router) {
            this.menuService = menuService;
            this.router = router;
        }

        SliderComponent.prototype.ngOnInit = function () {
            if (!this.menuService.selectedMenuRoute) {
                this.router.navigate(['admin']);
            }
        };

        SliderComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'slider',
                templateUrl: 'slider.component.html'
            })
        ];

        SliderComponent.parameters = [
            menuService.MenuService,
            ngRouter.Router
        ];

        exports.SliderComponent = SliderComponent;
    });
