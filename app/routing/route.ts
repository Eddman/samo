import {RouteType} from "./route.type";
import {ViewHeader} from "../detail/detail";

export class Route {

    public redirectPath: string;

    public parameters: any[];

    public additionalHeader: ViewHeader;

    constructor(public type?: string, public configuration?: RouteType) {
    }

    public static forParameters(type: string, configuration: RouteType, parameters: string[]): Route {
        let route: Route = new Route(type, configuration);
        route.parameters = parameters;
        return route;
    };

    public static forRedirect(redirectPath: string): Route {
        let redirection: Route = new Route();
        redirection.redirectPath = redirectPath;
        return redirection;
    }
}
