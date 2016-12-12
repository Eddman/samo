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
var index_1 = require("@meta/index");
var auth_service_1 = require("./auth/auth.service");
var routing_service_1 = require("./routing/routing.service");
var content_1 = require("./content/content");
var AbstractComponent = (function () {
    function AbstractComponent(metaService, authService, routingService, router, activeRoute, el) {
        this.metaService = metaService;
        this.authService = authService;
        this.routingService = routingService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.isEdit = false;
        this.el = el.nativeElement;
    }
    AbstractComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    AbstractComponent.prototype.getDescriptionFromContent = function (desc, content) {
        var description = desc;
        if (content) {
            if (description) {
                description += '\n';
            }
            else {
                description = '';
            }
            Object.keys(content).forEach(function (k) {
                if (content[k].type === content_1.contentPartsTypes.TEXT && content[k].text) {
                    description += content[k].text;
                }
            });
        }
        return description;
    };
    AbstractComponent.prototype.setSEODescription = function (desc) {
        var description = desc;
        if (description) {
            description = description.replace(new RegExp('\t', 'g'), '');
            if (description.length > 250) {
                description = description.substring(0, 247).concat('...');
            }
            this.metaService.setTag('description', description);
        }
        else {
            this.metaService.setTag('description', null);
        }
    };
    AbstractComponent.prototype.getFirstImageFromContent = function (content) {
        var img;
        if (content) {
            img = Object.keys(content).find(function (k) {
                return content[k].type === content_1.contentPartsTypes.IMAGE && content[k].url;
            });
            if (img) {
                img = content[img].url;
            }
        }
        return img;
    };
    AbstractComponent.prototype.setSEOImage = function (imageUrl) {
        if (imageUrl) {
            this.metaService.setTag('og:image', window.location.origin + imageUrl);
        }
        else {
            this.metaService.setTag('og:image', window.location.origin + '/seo/thumb.png');
        }
    };
    AbstractComponent.prototype.startEdit = function () {
        this.isEdit = true;
        // Disable navigation
        this.routingService.disabled = true;
    };
    AbstractComponent.prototype.stopEdit = function () {
        this.isEdit = false;
        // Enable navigation
        delete this.routingService.disabled;
        // Remove error message
        delete this.error;
    };
    return AbstractComponent;
}());
AbstractComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
    }),
    __metadata("design:paramtypes", [index_1.MetaService,
        auth_service_1.AuthService,
        routing_service_1.RoutingService,
        router_1.Router,
        router_1.ActivatedRoute,
        core_1.ElementRef])
], AbstractComponent);
exports.AbstractComponent = AbstractComponent;
