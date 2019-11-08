import {NgModule} from '@angular/core';
import {ContentModule} from '../content/content.module';
import {DetailComponent} from './detail.component';
import {DetailService} from './detail.service';

@NgModule({
    imports     : [
        ContentModule
    ],
    exports     : [
        ContentModule,
        DetailComponent
    ],
    declarations: [
        DetailComponent
    ],
    providers   : [DetailService]
})
export class DetailModule {
}
