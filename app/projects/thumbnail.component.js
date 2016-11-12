define(['module', 'exports',
        '@angular/core'],
    function (module, exports, ngCore) {
        'use strict';

        var trigger = ngCore.trigger,
            state = ngCore.state,
            style = ngCore.style,
            transition = ngCore.transition,
            animate = ngCore.animate;

        function ThumbnailComponent() {
            this.state = 'init';
        }

        ThumbnailComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'thumbnail',
                templateUrl: 'thumbnail.component.html',
                inputs: ['thumbnail'],
                animations: [
                    trigger('state', [
                        state('init', style({
                            opacity: 0
                        })),
                        state('loaded', style({
                            opacity: 1
                        })),
                        transition('init => loaded', animate('300ms ease-in'))
                    ])
                ]
            })
        ];

        exports.ThumbnailComponent = ThumbnailComponent;
    });
