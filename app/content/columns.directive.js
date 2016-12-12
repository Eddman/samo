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
var ColumnsDirective = (function () {
    function ColumnsDirective() {
    }
    ColumnsDirective.prototype.ngOnInit = function () {
        if (this.contentPart) {
            this.columnsCount = this.contentPart.columns;
        }
    };
    return ColumnsDirective;
}());
__decorate([
    core_1.Input('columns'),
    __metadata("design:type", Object)
], ColumnsDirective.prototype, "contentPart", void 0);
ColumnsDirective = __decorate([
    core_1.Directive({
        selector: '[columns]',
        host: {
            '[class.text]': 'true',
            '[class.column2]': 'columnsCount == 2',
            '[class.column3]': 'columnsCount == 3'
        }
    }),
    __metadata("design:paramtypes", [])
], ColumnsDirective);
exports.ColumnsDirective = ColumnsDirective;
