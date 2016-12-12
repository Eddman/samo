"use strict";
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
var defaultURL = window.location.origin;
var AbstractHttpService = (function () {
    function AbstractHttpService(http, requestService) {
        this.http = http;
        this.requestService = requestService;
        this.cache = {};
    }
    AbstractHttpService.prototype.constructURL = function (templateURL, params, subParams) {
        var resourceURL = templateURL;
        var index = 0;
        if (params) {
            Object.keys(params).forEach(function (i) {
                resourceURL = resourceURL.replace(':' + index, params[i]);
                index += 1;
            });
        }
        if (subParams) {
            Object.keys(subParams).forEach(function (i) {
                resourceURL = resourceURL.replace(':' + index, subParams[i]);
                index += 1;
            });
        }
        return defaultURL + resourceURL;
    };
    AbstractHttpService.prototype.getRequestOptions = function () {
        return new http_1.RequestOptions({
            headers: this.requestService.getAuthHeaders()
        });
    };
    AbstractHttpService.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    AbstractHttpService.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg, err, body;
        if (error.status === 401) {
            // Not logged in - login first
            return Observable_1.Observable.throw(error.status);
        }
        else {
            if (error instanceof http_1.Response) {
                //noinspection UnusedCatchParameterJS
                try {
                    body = error.json() || '';
                    err = body.error || JSON.stringify(body);
                }
                catch (e) {
                    err = error.text();
                }
                errMsg = error.status + ' - ' + (error.statusText || '') + ' ' + err;
            }
            else {
                errMsg = error.message || error.toString();
            }
            if (window.console) {
                window.console.error(errMsg);
            }
            return Observable_1.Observable.throw(errMsg);
        }
    };
    AbstractHttpService.prototype.get = function (resourceURL, mapFunction) {
        var request = this.http.get(resourceURL, this.getRequestOptions())
            .map(AbstractHttpService.extractData);
        if (mapFunction) {
            request.map(mapFunction);
        }
        return request.catch(AbstractHttpService.handleError);
    };
    AbstractHttpService.prototype.post = function (resourceURL, data, mapFunction) {
        var request = this.http.post(resourceURL, JSON.stringify(data), this.getRequestOptions())
            .map(AbstractHttpService.extractData);
        if (mapFunction) {
            request.map(mapFunction);
        }
        return request.catch(AbstractHttpService.handleError);
    };
    AbstractHttpService.prototype.getWithCache = function (resourceURLTemplate, params, subParams) {
        var _this = this;
        var resourceURL = this.constructURL(resourceURLTemplate, params, subParams);
        if (!this.getCache(params, subParams)) {
            return new Promise(function (resolve, reject) {
                _this.get(resourceURL).subscribe(function (data) {
                    _this.setCache(data, params, subParams);
                    resolve(data);
                }, reject);
            });
        }
        return Promise.resolve(this.getCache(params, subParams));
    };
    AbstractHttpService.prototype.getCache = function (params, subParams) {
        return this.findCache(params, subParams).value;
    };
    AbstractHttpService.prototype.setCache = function (data, params, subParams) {
        this.findCache(params, subParams).value = data;
    };
    AbstractHttpService.prototype.clearCache = function (params, subParams) {
        var cache = this.findCache(params, subParams);
        Object.keys(cache).forEach(function (k) {
            delete cache[k];
        });
    };
    AbstractHttpService.prototype.findCache = function (params, subParams) {
        var cache = this.cache;
        if (params) {
            Object.keys(params).forEach(function (i) {
                if (!cache[params[i]]) {
                    cache[params[i]] = {};
                }
                cache = cache[params[i]];
            });
        }
        if (subParams) {
            Object.keys(subParams).forEach(function (i) {
                if (!cache[subParams[i]]) {
                    cache[subParams[i]] = {};
                }
                cache = cache[subParams[i]];
            });
        }
        return cache;
    };
    return AbstractHttpService;
}());
exports.AbstractHttpService = AbstractHttpService;
