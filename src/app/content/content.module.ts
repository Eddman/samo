import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SliderModule} from '../slider/slider.module';
import {ColumnsDirective} from './columns.directive';
import {ContentComponent} from './content.component';
import {ImageDirective} from './img.directive';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,
        SliderModule
    ],
    exports     : [
        ContentComponent
    ],
    declarations: [
        ContentComponent,
        ImageDirective,
        ColumnsDirective
    ]
})
export class ContentModule {

}
