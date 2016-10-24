define(['exports',
        './route',
        './menu',
        '../mock/routing.mock'],
    function (exports, routeClass, menuClass, routingMock) {

        var errors = {
            NOT_FOUND: 'Route not found for given path!'
        };

        function RoutingService() {
            this.routes = routingMock.routes;
        }

        RoutingService.prototype.getRootConfiguration = function () {
            if (this.routes) {
                return Promise.resolve(this.routes);
            }
        };

        RoutingService.prototype.getRouteConfig = function (routeParams) {
            return new Promise(function (resolve, reject) {
                this.getRootConfiguration().then(function (rootConfiguration) {
                    var locale, prop, childRoutes, i, params,
                        config = rootConfiguration;
                    if (routeParams && routeParams.length) {
                        locale = routeParams[0];
                    }

                    if (routeParams && routeParams.length > 0) {
                        for (i = 0; i < routeParams.length; i++) {
                            if (!config.routes) {
                                params = routeParams.slice(i);
                                if(config.paramsSize === params.length) {
                                    resolve(routeClass.Route.forParameters(config.type, locale,
                                        config.config, params));
                                    return;
                                } else {
                                    reject(errors.NOT_FOUND);
                                }
                            }

                            childRoutes = config.routes;
                            config = undefined;
                            for (prop in childRoutes) {
                                if (childRoutes.hasOwnProperty(prop)
                                    && childRoutes[prop].url === routeParams[i]) {
                                    config = childRoutes[prop];
                                    break;
                                }
                            }

                            if (!config) {
                                reject(errors.NOT_FOUND);
                                return;
                            }

                        }
                    }

                    if (config.redirect) {
                        resolve(routeClass.Route.forRedirect(config.redirect));
                        return;
                    } else if (!config || !config.type) {
                        reject(errors.NOT_FOUND);
                        return;
                    }

                    resolve(new routeClass.Route(config.type, locale, config.config));
                }).catch(function (error) {
                    reject(error);
                });
            }.bind(this));
        };

        RoutingService.prototype.getMenuRoutes = function () {
            return new Promise(function (resolve, reject) {
                this.getRootConfiguration().then(function (rootConfiguration) {
                    var i, route, menuRoutes,
                        config, menuLocales = [];
                    for (route in rootConfiguration.routes) {
                        if (rootConfiguration.routes.hasOwnProperty(route)) {
                            config = rootConfiguration.routes[route];
                            if (config.url) {
                                menuRoutes = [];
                                if (config.routes && config.routes.length) {
                                    for (i in config.routes) {
                                        if (config.routes.hasOwnProperty(i)) {
                                            menuRoutes.push(new menuClass.MenuItem(config.routes[i].title,
                                                '/' + config.url + '/' + config.routes[i].url));
                                        }
                                    }
                                    menuLocales.push(new menuClass.MenuItem(config.title,
                                        '/' + config.url + '/' + config.routes[0].url,
                                        menuRoutes, config.url));
                                }
                            }
                        }
                    }
                    resolve(new menuClass.MenuItem(rootConfiguration.title, '/', menuLocales));
                }).catch(function (error) {
                    reject(error);
                });
            }.bind(this));
        };

        exports.RoutingService = RoutingService;
        exports.ERRORS = errors;
    });
