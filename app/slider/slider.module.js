define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        'index',
        'src/components/pageslider.component',
        './slider.component',
        './slider.service'],
    function (exports, ngCore, ngBrowser, ngSlider, ngSliderComponent, sliderComponent, sliderService) {
        'use strict';

        // Fix for multiple animations fired
        //noinspection JSUnusedGlobalSymbols
        Object.defineProperty(ngSliderComponent.KBPageSliderComponent.prototype, "page", {
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

        function SliderModule() {
        }

        SliderModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    ngSlider.PageSliderModule
                ],
                exports: [
                    sliderComponent.SliderComponent
                ],
                declarations: [
                    sliderComponent.SliderComponent
                ],
                providers: [
                    sliderService.SliderService
                ]
            })
        ];

        exports.SliderModule = SliderModule;
    });
