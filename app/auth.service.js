define(['exports',
        './abstract.http.service'],
    function (exports, httpService) {
        'use strict';

        function AuthService(http) {
            httpService.AbstractHttpService.call(this, http);
        }

        exports.AuthService = httpService.inherit(AuthService, {});
    });
