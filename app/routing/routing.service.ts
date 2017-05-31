import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {AbstractHttpService} from '../abstract.http.service';
import {RequestService} from '../auth/request.service';

import {MenuItem} from './menu';
import {RouteConfiguration} from './route.configuration';
import {Route} from './route';

const errors = {
        NOT_FOUND: 'Route not found for given path!'
    },
    getURL = '/app/mock/routing.mock.json', // TODO change after a BE is available
    postURL = '/routing/save';

@Injectable()
export class RoutingService extends AbstractHttpService<RouteConfiguration> {

    public disabled: boolean = false;

    public selectedRoute: Route;

    public selectedRoutePathParams: string[];

    constructor(http: Http, requestService: RequestService) {
        super(http, requestService);
    }

    public getRootConfiguration(): Promise<RouteConfiguration> {
        return this.getWithCache({
            resourceURL: getURL
        });
    }

    public saveRootConfiguration(rootItem: RouteConfiguration): Promise<RouteConfiguration> {
        return new Promise((resolve, reject) => {
            this.post({
                resourceURL: postURL,
                data       : rootItem
            }).subscribe(
                (data) => {
                    this.setCache(data);
                    resolve(data);
                }, reject);
        });
    }

    public getRouteConfig(routeParams: string[]): Promise<Route> {
        return new Promise((resolve, reject) => {
            this.getRootConfiguration().then((rootConfiguration: RouteConfiguration) => {
                let childRoutes: RouteConfiguration[], params: string[],
                    config: RouteConfiguration = rootConfiguration,
                    breakResolve: boolean = false;

                if (routeParams && routeParams.length > 0) {
                    Object.keys(routeParams).some((val, i) => {
                        if (!config.routes) {
                            params = routeParams.slice(i);
                            if (config.paramsSize === params.length) {
                                resolve(Route.forParameters(config.type,
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
                        Object.keys(childRoutes).some((prop: any) => {
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
                    resolve(Route.forRedirect(config.redirect));
                    return;
                }
                if (!config || !config.type) {
                    reject(errors.NOT_FOUND);
                    return;
                }

                resolve(new Route(config.type, config.config));
            }).catch(reject);
        });
    }

    public getMenuRoutes(): Promise<MenuItem> {
        return new Promise<MenuItem>((resolve, reject) => {
            this.getRootConfiguration().then((rootConfiguration: RouteConfiguration) => {
                let menuRoutes: MenuItem[], config: any, menuLocales: MenuItem[] = [];
                rootConfiguration.routes.forEach((route: RouteConfiguration) => {
                    config = route;
                    if (config.url) {
                        menuRoutes = [];
                        if (config.routes && config.routes.length) {
                            Object.keys(config.routes).forEach(function (i) {
                                menuRoutes.push(new MenuItem(config.routes[i].title,
                                    '/' + config.url + '/' + config.routes[i].url));
                            });
                            menuLocales.push(new MenuItem(config.title,
                                '/' + config.url, menuRoutes, config.url));
                        }
                    }
                });
                resolve(new MenuItem(rootConfiguration.title, '/', menuLocales));
            }).catch(reject);
        });
    }
}
