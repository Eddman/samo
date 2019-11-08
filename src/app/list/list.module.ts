import {NgModule} from '@angular/core';

import {ContentModule} from '../content/content.module';

import {ListService} from './list.service';
import {ListComponent} from './list.component';

@NgModule({
    imports     : [
        ContentModule
    ],
    exports     : [
        ListComponent
    ],
    declarations: [
        ListComponent
    ],
    providers   : [
        ListService
    ]
})
export class ListModule {
}
