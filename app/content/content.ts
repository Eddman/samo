import {RouteType} from "../routing/route.type";

export let contentPartsTypes = {
    TEXT: 'text',
    IMAGE: 'image',
    LINK_EXTERNAL: 'external-link',
    LINK_INTERNAL: 'internal-link',
    LINE_BREAK: 'break',
    SLIDER: 'slider'
};

export interface ContentPart {
    type: string;

    text: string;
    columns: number;

    url: string;
    routeLink: string;

    title: string;
    float: string;
    width: any;

    configuration: RouteType;
}
