define(['exports',
        '../mock/slider.mock'],
    function (exports, mockSlides) {
        function SliderService() {
            this.slides = mockSlides.slides;
        }

        SliderService.prototype.getSlides = function (config) {
            return Promise.resolve(this.slides[config.images]);
        };

        exports.SliderService = SliderService;
    });
