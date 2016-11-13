define(['exports',
        '../abstract.http.service'],
    function (exports, httpService) {
        'use strict';

        function SliderService(http) {
            httpService.AbstractHttpService.call(this, http);
        }

        httpService.inherit(SliderService);

        SliderService.prototype.getSlides = function (config) {
            return this.getWithCache('/app/mock/slides/:0.json', [config.images]);
        };

        exports.SliderService = SliderService;
    });
