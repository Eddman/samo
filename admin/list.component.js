define(['module', 'exports',
        '@angular/core',
        '@angular/router'],
    function (module, exports, ngCore, ngRouter) {
        'use strict';

        function ListComponent(route) {
            this.route = route;
        }

        ListComponent.prototype.ngOnInit = function () {
            this.route.params.forEach(this.processRoute.bind(this));
        };

        ListComponent.prototype.processRoute = function (pathParams) {
            this.config = {};
            Object.keys(pathParams).forEach(function (p) {
                this.config[p] = pathParams[p];
            }.bind(this));
        };

        ListComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'list',
                templateUrl: 'list.component.html'
            })
        ];

        ListComponent.parameters = [[ngRouter.ActivatedRoute]];

        exports.ListComponent = ListComponent;
    });
