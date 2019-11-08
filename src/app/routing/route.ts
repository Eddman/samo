import {ViewHeader} from '../detail/detail';
import {RouteType} from './route.type';

export type RouteTypes = 'redirect' | 'slider' | 'projects' | 'detail' | 'list' | 'group';

export class Route {

    public redirectPath: string | undefined;

    public parameters: any[] | undefined;

    public additionalHeader: ViewHeader | undefined;

    public constructor(public type: RouteTypes, public configuration: RouteType = {type: []}) {
    }

    public static forParameters(type: RouteTypes, configuration?: RouteType, parameters?: string[]): Route {
        const route: Route = new Route(type, configuration);
        route.parameters = parameters;
        return route;
    }

    public static forRedirect(redirectPath: string): Route {
        const redirection: Route = new Route('redirect');
        redirection.redirectPath = redirectPath;
        return redirection;
    }
}
