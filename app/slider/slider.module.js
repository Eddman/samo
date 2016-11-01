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

        // Auto size heigth
        Object.defineProperty(ngSliderComponent.KBPageSliderComponent.prototype, "pageHeight", {
            get: function () {
                var fullHeight = this.element.nativeElement.offsetHeight;
                var chin = (this.showIndicator && !this.overlayIndicator) ? 20 : 0;
                if(!this.firstImage && this.renderer.collection) {
                    this.firstImage = new Image();
                    this.firstImage.onload = function() {
                        this.Resize();
                        this.renderer.Resize(this.pageWidth, this.pageHeight);
                    }.bind(this);
                    this.firstImage.src = this.renderer.collection[0].url;

                } else if(this.firstImage) {
                    this.element.nativeElement.style.height = (this.firstImage.height
                        * this.element.nativeElement.offsetWidth) / this.firstImage.width + 'px';
                    fullHeight = this.element.nativeElement.offsetHeight;
                }
                return fullHeight - chin;
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
