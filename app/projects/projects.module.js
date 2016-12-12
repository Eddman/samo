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
var ng2_dragula_1 = require("@dragula/ng2-dragula");
var modal_module_1 = require("../common/modal/modal.module");
var detail_module_1 = require("../detail/detail.module");
var projects_service_1 = require("./projects.service");
var thumbnail_component_1 = require("./thumbnail.component");
var projects_component_1 = require("./projects.component");
var ProjectsModule = (function () {
    function ProjectsModule() {
    }
    return ProjectsModule;
}());
ProjectsModule = __decorate([
    core_1.NgModule({
        imports: [
            ng2_dragula_1.DragulaModule,
            detail_module_1.DetailModule,
            modal_module_1.ModalModule
        ],
        exports: [
            projects_component_1.ProjectsComponent
        ],
        declarations: [
            projects_component_1.ProjectsComponent,
            thumbnail_component_1.ThumbnailComponent
        ],
        providers: [projects_service_1.ProjectsService]
    }),
    __metadata("design:paramtypes", [])
], ProjectsModule);
exports.ProjectsModule = ProjectsModule;
