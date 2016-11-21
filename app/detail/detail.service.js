define(['exports',
        '../abstract.http.service'],
    function (exports, httpService) {
        'use strict';

        var getURL = '/app/mock/details{params}.json'

        function DetailService() {
            httpService.AbstractHttpService.apply(this, arguments);
        }

        exports.DetailService = httpService.inherit(DetailService, {
            getDetail: function (config) {
                var detailParams = config.type.length, i, parameters = '';
                if (config.parameters) {
                    detailParams += config.parameters.length;
                }
                for (i = 0; i < detailParams; i += 1) {
                    parameters += '/:' + i;
                }
                return this.getWithCache(getURL.replace('{params}', parameters), config.type, config.parameters);
            }
        });
    });

