import {Directive, Input, OnInit} from '@angular/core';
import {ContentPart} from './content';

@Directive({
    selector: '[sn-columns]',
    host    : {
        '[class.text]'   : 'true',
        '[class.column2]': 'columnsCount == 2',
        '[class.column3]': 'columnsCount == 3'
    }
})
export class ColumnsDirective implements OnInit {

    @Input('sn-columns')
    public contentPart: ContentPart | undefined;

    public columnsCount: number = 1;

    public ngOnInit(): void {
        if (this.contentPart != null) {
            this.columnsCount = this.contentPart.columns;
        }
    }
}
