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
var auth_service_1 = require("../auth/auth.service");
var routing_service_1 = require("../routing/routing.service");
var abstract_component_1 = require("../abstract.component");
var loadedState = 'loaded';
exports.removedState = 'removed';
var ThumbnailComponent = (function (_super) {
    __extends(ThumbnailComponent, _super);
    function ThumbnailComponent(metaService, authService, routingService, router, activeRoute, el) {
        var _this = _super.call(this, metaService, authService, routingService, router, activeRoute, el) || this;
        _this.hover = false;
        _this.removeChange = new core_1.EventEmitter();
        _this.removedChange = new core_1.EventEmitter();
        return _this;
    }
    ThumbnailComponent.prototype.navigate = function () {
        if (this.hover && !this.isEdit) {
            this.router.navigate([this.thumbnail.parameter], { relativeTo: this.activeRoute });
        }
    };
    ThumbnailComponent.prototype.setHover = function () {
        setTimeout(function () {
            this.hover = true;
        }.bind(this), 100);
        return false;
    };
    ThumbnailComponent.prototype.unsetHover = function () {
        setTimeout(function () {
            this.hover = false;
        }.bind(this), 100);
        return false;
    };
    ThumbnailComponent.prototype.remove = function () {
        this.removeChange.emit(this.thumbnail);
    };
    ThumbnailComponent.prototype.removed = function (event) {
        if (event.toState === exports.removedState) {
            this.removedChange.emit(this.thumbnail);
        }
    };
    return ThumbnailComponent;
}(abstract_component_1.AbstractComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ThumbnailComponent.prototype, "thumbnail", void 0);
__decorate([
    core_1.Input(),
    core_1.Input(),
    __metadata("design:type", Boolean)
], ThumbnailComponent.prototype, "isEdit", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ThumbnailComponent.prototype, "removeChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ThumbnailComponent.prototype, "removedChange", void 0);
ThumbnailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'thumbnail',
        templateUrl: 'thumbnail.component.html',
        styleUrls: ['thumbnail.component.css'],
        host: {
            '[class.hover]': 'hover && thumbnail.state !== "' + exports.removedState + '"'
        },
        animations: [
            core_1.trigger('state', [
                core_1.state('*', core_1.style({
                    opacity: 0,
                    transform: 'scale(0)'
                })),
                core_1.state(loadedState, core_1.style({
                    opacity: 1,
                    transform: 'scale(1)'
                })),
                core_1.transition('* => ' + loadedState, core_1.animate('300ms ease')),
                core_1.transition(loadedState + ' => ' + exports.removedState, [
                    core_1.animate(600, core_1.keyframes([
                        core_1.style({
                            opacity: 1,
                            transform: 'scale(1.1)',
                            offset: 0.2
                        }),
                        core_1.style({
                            opacity: 1,
                            transform: 'scale(1.1) rotate(3deg)',
                            offset: 0.2
                        }),
                        core_1.style({
                            opacity: 1,
                            transform: 'scale(1.1) rotate(-3deg)',
                            offset: 0.35
                        }),
                        core_1.style({
                            opacity: 1,
                            transform: 'scale(1.1) rotate(3deg)',
                            offset: 0.5
                        }),
                        core_1.style({
                            opacity: 1,
                            transform: 'scale(1.1) rotate(-3deg)',
                            offset: 0.65
                        }),
                        core_1.style({
                            opacity: 0,
                            transform: 'scale(0) rotate(0)',
                            offset: 1
                        })
                    ]))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [index_1.MetaService,
        auth_service_1.AuthService,
        routing_service_1.RoutingService,
        router_1.Router,
        router_1.ActivatedRoute,
        core_1.ElementRef])
], ThumbnailComponent);
exports.ThumbnailComponent = ThumbnailComponent;
