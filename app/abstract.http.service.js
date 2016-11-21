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
            constructURL: function (resourceURL, params, subParams) {
                var index = 0;
                if (params) {
                    Object.keys(params).forEach(function (i) {
                        resourceURL = resourceURL.replace(':' + index++, params[i]);
                    });
                }
                if (subParams) {
                    Object.keys(subParams).forEach(function (i) {
                        resourceURL = resourceURL.replace(':' + index++, subParams[i]);
                    });
                }
                return resourceURL;
            },
            getRequestOptions: function () {
                return new ngHttp.RequestOptions({
                    headers: this.requestService.getAuthHeaders()
                });
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
                    errMsg = error.message || error.toString();
                }
                if (window.console) {
                    window.console.error(errMsg);
                }
                return observable.Observable.throw(errMsg);
            },
            get: function (resourceURL, mapFunction) {
                var request = this.http.get(resourceURL, this.getRequestOptions())
                    .map(this.extractData);
                if (mapFunction) {
                    request.map(mapFunction);
                }
                return request.catch(this.handleError);
            },
            post: function (resourceURL, data, mapFunction) {
                var request = this.http.post(resourceURL, JSON.stringify(data), this.getRequestOptions())
                    .map(this.extractData);
                if (mapFunction) {
                    request.map(mapFunction);
                }
                return request.catch(this.handleError);
            },
            getWithCache: function (resourceURLTemplate, params, subParams) {
                var resourceURL = this.constructURL(resourceURLTemplate, params, subParams);
                if (!this.getCache(params, subParams)) {
                    return new Promise(function (resolve, reject) {
                        this.get(resourceURL).subscribe(
                            function (data) {
                                this.setCache(params, subParams, data);
                                resolve(data);
                            }.bind(this), reject);
                    }.bind(this));
                }
                return Promise.resolve(this.getCache(params, subParams));
            },
            getCache: function (params, subParams) {
                return this.findCache(params, subParams).value;
            },
            setCache: function (params, subParams, data) {
                return this.findCache(params, subParams).value = data;
            },
            clearCache: function (params, subParams) {
                var cache = this.findCache(params, subParams);
                Object.keys(cache).forEach(function(k) {
                    delete cache[k];
                });
            },
            findCache: function (params, subParams) {
                var cache = this.cache;
                if (params) {
                    Object.keys(params).forEach(function (i) {
                        if(!cache[params[i]]) {
                            cache[params[i]] = {};
                        }
                        cache =  cache[params[i]];
                    });
                }
                if (subParams) {
                    Object.keys(subParams).forEach(function (i) {
                        if(!cache[subParams[i]]) {
                            cache[subParams[i]] = {};
                        }
                        cache =  cache[subParams[i]];
                    });
                }
                return cache;
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