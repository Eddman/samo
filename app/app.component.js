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
var abstract_component_1 = require("./abstract.component");
var auth_service_1 = require("./auth/auth.service");
var routing_service_1 = require("./routing/routing.service");
var AppComponent = (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent(metaService, authService, routingService, router, route, el) {
        return _super.call(this, metaService, authService, routingService, router, route, el) || this;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.active = true;
    };
    AppComponent.prototype.deactivateRouter = function (deactivate) {
        var resolved;
        if (this.active !== deactivate) {
            return;
        }
        this.active = !deactivate;
        if (deactivate) {
            this.previousRoute = this.routerOutlet.activatedRoute;
            this.routerOutlet.deactivate();
        }
        else if (this.previousRoute) {
            resolved = [
                {
                    provide: router_1.ActivatedRoute,
                    useValue: this.previousRoute
                },
                {
                    provide: router_1.RouterOutletMap,
                    useValue: this.routerOutlet.outletMap
                }
            ];
            this.routerOutlet.activate(this.previousRoute, this.routerOutlet.resolver, this.routerOutlet.locationInjector, core_1.ReflectiveInjector.resolve(resolved), this.routerOutlet.outletMap);
        }
    };
    return AppComponent;
}(abstract_component_1.AbstractComponent));
__decorate([
    core_1.ViewChild(router_1.RouterOutlet),
    __metadata("design:type", router_1.RouterOutlet)
], AppComponent.prototype, "routerOutlet", void 0);
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'samuel-netocny',
        templateUrl: 'app.component.html',
        styleUrls: ['app.component.css']
    }),
    __metadata("design:paramtypes", [index_1.MetaService,
        auth_service_1.AuthService,
        routing_service_1.RoutingService,
        router_1.Router,
        router_1.ActivatedRoute,
        core_1.ElementRef])
], AppComponent);
exports.AppComponent = AppComponent;
