import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {PageSliderModule} from 'ng2-page-slider-aot-fix/index'
import {KBPageSliderComponent} from 'ng2-page-slider-aot-fix/src/components/pageslider.component'

import {SliderService} from "./slider.service";
import {SliderComponent} from "./slider.component";

// Auto size heigth
Object.defineProperty(KBPageSliderComponent.prototype, "pageHeight", {
    get: function () {
        let fullHeight = this.element.nativeElement.offsetHeight;
        let chin = (this.showIndicator && !this.overlayIndicator) ? 20 : 0;
        if (!this.firstImage && this.renderer.collection) {
            this.firstImage = new Image();
            this.firstImage.onload = function () {
                this.Resize();
                this.renderer.Resize(this.pageWidth, this.pageHeight);
            }.bind(this);
            this.firstImage.src = this.renderer.collection[0].url;
        }
        else if (this.firstImage) {
            if (this.firstImage.width > this.element.nativeElement.offsetWidth) {
                this.element.nativeElement.style.height = (this.firstImage.height
                    * this.element.nativeElement.offsetWidth) / this.firstImage.width + 'px';
            }
            else {
                this.element.nativeElement.style.height = this.firstImage.height + 'px';
            }
            fullHeight = this.element.nativeElement.offsetHeight;
        }
        return fullHeight - chin;
    },
    enumerable: true,
    configurable: true
});

// Corrected buttons position
Object.defineProperty(KBPageSliderComponent.prototype, "buttonTop", {
    get: function () {
        return this.pageHeight / 2 - this.element.nativeElement.children[1].children[0].offsetHeight / 2 + "px";
    },
    enumerable: true,
    configurable: true
});

@NgModule({
    imports: [
        BrowserModule,
        PageSliderModule
    ],
    exports: [
        SliderComponent
    ],
    declarations: [
        SliderComponent
    ],
    providers: [
        SliderService
    ]
})
export class SliderModule {
}
