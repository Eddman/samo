define(['module',
        'exports',
        '../abstract.component',
        './slider.service'],
    function (module, exports, abstractComponent, sliderService) {
        'use strict';

        function SliderComponent(sliderService) {
            abstractComponent.AbstractComponent.apply(this, Array.prototype.slice.call(arguments, 1));
            this.sliderService = sliderService;
        }

        abstractComponent.inherit(SliderComponent, {
            ngOnChanges: function () {
                // Pause previous sliding
                this.startAutoSlide(false);

                this.sliderService.getSlides({
                    type: this.route.configuration.type
                }).then(function (slides) {
                    this.pages = slides.images;
                    this.pageNumber = 0;
                    this.pageCount = this.pages.length;

                    if (this.keysEnabled || slides.primary) {
                        if (!slides.primary) {
                            this.setSEODescription(slides.description);
                        }
                        if (slides && slides.images && slides.images.length) {
                            this.setSEOImage(slides.images[0].url);
                        } else {
                            this.setSEOImage();
                        }
                    }

                    this.defaultDuration = slides.duration;

                    // Check if auto-slide is available
                    if (slides.autoSlide) {
                        this.autoSlide = slides.autoSlide;
                    }

                    // Start sliding
                    if (this.autoSlide) {
                        this.startAutoSlide(true);
                    } else {
                        this.startAutoSlide(false);
                    }
                }.bind(this));
            },
            autoSlideFunction: function () {
                if (this.pageNumber < this.pageCount - 1) {
                    // Move one slide forward
                    this.pageNumber += 1;
                } else {
                    // Move to front
                    this.moveToFirst();
                }
            },
            moveToFirst: function () {
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
            },
            startAutoSlide: function (sliding) {
                if (this.autoSlide) {
                    if (arguments.length === 0 || sliding) {
                        this.transitionDuration = this.defaultDuration || 500;
                        this.interval = setInterval(this.autoSlideFunction.bind(this), this.autoSlide + this.transitionDuration);
                    } else {
                        clearInterval(this.interval);
                        delete this.interval;
                    }
                } else {
                    this.transitionDuration = this.defaultDuration || 500;
                }
            },
            ngOnDestroy: function () {
                // Pause sliding
                this.startAutoSlide(false);
            }
        }, [sliderService.SliderService]);

        exports.SliderComponent = abstractComponent.viewComponent(SliderComponent, module,
            'slider-view', 'slider.component', ['keysEnabled']);
    });