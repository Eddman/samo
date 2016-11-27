define(['module', 'exports',
        '@angular/core',
        './content',
        '../abstract.component'],
    function (module, exports, ngCore, content, abstractComponent) {
        'use strict';

        function ContentComponent() {
            //noinspection JSUnusedGlobalSymbols
            this.types = content.contentPartsTypes;
        }

        abstractComponent.simpleComponent(ContentComponent, module, 'content', 'content.component');
        exports.ContentComponent = abstractComponent.addInputs(ContentComponent, ['contentParts']);
    });