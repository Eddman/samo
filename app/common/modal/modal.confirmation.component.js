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
var auth_service_1 = require('../../auth/auth.service');
var abstract_component_1 = require('../../abstract.component');
var routing_service_1 = require('../../routing/routing.service');
var ModalConfirmationComponent = (function (_super) {
    __extends(ModalConfirmationComponent, _super);
    function ModalConfirmationComponent(metaService, authService, routingService, router, route, el) {
        _super.call(this, metaService, authService, routingService, router, route, el);
        this.yes = new core_1.EventEmitter();
        this.no = new core_1.EventEmitter();
    }
    ModalConfirmationComponent.prototype.open = function () {
        this.modal.open();
    };
    ModalConfirmationComponent.prototype.yesClick = function () {
        this.yes.emit();
        this.modal.close();
    };
    ModalConfirmationComponent.prototype.noClick = function () {
        this.no.emit();
        this.modal.close();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ModalConfirmationComponent.prototype, "yes", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ModalConfirmationComponent.prototype, "no", void 0);
    __decorate([
        core_1.ViewChild(_modal_1.Modal), 
        __metadata('design:type', _modal_1.Modal)
    ], ModalConfirmationComponent.prototype, "modal", void 0);
    ModalConfirmationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'modal-confirm',
            templateUrl: 'modal.confirmation.component.html'
        }), 
        __metadata('design:paramtypes', [index_1.MetaService, auth_service_1.AuthService, routing_service_1.RoutingService, router_1.Router, router_1.ActivatedRoute, core_1.ElementRef])
    ], ModalConfirmationComponent);
    return ModalConfirmationComponent;
}(abstract_component_1.AbstractComponent));
exports.ModalConfirmationComponent = ModalConfirmationComponent;
