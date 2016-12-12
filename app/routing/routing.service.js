"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var abstract_http_service_1 = require("../abstract.http.service");
var request_service_1 = require("../auth/request.service");
var menu_1 = require("./menu");
var route_1 = require("./route");
var errors = {
    NOT_FOUND: 'Route not found for given path!'
}, getURL = '/app/mock/routing.mock.json', // TODO change after a BE is available
postURL = '/routing/save';
var RoutingService = (function (_super) {
    __extends(RoutingService, _super);
    function RoutingService(http, requestService) {
        var _this = _super.call(this, http, requestService) || this;
        _this.disabled = false;
        return _this;
    }
    RoutingService.prototype.getRootConfiguration = function () {
        return this.getWithCache(getURL);
    };
    RoutingService.prototype.saveRootConfiguration = function (rootItem) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.post(postURL, { data: rootItem }).subscribe(function (data) {
                _this.setCache(data);
                resolve(data);
            }, reject);
        });
    };
    RoutingService.prototype.getRouteConfig = function (routeParams) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRootConfiguration().then(function (rootConfiguration) {
                var childRoutes, params, config = rootConfiguration, breakResolve = false;
                if (routeParams && routeParams.length > 0) {
                    Object.keys(routeParams).some(function (val, i) {
                        if (!config.routes) {
                            params = routeParams.slice(i);
                            if (config.paramsSize === params.length) {
                                resolve(route_1.Route.forParameters(config.type, config.config, params));
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
                    resolve(route_1.Route.forRedirect(config.redirect));
                    return;
                }
                if (!config || !config.type) {
                    reject(errors.NOT_FOUND);
                    return;
                }
                resolve(new route_1.Route(config.type, config.config));
            }).catch(reject);
        });
    };
    RoutingService.prototype.getMenuRoutes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRootConfiguration().then(function (rootConfiguration) {
                var menuRoutes, config, menuLocales = [];
                Object.keys(rootConfiguration.routes).forEach(function (route) {
                    config = rootConfiguration.routes[route];
                    if (config.url) {
                        menuRoutes = [];
                        if (config.routes && config.routes.length) {
                            Object.keys(config.routes).forEach(function (i) {
                                menuRoutes.push(new menu_1.MenuItem(config.routes[i].title, '/' + config.url + '/' + config.routes[i].url));
                            });
                            menuLocales.push(new menu_1.MenuItem(config.title, '/' + config.url, menuRoutes, config.url));
                        }
                    }
                });
                resolve(new menu_1.MenuItem(rootConfiguration.title, '/', menuLocales));
            }).catch(reject);
        });
    };
    return RoutingService;
}(abstract_http_service_1.AbstractHttpService));
RoutingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, request_service_1.RequestService])
], RoutingService);
exports.RoutingService = RoutingService;
