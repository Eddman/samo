define(['exports',],
    function (exports) {
        'use strict';

        function AbstractService() {
        }

        exports.AbstractService = AbstractService;
        exports.inherit = function (obj, prototype, parameters) {
            obj.prototype = Object.create(AbstractService.prototype);
            if (parameters) {
                obj.parameters = parameters;
            }
            if (prototype) {
                Object.keys(prototype).forEach(function (k) {
                    obj.prototype[k] = prototype[k];
                });
            }
            obj.prototype.constructor = obj;
            return obj;
        };
    });