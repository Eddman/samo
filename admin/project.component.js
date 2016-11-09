define(['module', 'exports',
        '@angular/core',
        '@angular/router'],
    function (module, exports, ngCore, ngRouter) {
        'use strict';

        function ProjectsComponent(route) {
            this.route = route;
        }

        ProjectsComponent.prototype.ngOnInit = function () {
            this.route.params.forEach(this.processRoute.bind(this));
        };

        ProjectsComponent.prototype.processRoute = function (pathParams) {
            this.config = {};
            Object.keys(pathParams).forEach(function (p) {
                this.config[p] = pathParams[p];
            }.bind(this));
        };

        ProjectsComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'project',
                templateUrl: 'project.component.html'
            })
        ];

        ProjectsComponent.parameters = [[ngRouter.ActivatedRoute]];

        exports.ProjectsComponent = ProjectsComponent;
    });
