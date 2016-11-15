define(['exports',
        '../abstract.http.service'],
    function (exports, httpService) {
        'use strict';

        function SliderService() {
            httpService.AbstractHttpService.apply(this, arguments);
        }

        exports.SliderService = httpService.inherit(SliderService, {
            getSlides: function (config) {
                return this.getWithCache('/app/mock/slides/:0.json', [config.images]);
            }
        });
    });
