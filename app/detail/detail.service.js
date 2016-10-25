define(['exports',
        '@angular/core',
        '../mock/details.mock'],
    function (exports, ngCore, mockDetails) {
        function DetailService() {
            this.details = mockDetails.details;
        }

        DetailService.prototype.getDetail = function (config) {
            var k, detailsTree = this.details[config.type][config.locale];
            if (config.params) {
                for (k in config.params) {
                    if(config.params.hasOwnProperty(k)) {
                        detailsTree = detailsTree[config.params[k]];
                    }
                }
            }
            return Promise.resolve(detailsTree);
        };

        exports.DetailService = DetailService;
    });
