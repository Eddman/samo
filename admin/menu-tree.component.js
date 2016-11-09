define(['module', 'exports',
        '@angular/core',
        './menu.service'],
    function (module, exports, ngCore, menuService) {
        'use strict';

        function MenuTreeComponent(menuService) {
            this.types = ['group', 'slider', 'projects', 'detail', 'list'];
            this.menuService = menuService;
        }

        MenuTreeComponent.prototype.setRoute = function(route) {
            this.menuService.setSelectedMenuRoute(route);
        };

        MenuTreeComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'menu-tree',
                templateUrl: 'menu-tree.component.html',
                inputs: ['config', 'parentConfig'],
                styleUrls: ['../node_modules/bootstrap/dist/css/bootstrap.min.css']
            })
        ];
        MenuTreeComponent.parameters = [menuService.MenuService];

        exports.MenuTreeComponent = MenuTreeComponent;
    });
