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
var routing_service_1 = require("../routing/routing.service");
var auth_service_1 = require("../auth/auth.service");
var abstract_view_component_1 = require("../abstract.view.component");
var slider_service_1 = require("./slider.service");
var SliderComponent = (function (_super) {
    __extends(SliderComponent, _super);
    function SliderComponent(sliderService, metaService, authService, routingService, router, route, el) {
        var _this = _super.call(this, metaService, authService, routingService, router, route, el) || this;
        _this.sliderService = sliderService;
        return _this;
    }
    SliderComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        // Pause previous sliding
        this.startAutoSlide(false);
        this.sliderService.getSlides(this.route.configuration.type).then(function (slides) {
            _this.pages = slides.images;
            _this.pageNumber = 0;
            _this.pageCount = _this.pages.length;
            if (_this.keysEnabled || slides.primary) {
                if (!slides.primary) {
                    _this.setSEODescription(slides.description);
                }
                if (slides && slides.images && slides.images.length) {
                    _this.setSEOImage(slides.images[0].url);
                }
                else {
                    _this.setSEOImage();
                }
            }
            _this.defaultDuration = slides.duration;
            // Check if auto-slide is available
            if (slides.autoSlide) {
                _this.autoSlide = slides.autoSlide;
            }
            // Start sliding
            if (_this.autoSlide) {
                _this.startAutoSlide(true);
            }
            else {
                _this.startAutoSlide(false);
            }
        });
    };
    SliderComponent.prototype.autoSlideFunction = function () {
        if (this.pageNumber < this.pageCount - 1) {
            // Move one slide forward
            this.pageNumber += 1;
        }
        else {
            // Move to front
            this.moveToFirst();
        }
    };
    SliderComponent.prototype.moveToFirst = function () {
        if (this.interval) {
            // Pause sliding
            this.startAutoSlide(false);
            // Speedup transitions
            this.transitionDuration /= 10;
            setTimeout(this.moveToFirst.bind(this), this.transitionDuration * 1.5);
        }
        else {
            this.pageNumber -= 1;
            if (this.pageNumber === 0) {
                // Restart auto-slide
                this.startAutoSlide();
            }
            else {
                setTimeout(this.moveToFirst.bind(this), this.transitionDuration * 1.5);
            }
        }
    };
    SliderComponent.prototype.startAutoSlide = function (sliding) {
        if (this.autoSlide) {
            if (arguments.length === 0 || sliding) {
                this.transitionDuration = this.defaultDuration || 500;
                this.interval = setInterval(this.autoSlideFunction.bind(this), this.autoSlide + this.transitionDuration);
            }
            else {
                clearInterval(this.interval);
                delete this.interval;
            }
        }
        else {
            this.transitionDuration = this.defaultDuration || 500;
        }
    };
    SliderComponent.prototype.ngOnDestroy = function () {
        // Pause sliding
        this.startAutoSlide(false);
    };
    return SliderComponent;
}(abstract_view_component_1.AbstractViewComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SliderComponent.prototype, "keysEnabled", void 0);
SliderComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'slider-view',
        templateUrl: 'slider.component.html',
        styleUrls: ['slider.component.css']
    }),
    __metadata("design:paramtypes", [slider_service_1.SliderService,
        index_1.MetaService,
        auth_service_1.AuthService,
        routing_service_1.RoutingService,
        router_1.Router,
        router_1.ActivatedRoute,
        core_1.ElementRef])
], SliderComponent);
exports.SliderComponent = SliderComponent;
