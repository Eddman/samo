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
var ImageDirective = (function () {
    function ImageDirective() {
    }
    ImageDirective.prototype.ngOnInit = function () {
        if (this.contentPart) {
            if (this.contentPart.float) {
                switch (this.contentPart.float) {
                    case 'left':
                        this.floatLeft = true;
                        this.floatRight = false;
                        break;
                    case 'right':
                        this.floatLeft = false;
                        this.floatRight = true;
                        break;
                    default:
                        this.floatLeft = false;
                        this.floatRight = false;
                        break;
                }
            }
            this.url = this.contentPart.url;
            this.title = this.contentPart.title;
            this.width = this.contentPart.width;
        }
    };
    return ImageDirective;
}());
__decorate([
    core_1.Input('img'),
    __metadata("design:type", Object)
], ImageDirective.prototype, "contentPart", void 0);
ImageDirective = __decorate([
    core_1.Directive({
        selector: '[img]',
        host: {
            '[class.floatLeft]': 'floatLeft',
            '[class.floatRight]': 'floatRight',
            '[title]': 'title',
            '[src]': 'url',
            '[style.width]': 'width'
        }
    }),
    __metadata("design:paramtypes", [])
], ImageDirective);
exports.ImageDirective = ImageDirective;
