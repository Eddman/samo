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
var router_1 = require("@angular/router");
var slider_module_1 = require("../slider/slider.module");
var projects_module_1 = require("../projects/projects.module");
var detail_module_1 = require("../detail/detail.module");
var list_module_1 = require("../list/list.module");
var router_component_1 = require("./router.component");
var i, path = '';
var routes = [];
routes.push({
    path: path,
    component: router_component_1.RouterComponent
});
for (i = 0; i <= 3; i += 1) {
    path += ':p' + i;
    routes.push({
        path: path,
        pathMatch: 'full',
        component: router_component_1.RouterComponent
    });
    path += '/';
}
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(routes),
            slider_module_1.SliderModule,
            projects_module_1.ProjectsModule,
            detail_module_1.DetailModule,
            list_module_1.ListModule
        ],
        exports: [router_1.RouterModule],
        declarations: [router_component_1.RouterComponent]
    }),
    __metadata("design:paramtypes", [])
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
