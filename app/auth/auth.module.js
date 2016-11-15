define(['exports',
        '@angular/core',
        './auth.service',
        './storage.service',
        './request.service'],
    function (exports, ngCore, authService, storageService, requestService) {
        'use strict';

        function AuthModule() {
        }

        AuthModule.annotations = [
            new ngCore.NgModule({
                providers: [
                    authService.AuthService,
                    storageService.StorageService,
                    requestService.RequestService
                ]
            })
        ];

        exports.AuthModule = AuthModule;
    });
