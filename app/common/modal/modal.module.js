"use strict";
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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var _modal_1 = require("@modal");
var modal_confirmation_component_1 = require("./modal.confirmation.component");
var modal_login_component_1 = require("./modal.login.component");
var ModalModule = (function () {
    function ModalModule() {
    }
    return ModalModule;
}());
ModalModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            _modal_1.ModalModule
        ],
        exports: [
            modal_confirmation_component_1.ModalConfirmationComponent,
            modal_login_component_1.ModalLoginComponent
        ],
        declarations: [
            modal_confirmation_component_1.ModalConfirmationComponent,
            modal_login_component_1.ModalLoginComponent
        ]
    }),
    __metadata("design:paramtypes", [])
], ModalModule);
exports.ModalModule = ModalModule;
