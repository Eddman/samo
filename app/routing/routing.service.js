define(['exports',
        '../abstract.http.service',
        './route',
        './menu'],
    function (exports, httpService, routeClass, menuClass) {
        'use strict';

        var errors = {
            NOT_FOUND: 'Route not found for given path!'
        };

        function RoutingService(http) {
            httpService.AbstractHttpService.call(this, http);
        }

        httpService.inherit(RoutingService);

        RoutingService.prototype.getRootConfiguration = function () { // override
            return this.getWithCache("/app/mock/routing.mock.json");
        };

        RoutingService.prototype.getRouteConfig = function (routeParams) {
            //noinspection AmdModulesDependencies
            return new Promise(function (resolve, reject) {
                this.getRootConfiguration().then(function (rootConfiguration) {
                    var childRoutes, params,
                        config = rootConfiguration,
                        breakResolve = false;

                    if (routeParams && routeParams.length > 0) {
                        Object.keys(routeParams).some(function (i) {
                            if (!config.routes) {
                                params = routeParams.slice(i);
                                if (config.paramsSize === params.length) {
                                    resolve(routeClass.Route.forParameters(config.type,
                                        config.config, params));
                                    breakResolve = true;
                                    return breakResolve;
                                }
                                reject(errors.NOT_FOUND);
                                breakResolve = true;
                                return breakResolve;
                            }

                            childRoutes = config.routes;
                            config = undefined;
                            Object.keys(childRoutes).some(function (prop) {
                                if (childRoutes[prop].url === routeParams[i]) {
                                    config = childRoutes[prop];
                                    return true;
                                }
                                return false;
                            });

                            if (!config) {
                                reject(errors.NOT_FOUND);
                                breakResolve = true;
                                return breakResolve;
                            }
                            return false;
                        });
                        if (breakResolve) {
                            return;
                        }
                    }

                    if (config.redirect) {
                        resolve(routeClass.Route.forRedirect(config.redirect));
                        return;
                    }
                    if (!config || !config.type) {
                        reject(errors.NOT_FOUND);
                        return;
                    }

                    resolve(new routeClass.Route(config.type, config.config));
                }).catch(reject);
            }.bind(this));
        };

        RoutingService.prototype.getMenuRoutes = function () {
            //noinspection AmdModulesDependencies
            return new Promise(function (resolve, reject) {
                this.getRootConfiguration().then(function (rootConfiguration) {
                    var menuRoutes, config, menuLocales = [];
                    Object.keys(rootConfiguration.routes).forEach(function (route) {
                        config = rootConfiguration.routes[route];
                        if (config.url) {
                            menuRoutes = [];
                            if (config.routes && config.routes.length) {
                                Object.keys(config.routes).forEach(function (i) {
                                    menuRoutes.push(new menuClass.MenuItem(config.routes[i].title,
                                        '/' + config.url + '/' + config.routes[i].url));
                                });
                                menuLocales.push(new menuClass.MenuItem(config.title,
                                    '/' + config.url + '/' + config.routes[0].url,
                                    menuRoutes, config.url));
                            }
                        }
                    });
                    resolve(new menuClass.MenuItem(rootConfiguration.title, '/', menuLocales));
                }).catch(reject);
            }.bind(this));
        };

        exports.RoutingService = RoutingService;
        exports.ERRORS = errors;
    });
