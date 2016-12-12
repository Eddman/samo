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
var dragula_provider_1 = require("@dragula/components/dragula.provider");
var index_1 = require("@meta/index");
var routing_service_1 = require("../routing/routing.service");
var auth_service_1 = require("../auth/auth.service");
var abstract_component_1 = require("../abstract.component");
var modal_confirmation_component_1 = require("../common/modal/modal.confirmation.component");
var MenuItemEditorComponent = (function (_super) {
    __extends(MenuItemEditorComponent, _super);
    function MenuItemEditorComponent(dragulaService, metaService, authService, routingService, router, route, el) {
        var _this = _super.call(this, metaService, authService, routingService, router, route, el) || this;
        _this.dragulaService = dragulaService;
        return _this;
    }
    // Init/Destroy component
    MenuItemEditorComponent.prototype.ngOnInit = function () {
        this.setupDragAndDrop();
        this.el.classList.add(this.item.type);
    };
    MenuItemEditorComponent.prototype.ngOnDestroy = function () {
        this.destroyDragAndDrop();
    };
    // Adding new items
    MenuItemEditorComponent.prototype.addChild = function () {
        if (!this.item.routes) {
            this.item.routes = [];
        }
        this.item.routes.push({
            title: 'No name',
            url: '',
            type: 'unknown',
            config: {
                type: [this.guid(), this.guid()]
            }
        });
    };
    // Removal
    MenuItemEditorComponent.prototype.confirmRemove = function () {
        this.deleteConfirmation.open();
    };
    MenuItemEditorComponent.prototype.remove = function () {
        this.parentLevel.routes.splice(this.parentLevel.routes.indexOf(this.item), 1);
    };
    // URL changes
    MenuItemEditorComponent.prototype.changedURL = function (newURL) {
        if (this.parentLevel && this.parentLevel.redirect === this.item.url) {
            this.parentLevel.redirect = newURL;
        }
        this.item.url = newURL;
    };
    // Drag & Drop
    MenuItemEditorComponent.prototype.setupDragAndDrop = function () {
        var _this = this;
        var dragIndex, dragElm, domIndexOf = function (child, parent) {
            return Array.prototype.indexOf.call(parent.children, child);
        };
        // Make sure we destroy the old bag.
        this.destroyDragAndDrop();
        // Construct bagName
        this.item.bag = this.guid() + 'Bag';
        // Get the bag element
        this.bagEl = Array.prototype.slice.call(this.el.childNodes).find(function (child) {
            return child.className === 'dragulaBag';
        });
        // Add bag name as class to element so we know if we're in correct bag when starting to move element
        if (!this.bagEl.classList.contains(this.item.bag)) {
            this.bagEl.classList.add(this.item.bag);
        }
        // Add special class name for group bags
        if (this.item.type === 'group' && !this.bagEl.classList.contains('groupBag')) {
            this.bagEl.classList.add('groupBag');
        }
        // Setup dragula for the bag above
        this.dragulaService.setOptions(this.item.bag, {
            containers: [this.bagEl],
            revertOnSpill: true,
            direction: 'vertical',
            moves: function (el, container, handle) {
                return handle.parentElement.className === 'handle'
                    && handle.parentElement.parentElement
                        .parentElement.parentElement.classList.contains(_this.item.bag);
            },
            isContainer: function (el) {
                return (!dragElm || !dragElm.classList.contains('group'))
                    && el.classList.contains('dragulaBag')
                    && el.classList.contains('groupBag');
            }
        });
        // Setup models for dragula (added support for distinct bags)
        this.dragulaService.find(this.item.bag).drake.on('remove', function (el, source) {
            var sourceModel = _this.item.routes;
            sourceModel.splice(dragIndex, 1);
        });
        this.dragulaService.find(this.item.bag).drake.on('drag', function (el, source) {
            dragElm = el;
            dragIndex = domIndexOf(el, source);
        });
        this.dragulaService.find(this.item.bag).drake.on('drop', function (dropElm, target, source) {
            var dropIndex = domIndexOf(dropElm, target), sourceModel = _this.item.routes, targetModel, dropElmModel, notCopy;
            if (!target) {
                return;
            }
            // console.log('DROP');
            // console.log(sourceModel);
            if (target === source) {
                sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
            }
            else {
                notCopy = dragElm === dropElm;
                targetModel = _this.getTargetModel(target);
                if (!targetModel) {
                    return;
                }
                dropElmModel = notCopy ? sourceModel[dragIndex] : JSON.parse(JSON.stringify(sourceModel[dragIndex]));
                if (notCopy) {
                    sourceModel.splice(dragIndex, 1);
                }
                targetModel.splice(dropIndex, 0, dropElmModel);
                target.removeChild(dropElm); // element must be removed for ngFor to apply correctly
            }
        });
    };
    MenuItemEditorComponent.prototype.getTargetModel = function (targetBag) {
        var rootLevel = this.parentLevel, route;
        if (rootLevel) {
            route = rootLevel.routes.find(function (group) {
                return targetBag.classList.contains(group.bag);
            });
            if (route) {
                return route.routes;
            }
        }
    };
    MenuItemEditorComponent.prototype.destroyDragAndDrop = function () {
        // Destroy dragula
        if (this.item.bag && this.dragulaService.find(this.item.bag)) {
            this.dragulaService.destroy(this.item.bag);
        }
        delete this.item.bag;
    };
    // GUID generation
    MenuItemEditorComponent.prototype.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    return MenuItemEditorComponent;
}(abstract_component_1.AbstractComponent));
__decorate([
    core_1.ViewChild('deleteConfirmation'),
    __metadata("design:type", modal_confirmation_component_1.ModalConfirmationComponent)
], MenuItemEditorComponent.prototype, "deleteConfirmation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MenuItemEditorComponent.prototype, "item", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MenuItemEditorComponent.prototype, "parentLevel", void 0);
MenuItemEditorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'item-editor',
        templateUrl: 'item.editor.component.html',
        styleUrls: ['item.editor.component.css']
    }),
    __metadata("design:paramtypes", [dragula_provider_1.DragulaService,
        index_1.MetaService,
        auth_service_1.AuthService,
        routing_service_1.RoutingService,
        router_1.Router,
        router_1.ActivatedRoute,
        core_1.ElementRef])
], MenuItemEditorComponent);
exports.MenuItemEditorComponent = MenuItemEditorComponent;
