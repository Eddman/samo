define(['exports',
        '@angular/http',
        '../abstract.service',
        './storage.service'],
    function (exports, ngHttp, abstractService, storageService) {
        'use strict';

        function RequestService(storage) {
            abstractService.AbstractService.call(this);
            this.storage = storage;
        }

        exports.RequestService = abstractService.inherit(RequestService, {
            getAuthHeaders: function () {
                var headers = this.getJsonHeaders(),
                    authToken = this.storage.getAuthToken();

                if (authToken) {
                    headers.append('Authorization', 'Bearer ' + authToken);
                }
                return headers;
            },
            getJsonHeaders: function () {
                var headers = new ngHttp.Headers();
                headers.append('Accept', 'application/json');
                headers.append('Content-Type', 'application/json');
                return headers;
            }
        }, [storageService.StorageService]);
    });
