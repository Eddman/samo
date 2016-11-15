define(['exports',
        './abstract.service',
        '@angular/http',
        './auth/request.service',
        'rxjs/Observable',
        'rxjs/add/operator/catch',
        'rxjs/add/observable/throw',
        'rxjs/add/operator/map'],
    function (exports, abstractService, ngHttp, requestService, observable) {
        'use strict';


        function AbstractHttpService(http, requestService) {
            abstractService.AbstractService.apply(this, arguments);
            this.http = http;
            this.requestService = requestService;
            this.cache = {};
        }

        exports.AbstractHttpService = abstractService.inherit(AbstractHttpService, {
            getWithCache: function (resourceURL, params) {
                if (params) {
                    Object.keys(params).forEach(function (i) {
                        resourceURL = resourceURL.replace(':' + i, params[i]);
                    });
                }
                if (!this.cache[resourceURL]) {
                    //noinspection AmdModulesDependencies
                    return new Promise(function (resolve, reject) {
                        this.http.get(resourceURL, {headers: this.requestService.getAuthHeaders()})
                            .map(this.extractData)
                            .catch(this.handleError).subscribe(
                            function (data) {
                                this.cache[resourceURL] = data;
                                resolve(data);
                            }.bind(this),
                            reject
                        );
                    }.bind(this));
                }
                //noinspection AmdModulesDependencies
                return Promise.resolve(this.cache[resourceURL]);
            },
            extractData: function (res) {
                var body = res.json();
                return body.data || {};
            },
            handleError: function (error) {
                // In a real world app, we might use a remote logging infrastructure
                var errMsg, err, body;
                if (error instanceof ngHttp.Response) {
                    body = error.json() || '';
                    err = body.error || JSON.stringify(body);
                    errMsg = error.status + ' - ' + (error.statusText || '') + err;
                } else {
                    errMsg = error.message ? error.message : error.toString();
                }
                console.error(errMsg);
                return observable.Observable.throw(errMsg);
            }
        });

        exports.inherit = function (obj, prototype, additionalParameters) {
            obj.parameters = [ngHttp.Http, requestService.RequestService];
            if (additionalParameters) {
                obj.parameters = obj.parameters.concat(additionalParameters);
            }
            obj.prototype = Object.create(AbstractHttpService.prototype);
            if (prototype) {
                Object.keys(prototype).forEach(function (k) {
                    obj.prototype[k] = prototype[k];
                });
            }
            obj.prototype.constructor = obj;
            return obj;
        };
    });