define([
        'module', 'exports',
        '@angular/core',
        '@angular/router',
        '../locale.service',
        './routing.service'
    ],
    function (module, exports, ngCore, ngRouter, localeService, routingService) {
        'use strict';

        function RouterComponent(router, route, localeService, routingService) {
            this.router = router;
            this.route = route;
            this.localeService = localeService;
            this.routingService = routingService;
        }

        //noinspection JSUnusedGlobalSymbols
        RouterComponent.prototype.ngOnInit = function () {
            this.route.params.forEach(this.processRoute.bind(this));
        };

        RouterComponent.prototype.processRoute = function (pathParams) {
            var params = [];
            Object.keys(pathParams).forEach(function (p) {
                params.push(pathParams[p]);
            });
            this.routingService.getRouteConfig(params).then(
                function (route) {
                    this.localeService.setSelectedLang(route.locale);
                    this.config = route;
                    if (route.redirectPath) {
                        this.router.navigate(route.redirectPath);
                    }
                }.bind(this),
                function () {
                    this.router.navigate(['/']);
                }.bind(this)
            );
        };

        RouterComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                templateUrl: 'router.component.html'
            })
        ];

        RouterComponent.parameters = [
            ngRouter.Router,
            ngRouter.ActivatedRoute,
            localeService.LocaleService,
            routingService.RoutingService
        ];

        exports.RouterComponent = RouterComponent;
    });
