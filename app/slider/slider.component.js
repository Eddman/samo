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
            clearInterval(this.timeout);
            this.sliderService.getSlides({
                images: this.route.configuration.images
            }).then(function (slides) {
                this.pages = slides;
                this.pageNumber = 0;
                this.pageCount = this.pages.length;

                this.timeout = setInterval(function () {
                    this.pageNumber = (this.pageNumber + 1 ) % this.pageCount;
                }.bind(this), 3000);
            }.bind(this));
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