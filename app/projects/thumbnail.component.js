define(['module',
        'exports',
        '@angular/core',
        '../abstract.component'],
    function (module, exports, ngCore, abstractComponent) {
        'use strict';

        var trigger = ngCore.trigger,
            state = ngCore.state,
            style = ngCore.style,
            transition = ngCore.transition,
            animate = ngCore.animate,
            keyframes = ngCore.keyframes;

        function ThumbnailComponent() {
            abstractComponent.AbstractComponent.apply(this, arguments);
            this.hover = false;
            this.removeChange = new ngCore.EventEmitter();
            this.removedChange = new ngCore.EventEmitter();
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
            },
            removed: function (event) {
                if (event.toState === 'removed') {
                    this.removedChange.emit(this.thumbnail);
                }
            }
        }, []);

        abstractComponent.simpleComponent(ThumbnailComponent, module, 'thumbnail', 'thumbnail.component');
        abstractComponent.addInputs(ThumbnailComponent, ['thumbnail', 'isEdit']);
        abstractComponent.addOutputs(ThumbnailComponent, ['removeChange', 'removedChange']);
        abstractComponent.addHost(ThumbnailComponent, {
            '[class.hover]': 'hover && thumbnail.state !== "removed"'
        });
        exports.ThumbnailComponent = abstractComponent.addAnimations(ThumbnailComponent, [
            trigger('state', [
                state('*', style({
                    opacity: 0,
                    transform: 'scale(0)'
                })),
                state('loaded', style({
                    opacity: 1,
                    transform: 'scale(1)'
                })),
                transition('* => loaded', animate('300ms ease')),
                transition('loaded => removed', [
                    animate(600, keyframes([
                        style({
                            opacity: 1,
                            transform: 'scale(1.1)',
                            offset: 0.2
                        }),
                        style({
                            opacity: 1,
                            transform: 'scale(1.1) rotate(3deg)',
                            offset: 0.2
                        }),
                        style({
                            opacity: 1,
                            transform: 'scale(1.1) rotate(-3deg)',
                            offset: 0.35
                        }),
                        style({
                            opacity: 1,
                            transform: 'scale(1.1) rotate(3deg)',
                            offset: 0.5
                        }),
                        style({
                            opacity: 1,
                            transform: 'scale(1.1) rotate(-3deg)',
                            offset: 0.65
                        }),
                        style({
                            opacity: 0,
                            transform: 'scale(0) rotate(0)',
                            offset: 1
                        })
                    ]))
                ])
            ])
        ]);

    });
