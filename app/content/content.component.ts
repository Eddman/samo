import {Component, Input} from "@angular/core";

import {contentPartsTypes, ContentPart} from "./content";

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'content.component.html',
    styleUrls: ['content.component.css']
})
export class ContentComponent {

    private types: any;

    @Input()
    private contentParts: ContentPart[];

    constructor() {
        this.types = contentPartsTypes;
    }
}