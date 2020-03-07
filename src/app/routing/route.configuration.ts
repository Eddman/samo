import {RouteTypes} from './route';
import {RouteType} from './route.type';

export interface RouteConfiguration {
    title: string;
    type: RouteTypes;
    url: string;
    routes?: RouteConfiguration[];

    redirect?: string;
    paramsSize?: number;
    config?: RouteType;

    // For internal purpose
    bag?: string;
}
