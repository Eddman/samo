define(['module', 'exports',
        '@angular/core',
        '@angular/router'],
    function (module, exports, ngCore, ngRouter) {
        'use strict';

        function SliderComponent(route) {
            this.route = route;
        }

        SliderComponent.prototype.ngOnInit = function () {
            this.route.params.forEach(this.processRoute.bind(this));
        };

        SliderComponent.prototype.processRoute = function (pathParams) {
            this.config = {};
            Object.keys(pathParams).forEach(function (p) {
                this.config[p] = pathParams[p];
            }.bind(this));
        };

        SliderComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'slider',
                templateUrl: 'slider.component.html'
            })
        ];

        SliderComponent.parameters = [[ngRouter.ActivatedRoute]];

        exports.SliderComponent = SliderComponent;
    });
