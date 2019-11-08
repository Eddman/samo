import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {KBPageSliderComponent, PageSliderModule} from 'ng2-page-slider';
import {SliderComponent} from './slider.component';

import {SliderService} from './slider.service';

// Auto size heigth
Object.defineProperty(KBPageSliderComponent.prototype, 'pageHeight', {
    get(this: KBPageSliderComponent) {
        const self: any = (this as any);
        const renderer: any = (this.renderer as any);
        let fullHeight = self.element.nativeElement.offsetHeight;
        const chin = (this.showIndicator && !this.overlayIndicator) ? 20 : 0;
        if (!self.firstImage && renderer.collection) {
            self.firstImage = new Image();
            self.firstImage.onload = () => {
                self.Resize();
                this.renderer.Resize(this.pageWidth, this.pageHeight);
            };
            self.firstImage.src = renderer.collection[0].url;
        } else if (self.firstImage) {
            if (self.firstImage.width > self.element.nativeElement.offsetWidth) {
                self.element.nativeElement.style.height = (self.firstImage.height
                    * self.element.nativeElement.offsetWidth) / self.firstImage.width + 'px';
            } else {
                self.element.nativeElement.style.height = self.firstImage.height + 'px';
            }
            fullHeight = self.element.nativeElement.offsetHeight;
        }
        return fullHeight - chin;
    },
    enumerable  : true,
    configurable: true
});

// Corrected buttons position
Object.defineProperty(KBPageSliderComponent.prototype, 'buttonTop', {
    get(this: KBPageSliderComponent) {
        return this.pageHeight / 2 - (this as any).element.nativeElement.children[1].children[0].offsetHeight / 2 + 'px';
    },
    enumerable  : true,
    configurable: true
});

@NgModule({
    imports     : [
        BrowserModule,
        PageSliderModule
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
