import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ContentModule} from '../content/content.module';
import {DetailComponent} from './detail.component';
import {DetailService} from './detail.service';

@NgModule({
    imports     : [
        CommonModule,
        ContentModule
    ],
    exports     : [
        DetailComponent
    ],
    declarations: [
        DetailComponent
    ],
    providers   : [
        DetailService
    ]
})
export class DetailModule {
}
