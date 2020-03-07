import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ContentModule} from '../content/content.module';
import {ListComponent} from './list.component';
import {ListService} from './list.service';

@NgModule({
    imports     : [
        CommonModule,
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
