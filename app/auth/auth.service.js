"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var abstract_http_service_1 = require("../abstract.http.service");
var request_service_1 = require("./request.service");
var storage_service_1 = require("./storage.service");
var loginURL = '/login', logoutURL = '/logout';
var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService(http, requestService) {
        var _this = _super.call(this, http, requestService) || this;
        _this.loggedIn = new rxjs_1.BehaviorSubject(false);
        //if (!!this.storage.getAuthToken()) {
        _this.loggedIn.next(true);
        return _this;
        //}
    }
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        storage_service_1.StorageService.removeAuthToken();
        this.loggedIn.next(false);
        return this.post(loginURL, credentials, function (res) {
            if (res.success) {
                storage_service_1.StorageService.setAuthToken(res.auth_token);
                _this.loggedIn.next(true);
            }
            return res.success;
        });
    };
    AuthService.prototype.logout = function () {
        var request = this.post(logoutURL, {});
        storage_service_1.StorageService.removeAuthToken();
        this.loggedIn.next(false);
        return request;
    };
    AuthService.prototype.isLoggedIn = function () {
        return this.loggedIn.getValue();
    };
    return AuthService;
}(abstract_http_service_1.AbstractHttpService));
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, request_service_1.RequestService])
], AuthService);
exports.AuthService = AuthService;
