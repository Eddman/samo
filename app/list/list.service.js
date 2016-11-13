define(['exports',
        '../abstract.http.service'],
    function (exports, httpService) {
        'use strict';

        function ListService(http) {
            httpService.AbstractHttpService.call(this, http);
        }

        httpService.inherit(ListService);

        ListService.prototype.getListItems = function (config) {
            return this.getWithCache('/app/mock/list/:0/:1.json', config.type);
        };

        exports.ListService = ListService;
    });
