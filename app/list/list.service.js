define(['exports',
        '../abstract.http.service'],
    function (exports, httpService) {
        'use strict';

        function ListService() {
            httpService.AbstractHttpService.apply(this, arguments);
        }

        exports.ListService = httpService.inherit(ListService, {
            getListItems: function (config) {
                return this.getWithCache('/app/mock/list/:0/:1.json', config.type);
            }
        });
    });
