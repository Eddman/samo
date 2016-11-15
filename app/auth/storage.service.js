define(['exports',
        '../abstract.service'],
    function (exports, abstractService) {
        'use strict';

        var STORAGE_KEY = 'auth_token';

        function StorageService() {
            abstractService.AbstractService.call(this);
        }

        exports.StorageService = abstractService.inherit(StorageService, {
            getAuthToken: function () {
                return localStorage.getItem(STORAGE_KEY);
            },
            setAuthToken: function (token) {
                localStorage.setItem(STORAGE_KEY, token);
            },
            removeAuthToken: function () {
                localStorage.removeItem(STORAGE_KEY);
            }
        });
    });
