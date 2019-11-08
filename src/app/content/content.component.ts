import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ContentPart, ContentPartsTypes} from './content';

const contentPartsTypes = new ContentPartsTypes();

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

    public readonly types: ContentPartsTypes = contentPartsTypes;

    @Input()
    public contentParts: ContentPart[] = [];
}
