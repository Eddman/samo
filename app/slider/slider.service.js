define(['exports',
        '../mock/slider.mock'],
    function (exports, mockSlides) {
        'use strict';

        function SliderService() {
            this.slides = mockSlides.slides;
        }

        SliderService.prototype.getSlides = function (config) {
            //noinspection AmdModulesDependencies
            return Promise.resolve(this.slides[config.images]);
        };

        exports.SliderService = SliderService;
    });
