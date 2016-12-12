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
var projects_service_1 = require("./projects.service");
var modal_confirmation_component_1 = require("../common/modal/modal.confirmation.component");
var abstract_view_component_1 = require("../abstract.view.component");
var thumbnail_component_1 = require("./thumbnail.component");
var dragAndDropBag = 'thumbnails-bag';
var ProjectsComponent = (function (_super) {
    __extends(ProjectsComponent, _super);
    function ProjectsComponent(projectService, dragulaService, metaService, authService, routingService, router, route, el) {
        var _this = _super.call(this, metaService, authService, routingService, router, route, el) || this;
        _this.projectService = projectService;
        _this.dragulaService = dragulaService;
        _this.jigglePaused = false;
        return _this;
    }
    ProjectsComponent.prototype.ngOnChanges = function (changes) {
        // Load initial projects list
        this.loadProjects();
    };
    ProjectsComponent.prototype.ngOnDestroy = function () {
        // Enable edit
        this.stopEdit();
    };
    ProjectsComponent.prototype.stopEdit = function () {
        // Destroy dragula
        if (this.dragulaService.find(dragAndDropBag)) {
            this.dragulaService.destroy(dragAndDropBag);
        }
        // Call super
        _super.prototype.stopEdit.call(this);
    };
    ProjectsComponent.prototype.loadProjects = function () {
        var _this = this;
        // Load projects
        this.projectService.getProject(this.route.configuration.type)
            .then(this.processProjects.bind(this))
            .catch(function (err) {
            _this.error = err;
        });
    };
    ProjectsComponent.prototype.processProjects = function (projects) {
        // Remove SEO information from the screen
        this.setSEODescription();
        this.setSEOImage();
        // Setup new SEO image.
        if (projects && projects.length) {
            if (this.route.parameters && this.route.parameters.length && projects[this.route.parameters[0]]) {
                this.setSEOImage(projects[this.route.parameters[0] - 1].thumbUrl);
            }
            else {
                this.setSEOImage(projects[0].thumbUrl);
            }
        }
        // Copy projects array
        this.projects = JSON.parse(JSON.stringify(projects));
    };
    ProjectsComponent.prototype.pauseJiggle = function () {
        this.jigglePaused = true;
    };
    ProjectsComponent.prototype.unpauseJiggle = function () {
        this.jigglePaused = false;
    };
    ProjectsComponent.prototype.edit = function () {
        // Unpause Jiggle effect
        this.unpauseJiggle();
        // Enable edit
        this.startEdit();
        // Get the bag element
        this.bagEl = Array.prototype.slice.call(this.el.childNodes).find(function (child) {
            return child.className === "grid";
        });
        // Destroy previous dragula
        if (this.dragulaService.find(dragAndDropBag)) {
            this.dragulaService.destroy(dragAndDropBag);
        }
        // Setup dragula for the bag above
        this.dragulaService.setOptions(dragAndDropBag, {
            containers: [this.bagEl],
            revertOnSpill: true,
            direction: 'horizontal',
            moves: function (el) {
                return el.tagName.toLowerCase() === 'thumbnail';
            },
            accepts: function (el, target, source, sibling) {
                if (sibling && sibling.classList) {
                    return !sibling.classList.contains('thumbnail') || sibling.classList.contains('new_project');
                }
                return true;
            }
        });
        // Setup models for dragula
        this.dragulaService.find(dragAndDropBag).drake.models = [this.projects];
    };
    ProjectsComponent.prototype.confirmSave = function () {
        //Pause Jiggle effect
        this.pauseJiggle();
        // Open confirmation popup
        this.saveConfirmation.open();
    };
    ProjectsComponent.prototype.save = function () {
        var _this = this;
        var projects = this.projects;
        // Remove so they will be not visible until saved
        this.processProjects([]);
        // Save projects
        this.projectService.saveProjects(this.route.configuration.type, projects)
            .then(function (projects) {
            // Disable edit mode
            _this.stopEdit();
            // Reload
            _this.processProjects(projects);
        })
            .catch(function (err) {
            // Restore projects
            _this.processProjects(projects);
            // Process error
            _this.onHttpError(err, _this.save, _this.edit, _this.loadProjects);
        });
    };
    ProjectsComponent.prototype.confirmCancel = function () {
        //Pause Jiggle effect
        this.pauseJiggle();
        // Open confirmation popup
        this.cancelConfirmation.open();
    };
    ProjectsComponent.prototype.cancel = function () {
        // Disable edit mode
        this.stopEdit();
        // Reload from service
        this.loadProjects();
    };
    ProjectsComponent.prototype.confirmRemove = function (project) {
        // Pause Jiggle effect
        this.pauseJiggle();
        // Set project to be removed
        this.projectToRemove = project;
        // Open confirmation popup
        this.deleteConfirmation.open();
    };
    ProjectsComponent.prototype.startRemove = function () {
        this.projectToRemove.state = thumbnail_component_1.removedState;
    };
    ProjectsComponent.prototype.remove = function () {
        // Unpause Jiggle effect
        this.unpauseJiggle();
        // Remove the selected project
        this.projects.splice(this.projects.indexOf(this.projectToRemove), 1);
    };
    ProjectsComponent.prototype.addNewProject = function () {
        // Add empty object
        this.projects.push({
            parameter: (1 + Math.random()) * 0x10000 + ''
        });
    };
    return ProjectsComponent;
}(abstract_view_component_1.AbstractViewComponent));
__decorate([
    core_1.ViewChild('deleteConfirmation'),
    __metadata("design:type", modal_confirmation_component_1.ModalConfirmationComponent)
], ProjectsComponent.prototype, "deleteConfirmation", void 0);
__decorate([
    core_1.ViewChild('saveConfirmation'),
    __metadata("design:type", modal_confirmation_component_1.ModalConfirmationComponent)
], ProjectsComponent.prototype, "saveConfirmation", void 0);
__decorate([
    core_1.ViewChild('cancelConfirmation'),
    __metadata("design:type", modal_confirmation_component_1.ModalConfirmationComponent)
], ProjectsComponent.prototype, "cancelConfirmation", void 0);
ProjectsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'projects-view',
        templateUrl: 'projects.component.html',
        styleUrls: ['projects.component.css']
    }),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService,
        dragula_provider_1.DragulaService,
        index_1.MetaService,
        auth_service_1.AuthService,
        routing_service_1.RoutingService,
        router_1.Router,
        router_1.ActivatedRoute,
        core_1.ElementRef])
], ProjectsComponent);
exports.ProjectsComponent = ProjectsComponent;
