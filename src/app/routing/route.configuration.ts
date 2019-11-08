import {RouteType} from './route.type';

export interface RouteConfiguration {
    title: string;
    type: string;
    url: string;
    routes?: RouteConfiguration[];

    redirect?: string;
    paramsSize?: number;
    config?: RouteType;

    // For internal purpose
    bag?: string;
}