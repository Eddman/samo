import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";

import {SliderModule} from "../slider/slider.module";

import {ColumnsDirective} from "./columns.directive";
import {ImageDirective} from "./img.directive";
import {ContentComponent} from "./content.component";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        SliderModule
    ],
    exports: [
        ContentComponent,
        BrowserModule,
        RouterModule
    ],
    declarations: [
        ContentComponent, ImageDirective, ColumnsDirective
    ]
})
export class ContentModule {

}
