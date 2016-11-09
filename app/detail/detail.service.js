define(['exports',
        '../mock/details.mock'],
    function (exports, mockDetails) {
        'use strict';

        function DetailService() {
            this.details = mockDetails.details;
        }

        DetailService.prototype.getDetail = function (config) {
            var detailsTree = this.details;
            Object.keys(config.type).forEach(function (i) {
                detailsTree = detailsTree[config.type[i]];
            });
            if (config.parameters) {
                Object.keys(config.parameters).forEach(function (k) {
                    detailsTree = detailsTree[config.parameters[k]];
                });
            }
            //noinspection AmdModulesDependencies
            return Promise.resolve(detailsTree);
        };

        exports.DetailService = DetailService;
    });
