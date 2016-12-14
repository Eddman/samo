import {RouteType} from "../routing/route.type";

export type ContentType = 'text' | 'image' | 'external-link' | 'internal-link' | 'break' | 'slider';

export abstract class ContentPartsTypes {
    public static TEXT: ContentType = 'text';
    public static IMAGE: ContentType = 'image';
    public static LINK_EXTERNAL: ContentType = 'external-link';
    public static LINK_INTERNAL: ContentType = 'internal-link';
    public static LINE_BREAK: ContentType = 'break';
    public static SLIDER: ContentType = 'slider';
}


export interface ContentPart {
    type: ContentType;

    text: string;
    columns: number;

    url: string;
    routeLink: string;

    title: string;
    float: string;
    width: any;

    configuration: RouteType;
}
