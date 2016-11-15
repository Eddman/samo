define(['module', 'exports',
        '@angular/core',
        '@angular/router'],
    function (module, exports, ngCore, ngRouter) {
        'use strict';

        var trigger = ngCore.trigger,
            state = ngCore.state,
            style = ngCore.style,
            transition = ngCore.transition,
            animate = ngCore.animate;

        function ThumbnailComponent(router, route) {
            this.state = 'init';
            this.hover = false;
            this.router = router;
            this.route = route;
        }

        ThumbnailComponent.prototype.navigate = function () {
            if (this.hover && !this.isEdit) {
                this.router.navigate([this.thumbnail.index + 1], {relativeTo: this.route});
            }
        };

        ThumbnailComponent.prototype.setHover = function () {
            setTimeout(function () {
                this.hover = true;
            }.bind(this), 100);
            return false;
        };

        ThumbnailComponent.prototype.unsetHover = function () {
            setTimeout(function () {
                this.hover = false;
            }.bind(this), 100);
            return false;
        };

        ThumbnailComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'thumbnail',
                templateUrl: 'thumbnail.component.html',
                inputs: ['thumbnail', 'isEdit'],
                host: {
                    '[class.hover]': 'hover'
                },
                animations: [
                    trigger('state', [
                        state('init', style({
                            opacity: 0,
                            transform: 'scale(0)'
                        })),
                        state('loaded', style({
                            opacity: 1,
                            transform: 'scale(1)'
                        })),
                        transition('init => loaded', animate('300ms ease'))
                    ])
                ]
            })
        ];

        ThumbnailComponent.parameters = [ngRouter.Router, ngRouter.ActivatedRoute];

        exports.ThumbnailComponent = ThumbnailComponent;
    });
