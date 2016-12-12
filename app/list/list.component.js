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
var list_service_1 = require("./list.service");
var ListComponent = (function (_super) {
    __extends(ListComponent, _super);
    function ListComponent(listService, metaService, authService, routingService, router, route, el) {
        var _this = _super.call(this, metaService, authService, routingService, router, route, el) || this;
        _this.listService = listService;
        return _this;
    }
    ListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.listService.getListItems(this.route.configuration.type).then(function (listItems) {
            var desc;
            _this.listItems = listItems;
            _this.setSEODescription();
            _this.setSEOImage();
            if (_this.listItems && _this.listItems.length) {
                Object.keys(_this.listItems).find(function (i) {
                    if (_this.listItems[i].title) {
                        desc = _this.listItems[i].title;
                    }
                    if (_this.listItems[i].content) {
                        desc = _this.getDescriptionFromContent(desc, _this.listItems[i].content);
                    }
                    return desc && desc.length >= 250;
                });
                _this.setSEODescription(desc);
                Object.keys(_this.listItems).find(function (i) {
                    var img;
                    if (_this.listItems[i].content) {
                        img = _this.getFirstImageFromContent(_this.listItems[i].content);
                        if (img) {
                            _this.setSEOImage(img);
                            return true;
                        }
                    }
                    return false;
                });
            }
        });
    };
    return ListComponent;
}(abstract_view_component_1.AbstractViewComponent));
ListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'list-view',
        templateUrl: 'list.component.html',
        styleUrls: ['list.component.css']
    }),
    __metadata("design:paramtypes", [list_service_1.ListService,
        index_1.MetaService,
        auth_service_1.AuthService,
        routing_service_1.RoutingService,
        router_1.Router,
        router_1.ActivatedRoute,
        core_1.ElementRef])
], ListComponent);
exports.ListComponent = ListComponent;
