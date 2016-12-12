import {ContentPart} from "../content/content";

export interface ViewHeader {
    pageTitle: string;
    content: string;
}

export interface Detail {
    title?: string;
    content: ContentPart[];
    header: ViewHeader;
}