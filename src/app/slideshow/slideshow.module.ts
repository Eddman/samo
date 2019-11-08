import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {SlideshowComponent} from './slideshow.component';
import {SwipeService} from './swipe.service';

@NgModule({
    imports     : [
        CommonModule,
        BrowserTransferStateModule
    ],
    declarations: [
        SlideshowComponent
    ],
    exports     : [
        SlideshowComponent
    ],
    providers   : [
        SwipeService
    ]

})
export class SlideshowModule {
}
