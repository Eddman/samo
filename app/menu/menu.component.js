define(['module', 'exports',
        '@angular/core',
        '../abstract.component'],
    function (module, exports, ngCore, abstractComponent) {
        'use strict';

        function MenuComponent() {
            abstractComponent.AbstractComponent.apply(this, arguments);
        }

        abstractComponent.inherit(MenuComponent, {
            ngOnInit: function () {
                this.routingService.getMenuRoutes().then(function (rootItem) {
                    this.rootItem = rootItem;
                    document.title = rootItem.title;
                }.bind(this), function (error) {
                    this.error = error;
                    delete this.rootItem;
                }.bind(this));
            },
            isDisabled: function () {
                return this.routingService.disabled;
            },
            isRootExpanded: function (menuLocale) {
                var selected = this.routingService.selectedRoutePathParams;
                return selected && selected.length && selected[0] === menuLocale.realURL;
            },
            isMenuHidden: function () {
                var selected = this.routingService.selectedRoute;
                return selected && (selected.parameters || selected.additionalHeader);
            },
            getHomeLink: function () {
                var selected = this.routingService.selectedRoutePathParams;
                return selected ? '/' + selected.slice(0, selected.length - 1).join('/') : '/';
            },
            getPageHeader: function () {
                return this.routingService.selectedRoute.additionalHeader;
            }
        }, []);


        exports.MenuComponent = abstractComponent.simpleComponent(MenuComponent, module, 'app-menu',
            'menu.component');

        exports.MenuComponent = MenuComponent;
    });
