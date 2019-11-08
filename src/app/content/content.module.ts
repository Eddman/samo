import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {SliderModule} from '../slider/slider.module';
import {ColumnsDirective} from './columns.directive';
import {ContentComponent} from './content.component';
import {ImageDirective} from './img.directive';

@NgModule({
    imports     : [
        BrowserModule,
        RouterModule,
        SliderModule
    ],
    exports     : [
        ContentComponent,
        BrowserModule,
        RouterModule
    ],
    declarations: [
        ContentComponent,
        ImageDirective,
        ColumnsDirective
    ]
})
export class ContentModule {

}
