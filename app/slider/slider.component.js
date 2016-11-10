define(['module',
        'exports',
        '@angular/core',
        './slider.service'],
    function (module, exports, ngCore, sliderService) {
        'use strict';

        function SliderComponent(sliderService) {
            this.sliderService = sliderService;
        }

        //noinspection JSUnusedGlobalSymbols
        SliderComponent.prototype.ngOnChanges = function () {
            // Check if auto-slide is available
            if (this.route.configuration.autoSlide) {
                this.autoSlide = this.route.configuration.autoSlide;
            }

            // Pause previous sliding
            this.startAutoSlide(false);

            this.sliderService.getSlides({
                images: this.route.configuration.images
            }).then(function (slides) {
                this.pages = slides;
                this.pageNumber = 0;
                this.pageCount = this.pages.length;

                // Start sliding
                if (this.autoSlide) {
                    this.startAutoSlide();
                }
            }.bind(this));
        };

        SliderComponent.prototype.autoSlideFunction = function () {
            if (this.pageNumber < this.pageCount - 1) {
                // Move one slide forward
                this.pageNumber += 1;
            } else {
                // Move to front
                this.moveToFirst();
            }
        };

        SliderComponent.prototype.moveToFirst = function () {
            if (this.interval) {
                // Pause sliding
                this.startAutoSlide(false);

                // Speedup transitions
                this.transitionDuration /= 10;

                setTimeout(this.moveToFirst.bind(this), this.transitionDuration * 1.5);
            } else {
                this.pageNumber -= 1;
                if (this.pageNumber === 0) {
                    // Restart auto-slide
                    this.startAutoSlide();
                } else {
                    setTimeout(this.moveToFirst.bind(this), this.transitionDuration * 1.5);
                }
            }
        };

        SliderComponent.prototype.startAutoSlide = function (sliding) {
            if (this.autoSlide) {
                if (arguments.length === 0 || sliding) {
                    this.transitionDuration = this.route.configuration.duration || 500;
                    this.interval = setInterval(this.autoSlideFunction.bind(this), this.autoSlide + this.transitionDuration);
                } else {
                    clearInterval(this.interval);
                    delete this.interval;
                }
            } else {
                this.transitionDuration = this.route.configuration.duration || 500;
            }
        };

        //noinspection JSUnusedGlobalSymbols
        SliderComponent.prototype.ngOnDestroy = function () {
            // Pause sliding
            this.startAutoSlide(false);
        };

        SliderComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'slider-view',
                templateUrl: 'slider.component.html',
                styleUrls: ['slider.component.css'],
                inputs: ['route', 'keysEnabled']
            })
        ];
        SliderComponent.parameters = [[sliderService.SliderService]];

        exports.SliderComponent = SliderComponent;
    });