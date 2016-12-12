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
var router_1 = require("@angular/router");
var index_1 = require("@meta/index");
var abstract_view_component_1 = require("../abstract.view.component");
var routing_service_1 = require("../routing/routing.service");
var auth_service_1 = require("../auth/auth.service");
var detail_service_1 = require("./detail.service");
var DetailComponent = (function (_super) {
    __extends(DetailComponent, _super);
    function DetailComponent(detailService, metaService, authService, routingService, router, route, el) {
        var _this = _super.call(this, metaService, authService, routingService, router, route, el) || this;
        _this.detailService = detailService;
        return _this;
    }
    DetailComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.detailService.getDetail(this.route.configuration.type, this.route.parameters).then(function (detail) {
            var desc;
            _this.detail = detail;
            _this.setSEODescription();
            _this.setSEOImage();
            if (detail) {
                if (detail.title) {
                    desc = detail.title;
                }
                if (detail.header) {
                    if (desc) {
                        desc += ", ";
                    }
                    else {
                        desc = '';
                    }
                    desc += detail.header.pageTitle;
                    desc += ", ";
                    desc += detail.header.content.replace(new RegExp('\n', 'g'), ', ');
                }
                if (_this.detail.content) {
                    desc = _this.getDescriptionFromContent(desc, _this.detail.content);
                }
                _this.setSEODescription(desc);
                _this.setSEOImage(_this.getFirstImageFromContent(_this.detail.content));
                _this.headerChange.emit(_this.detail.header);
            }
        });
    };
    return DetailComponent;
}(abstract_view_component_1.AbstractViewComponent));
DetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'detail-view',
        templateUrl: 'detail.component.html',
        styleUrls: ['detail.component.css']
    }),
    __metadata("design:paramtypes", [detail_service_1.DetailService,
        index_1.MetaService,
        auth_service_1.AuthService,
        routing_service_1.RoutingService,
        router_1.Router,
        router_1.ActivatedRoute,
        core_1.ElementRef])
], DetailComponent);
exports.DetailComponent = DetailComponent;
