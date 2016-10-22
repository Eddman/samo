define(['exports',
        '../slider/slider.component',
        '../projects/projects.component',
        '../mock/routing.mock'],
    function (exports, sliderComponent, projectsComponent, routingMock) {

        var errors = {
            NOT_FOUND: 'Route not found for given path!'
        };

        function RoutingService() {
            this.routes = routingMock.routes;
        }

        RoutingService.prototype.getRoutes = function () {
            if (this.routes) {
                return Promise.resolve(this.routes);
            }
        };

        RoutingService.prototype.getRouteConfig = function (routeParams) {
            return new Promise(function (resolve, reject) {
                this.getRoutes().then(function (routes) {
                    var locale, route, config, routePath = [];
                    if (routeParams && routeParams.length) {
                        locale = routeParams[0];
                    }

                    for (route in routes) {
                        if (routes[route].locale === locale) {
                            config = routes[route];
                            if (locale) {
                                routePath.push(locale);
                            }
                            break;
                        }
                    }

                    if (!config) {
                        reject(errors.NOT_FOUND);
                        return;
                    }

                    if (routeParams && routeParams.length > 1) {
                        for (i = 1; i < routeParams.length; i++) {
                            if (!config) {
                                reject(errors.NOT_FOUND);
                                return;
                            }

                            if (!config.routes) {
                                config.params = routeParams.slice(i);
                                break;
                            }

                            routes = config.routes;
                            delete config;
                            for (route in routes) {
                                if (routes[route].url === routeParams[i]) {
                                    config = routes[route];
                                    if (config.url) {
                                        routePath.push(config.url);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    if (config.type === 'group' && (config.redirect || config.redirect === '')) {
                        if (!config.routes) {
                            reject(errors.NOT_FOUND);
                        }

                        routes = config.routes;
                        delete config;
                        for (route in routes) {
                            if (routes[route].url === config.redirect) {
                                config = routes[route];
                                if (config.url) {
                                    routePath.push(config.url);
                                }
                                break;
                            }
                        }

                        if (!config) {
                            reject(errors.NOT_FOUND);
                            return;
                        }
                        config.redirected = true;
                    } else {
                        config.redirected = false;
                    }

                    if (!config.type || config.type === 'group') {
                        reject(errors.NOT_FOUND);
                    }

                    config.routePath = routePath;
                    config.locale = locale;
                    resolve(config);
                }).catch(function (error) {
                    reject(error);
                });
            }.bind(this));
        };

        RoutingService.prototype.getMenuRoutes = function () {
            return new Promise(function (resolve, reject) {
                this.getRoutes().then(function (routes) {
                    var i, route, config, menuLocales = [], menuRoutes;
                    for (route in routes) {
                        config = routes[route];
                        if (config.locale) {
                            menuRoutes = [];
                            if (config.routes && config.routes.length) {
                                for (i in config.routes) {
                                    menuRoutes.push({
                                        title: config.routes[i].title,
                                        url: '/' + config.locale + '/' + config.routes[i].url
                                    });
                                }
                                menuLocales.push({
                                    locale: config.locale,
                                    title: config.title,
                                    url: '/' + config.locale + '/' + config.routes[0].url,
                                    items: menuRoutes
                                });
                            }
                        }
                    }
                    resolve(menuLocales);
                }).catch(function (error) {
                    reject(error);
                });
            }.bind(this));
        };

        exports.RoutingService = RoutingService;
        exports.ERRORS = errors;
    });
