import {Directive, Input, OnInit} from "@angular/core";

import {ContentPart} from "./content";

@Directive({
    selector: '[img]',
    host: {
        '[class.floatLeft]': 'floatLeft',
        '[class.floatRight]': 'floatRight',
        '[title]': 'title',
        '[src]': 'url',
        '[style.width]': 'width'
    }
})
export class ImageDirective implements OnInit {

    @Input('img')
    private contentPart: ContentPart;

    private floatLeft: boolean;

    private floatRight: boolean;
    private title: string;
    private url: string;
    private width: any;

    public ngOnInit(): void {
        if (this.contentPart) {
            if (this.contentPart.float) {
                switch (this.contentPart.float) {
                    case 'left':
                        this.floatLeft = true;
                        this.floatRight = false;
                        break;
                    case 'right':
                        this.floatLeft = false;
                        this.floatRight = true;
                        break;
                    default:
                        this.floatLeft = false;
                        this.floatRight = false;
                        break;
                }
            }
            this.url = this.contentPart.url;
            this.title = this.contentPart.title;
            this.width = this.contentPart.width;
        }
    }
}