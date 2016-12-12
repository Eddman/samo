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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_dragula_1 = require("@dragula/ng2-dragula");
var modal_module_1 = require("../common/modal/modal.module");
var menu_component_1 = require("./menu.component");
var item_editor_component_1 = require("./item.editor.component");
var MenuModule = (function () {
    function MenuModule() {
    }
    return MenuModule;
}());
MenuModule = __decorate([
    core_1.NgModule({
        imports: [
            ng2_dragula_1.DragulaModule,
            platform_browser_1.BrowserModule,
            router_1.RouterModule,
            forms_1.FormsModule,
            modal_module_1.ModalModule
        ],
        exports: [
            menu_component_1.MenuComponent
        ],
        declarations: [
            menu_component_1.MenuComponent,
            item_editor_component_1.MenuItemEditorComponent
        ]
    }),
    __metadata("design:paramtypes", [])
], MenuModule);
exports.MenuModule = MenuModule;
