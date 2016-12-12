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
var modal_confirmation_component_1 = require("../common/modal/modal.confirmation.component");
var abstract_view_component_1 = require("../abstract.view.component");
var dragAndDropBag = 'thumbnails-bag';
var MenuComponent = (function (_super) {
    __extends(MenuComponent, _super);
    function MenuComponent(metaService, authService, routingService, router, route, el) {
        var _this = _super.call(this, metaService, authService, routingService, router, route, el) || this;
        _this.editEnabled = new core_1.EventEmitter();
        return _this;
    }
    // Items loading
    MenuComponent.prototype.ngOnInit = function () {
        this.loadItems();
    };
    MenuComponent.prototype.loadItems = function () {
        var _this = this;
        this.routingService.getMenuRoutes().then(function (rootItem) {
            _this.rootItem = rootItem;
            document.title = rootItem.title;
        }, function (error) {
            _this.error = error;
            delete _this.rootItem;
        });
    };
    // Standard menu navigation
    MenuComponent.prototype.isDisabled = function () {
        return this.routingService.disabled;
    };
    MenuComponent.prototype.isGroupExpanded = function (groupItem) {
        var selected = this.routingService.selectedRoutePathParams;
        return selected && selected.length && selected[0] === groupItem.realURL;
    };
    MenuComponent.prototype.getHomeLink = function () {
        var selected = this.routingService.selectedRoutePathParams;
        return selected ? '/' + selected.slice(0, selected.length - 1).join('/') : '/';
    };
    MenuComponent.prototype.isPageHeaderVisible = function () {
        var selected = this.routingService.selectedRoute;
        return !selected || !selected.parameters && !selected.additionalHeader;
    };
    MenuComponent.prototype.getPageHeader = function () {
        return this.routingService.selectedRoute.additionalHeader;
    };
    // Edit mode
    MenuComponent.prototype.startEdit = function () {
        _super.prototype.startEdit.call(this);
        this.editEnabled.emit(true);
    };
    MenuComponent.prototype.stopEdit = function () {
        _super.prototype.stopEdit.call(this);
        this.editEnabled.emit(false);
    };
    MenuComponent.prototype.edit = function () {
        var _this = this;
        // Enable edit mode
        this.startEdit();
        // Load all routes
        this.routingService.getRootConfiguration().then(function (root) {
            _this.rootItem = JSON.parse(JSON.stringify(root));
        }).catch(function (error) {
            _this.error = error;
        });
    };
    // Save
    MenuComponent.prototype.confirmSave = function () {
        // Open confirmation popup
        this.saveConfirmation.open();
    };
    MenuComponent.prototype.save = function () {
        var _this = this;
        var rootItem = this.rootItem;
        // Remove root item
        this.rootItem = {};
        // Remove unnecessary local data
        this.removeBags(rootItem);
        // Save root configuration
        this.routingService.saveRootConfiguration(rootItem)
            .then(function () {
            // Disable edit mode
            _this.stopEdit();
            // Load items
            _this.loadItems();
        })
            .catch(function (err) {
            // Restore
            _this.rootItem = rootItem;
            // Process error
            _this.onHttpError(err, _this.save, _this.edit, _this.loadItems);
        });
    };
    MenuComponent.prototype.removeBags = function (item) {
        var _this = this;
        delete item.bag;
        if (item.routes) {
            item.routes.forEach(function (item) {
                _this.removeBags(item);
            });
        }
    };
    // Cancel edit
    MenuComponent.prototype.confirmCancel = function () {
        // Open confirmation popup
        this.cancelConfirmation.open();
    };
    MenuComponent.prototype.cancel = function () {
        // Disable edit mode
        this.stopEdit();
        // Load items
        this.loadItems();
    };
    // Adding groups
    MenuComponent.prototype.addGroup = function () {
        this.rootItem.routes.push({
            title: 'No name',
            url: '',
            type: 'group',
            routes: []
        });
    };
    return MenuComponent;
}(abstract_view_component_1.AbstractViewComponent));
__decorate([
    core_1.ViewChild('saveConfirmation'),
    __metadata("design:type", modal_confirmation_component_1.ModalConfirmationComponent)
], MenuComponent.prototype, "saveConfirmation", void 0);
__decorate([
    core_1.ViewChild('cancelConfirmation'),
    __metadata("design:type", modal_confirmation_component_1.ModalConfirmationComponent)
], MenuComponent.prototype, "cancelConfirmation", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MenuComponent.prototype, "editEnabled", void 0);
MenuComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-menu',
        templateUrl: 'menu.component.html',
        styleUrls: ['menu.component.css'],
        host: {
            '[class.editMode]': 'isEdit'
        }
    }),
    __metadata("design:paramtypes", [index_1.MetaService,
        auth_service_1.AuthService,
        routing_service_1.RoutingService,
        router_1.Router,
        router_1.ActivatedRoute,
        core_1.ElementRef])
], MenuComponent);
exports.MenuComponent = MenuComponent;
