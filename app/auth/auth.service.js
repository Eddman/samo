define(['exports',
        '../abstract.http.service',
        './storage.service',
        'rxjs/BehaviorSubject'],
    function (exports, httpService, storageService, behaviorSubject) {
        'use strict';

        function AuthService(http, requestService, storage) {
            httpService.AbstractHttpService.apply(this, arguments);
            this.loggedIn = new behaviorSubject.BehaviorSubject(false);
            this.storage = storage;

            //if (!!this.storage.getAuthToken()) {
            this.loggedIn.next(true);
            //}
        }

        exports.AuthService = httpService.inherit(AuthService, {
            login: function (credentials) {
                return this.http
                    .post('/login', JSON.stringify(credentials), {headers: this.requestService.getJsonHeaders()})
                    .map(function (res) {
                        return res.json()
                    })
                    .map(function (res) {
                        if (res.success) {
                            this.storage.setAuthToken(res.auth_token);
                            this.loggedIn.next(true);
                        }

                        return res.success;
                    }.bind(this));
            },
            logout: function () {
                this.storage.removeAuthToken();
                this.loggedIn.next(false);
            },
            isLoggedIn: function () {
                return this.loggedIn.getValue();
            },
            getLoggedIn: function () {
                return this.loggedIn;
            }
        }, [storageService.StorageService]);
    });
