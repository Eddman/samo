import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SlideshowModule} from '../slideshow/slideshow.module';
import {SliderComponent} from './slider.component';
import {SliderService} from './slider.service';

@NgModule({
    imports     : [
        CommonModule,
        SlideshowModule
    ],
    exports     : [
        SliderComponent
    ],
    declarations: [
        SliderComponent
    ],
    providers   : [
        SliderService
    ]
})
export class SliderModule {
}
