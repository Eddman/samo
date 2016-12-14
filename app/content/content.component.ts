import {Component, Input} from "@angular/core";

import {ContentPart, ContentPartsTypes} from "./content";

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'content.component.html',
    styleUrls: ['content.component.css']
})
export class ContentComponent {

    public types: any;

    @Input()
    public contentParts: ContentPart[];

    constructor() {
        this.types = ContentPartsTypes;
    }
}