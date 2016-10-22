define([
        'module', 'exports',
        '@angular/core',
        '@angular/router',
        '../locale.service',
        './routing.service'
    ],
    function (module, exports, ngCore, ngRouter, localeService, routingService) {
        function RouterComponent(route, localeService, routingService) {
            this.route = route;
            this.localeService = localeService;
            this.routingService = routingService;
        }

        RouterComponent.prototype.ngOnInit = function () {
            this.route.params.forEach(this.processRoute.bind(this));
        };

        RouterComponent.prototype.processRoute = function (pathParams) {
            var p, params = [];
            for (p in pathParams) {
                params.push(pathParams[p]);
            }
            this.routingService.getRouteConfig(params).then(
                function (config) {
                    this.localeService.setSelectedLang(config.locale);
                    this.config = config;
                    delete this.error;
                }.bind(this),
                function (error) {
                    this.error = error;
                }.bind(this)
            )
        };

        RouterComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                templateUrl: 'router.component.html'
            })
        ];

        RouterComponent.parameters = [
            ngRouter.ActivatedRoute,
            localeService.LocaleService,
            routingService.RoutingService
        ];

        exports.RouterComponent = RouterComponent;
    });
