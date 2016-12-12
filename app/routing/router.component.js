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
var abstract_component_1 = require("../abstract.component");
var auth_service_1 = require("../auth/auth.service");
var routing_service_1 = require("./routing.service");
var RouterComponent = (function (_super) {
    __extends(RouterComponent, _super);
    function RouterComponent(metaService, authService, routingService, router, activeRoute, el) {
        return _super.call(this, metaService, authService, routingService, router, activeRoute, el) || this;
    }
    RouterComponent.prototype.ngOnInit = function () {
        this.activeRoute.params.forEach(this.processRoute.bind(this));
    };
    RouterComponent.prototype.processRoute = function (pathParams) {
        var _this = this;
        var params = [];
        Object.keys(pathParams).forEach(function (p) {
            params.push(pathParams[p]);
        });
        this.routingService.getRouteConfig(params).then(function (route) {
            _this.config = route;
            _this.routingService.selectedRoute = route;
            _this.routingService.selectedRoutePathParams = params;
            if (route.redirectPath) {
                _this.router.navigate([route.redirectPath], { relativeTo: _this.activeRoute });
            }
        }, function () {
            _this.router.navigate(['/']);
        });
    };
    RouterComponent.prototype.processHeader = function (header) {
        this.config.additionalHeader = header;
    };
    return RouterComponent;
}(abstract_component_1.AbstractComponent));
RouterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'router',
        templateUrl: 'router.component.html',
        styleUrls: ['router.component.css']
    }),
    __metadata("design:paramtypes", [index_1.MetaService,
        auth_service_1.AuthService,
        routing_service_1.RoutingService,
        router_1.Router,
        router_1.ActivatedRoute,
        core_1.ElementRef])
], RouterComponent);
exports.RouterComponent = RouterComponent;
