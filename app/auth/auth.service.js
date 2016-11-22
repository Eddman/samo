define(['exports',
        '../abstract.http.service',
        './storage.service',
        'rxjs/BehaviorSubject'],
    function (exports, httpService, storageService, behaviorSubject) {
        'use strict';

        var loginURL = '/login',
            logoutURL = '/logout';

        function AuthService(http, requestService, storage) {
            httpService.AbstractHttpService.apply(this, arguments);
            this.loggedIn = new behaviorSubject.BehaviorSubject(false);
            this.storage = storage;

            if (!!this.storage.getAuthToken()) {
                this.loggedIn.next(true);
            }
        }

        exports.AuthService = httpService.inherit(AuthService, {
            login: function (credentials) {
                this.storage.removeAuthToken();
                this.loggedIn.next(false);
                return this.post(loginURL, credentials, function (res) {
                    if (res.success) {
                        this.storage.setAuthToken(res.auth_token);
                        this.loggedIn.next(true);
                    }

                    return res.success;
                }.bind(this));
            },
            logout: function () {
                var request = this.post(logoutURL, {});
                this.storage.removeAuthToken();
                this.loggedIn.next(false);
                return request;
            },
            isLoggedIn: function () {
                return this.loggedIn.getValue();
            }
        }, [storageService.StorageService]);
    });
