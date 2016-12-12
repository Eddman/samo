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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var _modal_1 = require('@modal');
var index_1 = require('@meta/index');
var modal_confirmation_component_1 = require('./modal.confirmation.component');
var auth_service_1 = require('../../auth/auth.service');
var abstract_component_1 = require('../../abstract.component');
var routing_service_1 = require('../../routing/routing.service');
var ModalLoginComponent = (function (_super) {
    __extends(ModalLoginComponent, _super);
    function ModalLoginComponent(metaService, authService, routingService, router, route, el) {
        _super.call(this, metaService, authService, routingService, router, route, el);
        this.login = new core_1.EventEmitter();
        this.cancel = new core_1.EventEmitter();
    }
    ModalLoginComponent.prototype.open = function () {
        this.loginComponent.open();
    };
    ModalLoginComponent.prototype.loginClick = function () {
        var _this = this;
        this.loggingIn = true;
        delete this.error;
        this.authService.login({
            user: this.username,
            password: this.password
        }).subscribe(function (success) {
            if (success) {
                _this.login.emit();
            }
            _this.loggingIn = false;
        }, function (err) {
            _this.error = err;
            _this.loggingIn = false;
        });
    };
    ModalLoginComponent.prototype.cancelClick = function () {
        this.loginComponent.close();
        this.cancelConfirmation.open();
    };
    ModalLoginComponent.prototype.confirmCancelation = function () {
        this.cancel.emit();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ModalLoginComponent.prototype, "login", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ModalLoginComponent.prototype, "cancel", void 0);
    __decorate([
        core_1.ViewChild(_modal_1.Modal), 
        __metadata('design:type', _modal_1.Modal)
    ], ModalLoginComponent.prototype, "loginComponent", void 0);
    __decorate([
        core_1.ViewChild(modal_confirmation_component_1.ModalConfirmationComponent), 
        __metadata('design:type', modal_confirmation_component_1.ModalConfirmationComponent)
    ], ModalLoginComponent.prototype, "cancelConfirmation", void 0);
    ModalLoginComponent = __decorate([
        abstract_component_1.IComponent({
            moduleId: module.id,
            selector: 'modal-login',
            templateUrl: 'modal.login.component.html'
        }), 
        __metadata('design:paramtypes', [index_1.MetaService, auth_service_1.AuthService, routing_service_1.RoutingService, router_1.Router, router_1.ActivatedRoute, core_1.ElementRef])
    ], ModalLoginComponent);
    return ModalLoginComponent;
}(abstract_component_1.AbstractComponent));
exports.ModalLoginComponent = ModalLoginComponent;
