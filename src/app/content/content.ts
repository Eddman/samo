import {RouteType} from '../routing/route.type';

export type ContentType = 'text' | 'image' | 'external-link' | 'internal-link' | 'break' | 'slider';

export class ContentPartsTypes {
    public TEXT: ContentType = 'text';
    public IMAGE: ContentType = 'image';
    public LINK_EXTERNAL: ContentType = 'external-link';
    public LINK_INTERNAL: ContentType = 'internal-link';
    public LINE_BREAK: ContentType = 'break';
    public SLIDER: ContentType = 'slider';
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
