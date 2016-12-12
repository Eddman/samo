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
var abstract_http_service_1 = require("../abstract.http.service");
var request_service_1 = require("../auth/request.service");
var detail_service_1 = require("../detail/detail.service");
var getURL = '/app/mock/:0/:1.json', // TODO change after a BE is available
postURL = '/projects/:0/:1/save';
var ProjectsService = (function (_super) {
    __extends(ProjectsService, _super);
    function ProjectsService(http, requestService, detailService) {
        var _this = _super.call(this, http, requestService) || this;
        _this.detailService = detailService;
        return _this;
    }
    ProjectsService.prototype.getProject = function (type) {
        return this.getWithCache(getURL, type);
    };
    ProjectsService.prototype.saveProjects = function (type, projects) {
        var _this = this;
        var resourceURL = this.constructURL(postURL, type);
        return new Promise(function (resolve, reject) {
            _this.post(resourceURL, { data: projects }).subscribe(function (data) {
                _this.setCache(data, type);
                _this.detailService.clearCache(type);
                resolve(data);
            }, reject);
        });
    };
    return ProjectsService;
}(abstract_http_service_1.AbstractHttpService));
ProjectsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, request_service_1.RequestService, detail_service_1.DetailService])
], ProjectsService);
exports.ProjectsService = ProjectsService;
