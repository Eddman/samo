define([
        'module', 'exports',
        '@angular/core',
        '../abstract.component'
    ],
    function (module, exports, ngCore, abstractComponent) {
        'use strict';

        function RouterComponent() {
            abstractComponent.AbstractComponent.apply(this, arguments);
        }

        abstractComponent.inherit(RouterComponent, {
            ngOnInit: function () {
                this.route.params.forEach(this.processRoute.bind(this));
            },
            processRoute: function (pathParams) {
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
                            this.router.navigate([route.redirectPath], {relativeTo: this.route});
                        }
                    }.bind(this),
                    function () {
                        this.router.navigate(['/']);
                    }.bind(this)
                );
            },
            processHeader: function (header) {
                this.config.additionalHeader = header;
            }
        }, []);

        exports.RouterComponent = abstractComponent.simpleComponent(RouterComponent, module, 'router',
            'router.component');
    });
