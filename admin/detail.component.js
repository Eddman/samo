define(['module', 'exports',
        '@angular/core',
        '@angular/router'],
    function (module, exports, ngCore, ngRouter) {
        'use strict';

        function DetailComponent(route) {
            this.route = route;
        }

        DetailComponent.prototype.ngOnInit = function () {
            this.route.params.forEach(this.processRoute.bind(this));
        };

        DetailComponent.prototype.processRoute = function (pathParams) {
            if(!this.config) {
                this.config = {};
                Object.keys(pathParams).forEach(function (p) {
                    this.config[p] = pathParams[p];
                }.bind(this));
            }
        };

        DetailComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'detail',
                inputs: ['config'],
                templateUrl: 'detail.component.html'
            })
        ];

        DetailComponent.parameters = [[ngRouter.ActivatedRoute]];

        exports.DetailComponent = DetailComponent;
    });
