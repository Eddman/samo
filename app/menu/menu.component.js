define(['module', 'exports',
        '@angular/core',
        '../locale.service',
        '../routing/routing.service'],
    function (module, exports, ngCore, localeService, routingService) {
        function MenuComponent(localeService, routingService) {
            this.localeService = localeService;
            this.routingService = routingService;
        }

        MenuComponent.prototype.ngOnInit = function () {
            this.routingService.getMenuRoutes().then(function (menuLocales) {
                this.menuLocales = menuLocales;
            }.bind(this), function (error) {
                this.error = error;
                delete this.menuLocales;
            }.bind(this));
        };

        MenuComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'app-menu',
                templateUrl: 'menu.component.html',
                styleUrls: ['menu.component.css']
            })
        ];
        MenuComponent.parameters = [
            localeService.LocaleService,
            routingService.RoutingService
        ];

        exports.MenuComponent = MenuComponent;
    });
