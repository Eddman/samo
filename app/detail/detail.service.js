define(['exports',
        '../abstract.http.service'],
    function (exports, httpService) {
        'use strict';

        function DetailService() {
            httpService.AbstractHttpService.apply(this, arguments);
        }

        exports.DetailService = httpService.inherit(DetailService, {
            getDetail: function (config) {
                var detailParams;
                if (config.parameters) {
                    detailParams = [];
                    Object.keys(config.type).forEach(function (i) {
                        detailParams.push(config.type[i]);
                    });
                    Object.keys(config.parameters).forEach(function (i) {
                        detailParams.push(config.parameters[i]);
                    });
                    return this.getWithCache('/app/mock/details/:0.json', [detailParams.join('/')]);
                } else {
                    return this.getWithCache('/app/mock/details/:0/:1.json', config.type);
                }
            }
        });
    });

