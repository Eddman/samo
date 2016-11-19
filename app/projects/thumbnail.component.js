define(['module',
        'exports',
        '@angular/core',
        '@angular/router',
        '../abstract.component'],
    function (module, exports, ngCore, ngRouter, abstractComponent) {
        'use strict';

        var trigger = ngCore.trigger,
            state = ngCore.state,
            style = ngCore.style,
            transition = ngCore.transition,
            animate = ngCore.animate;

        function ThumbnailComponent(metaService, authService, router, route) {
            abstractComponent.AbstractComponent.apply(this, arguments);
            this.state = 'init';
            this.hover = false;
            this.router = router;
            this.route = route;
            this.removeChange = new ngCore.EventEmitter();
        }

        abstractComponent.inherit(ThumbnailComponent, {
            navigate: function () {
                if (this.hover && !this.isEdit) {
                    this.router.navigate([this.thumbnail.index + 1], {relativeTo: this.route});
                }
            },
            setHover: function () {
                setTimeout(function () {
                    this.hover = true;
                }.bind(this), 100);
                return false;
            },
            unsetHover: function () {
                setTimeout(function () {
                    this.hover = false;
                }.bind(this), 100);
                return false;
            },
            remove: function () {
                this.removeChange.emit(this.thumbnail);
            }
        }, [ngRouter.Router, ngRouter.ActivatedRoute]);

        ThumbnailComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'thumbnail',
                templateUrl: 'thumbnail.component.html',
                inputs: ['thumbnail', 'isEdit'],
                outputs: ['removeChange'],
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

        exports.ThumbnailComponent = ThumbnailComponent;
    });
