import {Directive, Input, OnInit} from '@angular/core';
import {ContentPart} from './content';

@Directive({
    selector: '[columns]',
    host    : {
        '[class.text]'   : 'true',
        '[class.column2]': 'columnsCount == 2',
        '[class.column3]': 'columnsCount == 3'
    }
})
export class ColumnsDirective implements OnInit {

    @Input('columns')
    public contentPart: ContentPart;

    public columnsCount: number;

    public ngOnInit(): void {
        if (this.contentPart) {
            this.columnsCount = this.contentPart.columns;
        }
    }
}