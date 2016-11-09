define(['module', 'exports',
        '@angular/core',
        '@angular/router'],
    function (module, exports, ngCore, ngRouter) {
        'use strict';

        function GroupComponent(route) {
            this.route = route;
        }

        GroupComponent.prototype.ngOnInit = function () {
            this.route.params.forEach(this.processRoute.bind(this));
        };

        GroupComponent.prototype.processRoute = function (pathParams) {
            this.config = {};
            Object.keys(pathParams).forEach(function (p) {
                this.config[p] = pathParams[p];
            }.bind(this));
        };

        GroupComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'group',
                templateUrl: 'group.component.html'
            })
        ];

        GroupComponent.parameters = [[ngRouter.ActivatedRoute]];

        exports.GroupComponent = GroupComponent;
    });
