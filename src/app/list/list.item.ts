import {ContentPart} from '../content/content';

export interface ListItem {
    title?: string;
    externalURL?: string;
    content: ContentPart[];
}