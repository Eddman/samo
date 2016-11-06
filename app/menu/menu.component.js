define(['module', 'exports',
        '@angular/core',
        '../locale.service',
        '../routing/routing.service'],
    function (module, exports, ngCore, localeService, routingService) {
        'use strict';

        function MenuComponent(localeService, routingService) {
            this.localeService = localeService;
            this.routingService = routingService;
        }

        //noinspection JSUnusedGlobalSymbols
        MenuComponent.prototype.ngOnInit = function () {
            this.routingService.getMenuRoutes().then(function (rootItem) {
                this.rootItem = rootItem;
                document.title = rootItem.title;
            }.bind(this), function (error) {
                this.error = error;
                delete this.rootItem;
            }.bind(this));
        };

        MenuComponent.prototype.isMenuHidden = function () {
            var selected = this.routingService.selectedRoute;
            return selected && (selected.parameters || selected.additionalHeader);
        };

        MenuComponent.prototype.getHomeLink = function () {
            var selected = this.routingService.selectedRoutePathParams;
            return selected ? '/' + selected.slice(0, selected.length - 1).join('/') : '/';
        };

        MenuComponent.prototype.getPageHeader = function () {
            return this.routingService.selectedRoute.additionalHeader;
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
