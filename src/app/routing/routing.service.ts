import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AbstractHttpService} from '../abstract.http.service';
import {MenuItem} from './menu';
import {Route} from './route';
import {RouteConfiguration} from './route.configuration';

const errors = {
    NOT_FOUND: 'Route not found for given path!'
};
// TODO change after a BE is available
const getURL = '/assets/mock/routing.mock.json';

@Injectable()
export class RoutingService extends AbstractHttpService<RouteConfiguration> {

    private _selectedRoute: Route | undefined;

    private _selectedRoutePathParams: string[] = [];

    private readonly _navigationOccurred = new Subject<void>();

    constructor(http: HttpClient) {
        super(http);
    }

    public getRootConfiguration(): Observable<RouteConfiguration> {
        return this.getWithCache({
            resourceURL: getURL
        });
    }

    public get selectedRoutePathParams(): string[] {
        return this._selectedRoutePathParams;
    }

    public get selectedRoute(): Route | undefined {
        return this._selectedRoute;
    }

    public get navigationOccurred(): Observable<void> {
        return this._navigationOccurred.asObservable();
    }

    public setSelectedRoute(selectedRoute: Route | undefined, selectedRoutePathParams: string[]) {
        this._selectedRoute = selectedRoute;
        this._selectedRoutePathParams = selectedRoutePathParams;
        this._navigationOccurred.next();
    }

    public getRouteConfig(routeParams: string[]): Observable<Route> {
        return this.getRootConfiguration().pipe(
            switchMap((rootConfiguration: RouteConfiguration) => {
                let childRoutes: RouteConfiguration[];
                let params: string[];
                let config: RouteConfiguration | undefined = rootConfiguration;
                let breakResolve: boolean = false;
                let route: Route | undefined;

                if (routeParams && routeParams.length > 0) {
                    Object.keys(routeParams).some((val, i) => {
                        if (config == null) {
                            return false;
                        }
                        if (!config.routes) {
                            params = routeParams.slice(i);
                            if (config.paramsSize === params.length) {
                                route = Route.forParameters(config.type,
                                    config.config, params);
                                breakResolve = true;
                                return breakResolve;
                            }
                            config = undefined;
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
                            breakResolve = true;
                            return breakResolve;
                        }
                        return false;
                    });
                    if (route != null) {
                        return of(route);
                    }
                }

                if (config != null && config.redirect) {
                    return of(Route.forRedirect(config.redirect));
                }

                if (!config || !config.type) {
                    return throwError(errors.NOT_FOUND);
                }

                return of(new Route(config.type, config.config));
            })
        );
    }

    public getMenuRoutes(): Observable<MenuItem> {
        return this.getRootConfiguration().pipe(
            map((rootConfiguration: RouteConfiguration) => {
                let menuRoutes: MenuItem[];
                let config: any;
                const menuLocales: MenuItem[] = [];
                if (rootConfiguration.routes != null) {
                    rootConfiguration.routes.forEach((route: RouteConfiguration) => {
                        config = route;
                        if (config.url) {
                            menuRoutes = [];
                            if (config.routes && config.routes.length) {
                                Object.keys(config.routes).forEach((i) => {
                                    menuRoutes.push(new MenuItem(config.routes[i].title,
                                        '/' + config.url + '/' + config.routes[i].url));
                                });
                                menuLocales.push(new MenuItem(config.title,
                                    '/' + config.url, menuRoutes, config.url));
                            }
                        }
                    });
                }
                return new MenuItem(rootConfiguration.title, '/', menuLocales);
            })
        );
    }
}
