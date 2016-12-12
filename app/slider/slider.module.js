"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("index");
var pageslider_component_1 = require("src/components/pageslider.component");
var slider_service_1 = require("./slider.service");
var slider_component_1 = require("./slider.component");
// Fix for multiple animations fired
Object.defineProperty(pageslider_component_1.KBPageSliderComponent.prototype, "page", {
    get: function () {
        return (this.renderer) ? this.renderer.page : 0;
    },
    // PUBLIC INTERFACE =====================================================================
    set: function (pn) {
        if (pn < 0 || pn >= this.pageCount) {
            return;
        }
        if (pn === this.renderer.page) {
            return;
        }
        if (this.renderer) {
            if (pn === this.renderer.page + 1) {
                if (this.blockInteraction) {
                    this.pageChange.emit(this.page);
                    return;
                }
                this.AnimateToNextPage();
            }
            else if (pn === this.renderer.page - 1) {
                if (this.blockInteraction) {
                    this.pageChange.emit(this.page);
                    return;
                }
                this.AnimateToPreviousPage();
            }
            else {
                if (this.blockInteraction) {
                    this.pageChange.emit(this.page);
                    return;
                }
                this.renderer.page = pn;
                this.pageChange.emit(pn);
            }
        }
    },
    enumerable: true,
    configurable: true
});
// Auto size heigth
Object.defineProperty(pageslider_component_1.KBPageSliderComponent.prototype, "pageHeight", {
    get: function () {
        var fullHeight = this.element.nativeElement.offsetHeight;
        var chin = (this.showIndicator && !this.overlayIndicator) ? 20 : 0;
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
Object.defineProperty(pageslider_component_1.KBPageSliderComponent.prototype, "buttonTop", {
    get: function () {
        return this.pageHeight / 2 - this.element.nativeElement.children[1].children[0].offsetHeight / 2 + "px";
    },
    enumerable: true,
    configurable: true
});
var SliderModule = (function () {
    function SliderModule() {
    }
    return SliderModule;
}());
SliderModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            index_1.PageSliderModule
        ],
        exports: [
            slider_component_1.SliderComponent
        ],
        declarations: [
            slider_component_1.SliderComponent
        ],
        providers: [
            slider_service_1.SliderService
        ]
    }),
    __metadata("design:paramtypes", [])
], SliderModule);
exports.SliderModule = SliderModule;
