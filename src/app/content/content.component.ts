import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ContentPart, ContentPartsTypes} from './content';

@Component({
    selector           : 'sn-content',
    templateUrl        : 'content.component.html',
    styleUrls          : ['content.component.scss'],
    host               : {
        '[class.sn-content]': 'true'
    },
    changeDetection    : ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class ContentComponent {

    public types: ContentPartsTypes = new ContentPartsTypes();

    @Input()
    public contentParts: ContentPart[] = [];
}
