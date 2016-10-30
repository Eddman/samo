define(['exports',
        '../mock/details.mock'],
    function (exports, mockDetails) {
        function DetailService() {
            this.details = mockDetails.details;
        }

        DetailService.prototype.getDetail = function (config) {
            var k, detailsTree = this.details[config.type][config.locale];
            if (config.parameters) {
                for (k in config.parameters) {
                    if (config.parameters.hasOwnProperty(k)) {
                        detailsTree = detailsTree[config.parameters[k]];
                    }
                }
            }
            return Promise.resolve(detailsTree);
        };

        exports.DetailService = DetailService;
    });
