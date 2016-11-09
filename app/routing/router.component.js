define([
        'module', 'exports',
        '@angular/core',
        '@angular/router',
        './routing.service'
    ],
    function (module, exports, ngCore, ngRouter, routingService) {
        'use strict';

        function RouterComponent(router, route, routingService) {
            this.router = router;
            this.route = route;
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
                    this.config = route;
                    this.routingService.selectedRoute = route;
                    this.routingService.selectedRoutePathParams = params;

                    if (route.redirectPath) {
                        this.router.navigate(route.redirectPath);
                    }
                }.bind(this),
                function () {
                    this.router.navigate(['/']);
                }.bind(this)
            );
        };

        RouterComponent.prototype.processHeader = function (header) {
            this.config.additionalHeader = header;
        };

        RouterComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                templateUrl: 'router.component.html',
                styleUrls: ['router.component.css']
            })
        ];

        RouterComponent.parameters = [
            ngRouter.Router,
            ngRouter.ActivatedRoute,
            routingService.RoutingService
        ];

        exports.RouterComponent = RouterComponent;
    });
