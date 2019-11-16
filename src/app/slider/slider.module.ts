import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgPageSliderModule} from '@netocny/ng-page-slider';
import {SliderComponent} from './slider.component';
import {SliderService} from './slider.service';

@NgModule({
    imports     : [
        CommonModule,
        NgPageSliderModule
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
