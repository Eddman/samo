define(['module',
        'exports',
        '@angular/core',
        'src/components/render.component',
        'src/components/pageslider.component',
        'src/components/navbutton.component',
        './slider.service'],
    function (module, exports, ngCore, ngSliderRender, ngSliderComponent, ngSliderButtons, sliderService) {
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
                this.pageNumber++;
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
                this.transitionDuration = this.transitionDuration / 10;
            }

            this.pageNumber--;
            if (this.pageNumber != 0) {
                setTimeout(this.moveToFirst.bind(this), this.transitionDuration * 1.5);
            } else {
                // Restart auto-slide
                this.startAutoSlide();
            }
        };

        SliderComponent.prototype.startAutoSlide = function (sliding) {
            if (this.autoSlide) {
                if (arguments.length == 0 || sliding) {
                    this.transitionDuration = this.route.configuration.duration || 500;
                    this.interval = setInterval(this.autoSlideFunction.bind(this), this.autoSlide + this.transitionDuration);
                } else {
                    clearInterval(this.interval);
                    delete this.interval;
                }
            }
        };

        SliderComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'slider-view',
                directives: [
                    ngSliderRender.KBPagesRendererDirective,
                    ngSliderComponent.KBPageSliderComponent,
                    ngSliderButtons.KBNavButtonComponent],
                templateUrl: 'slider.component.html',
                styleUrls: ['slider.component.css'],
                inputs: ['route']
            })
        ];
        SliderComponent.parameters = [[sliderService.SliderService]];

        exports.SliderComponent = SliderComponent;
    });