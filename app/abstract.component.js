define(['exports',
        '@angular/core',
        '@meta/index',
        './auth/auth.service',
        './routing/routing.service',
        './content/content'],
    function (exports, ngCore, ngMeta, authService, routingService, cnt) {
        'use strict';

        function AbstractComponent(metaService, authService, routingService) {
            this.metaService = metaService;
            this.authService = authService;
            this.routingService = routingService;
            this.headerChange = new ngCore.EventEmitter();
        }

        AbstractComponent.prototype.isLoggedIn = function () {
            return this.authService.isLoggedIn();
        };

        AbstractComponent.prototype.getDescriptionFromContent = function (desc, content) {
            var description = desc;
            if (content) {
                if (description) {
                    description += '\n';
                } else {
                    description = '';
                }
                Object.keys(content).forEach(function (k) {
                    if (content[k].type === cnt.contentPartsTypes.TEXT && content[k].text) {
                        description += content[k].text;
                    }
                });
            }
            return description;
        };

        AbstractComponent.prototype.setSEODescription = function (desc) {
            var description = desc;
            if (description) {
                description = description.replace(new RegExp('\t', 'g'), '');
                if (description.length > 250) {
                    description = description.substring(0, 247).concat('...');
                }
                this.metaService.setTag('description', description);
            } else {
                this.metaService.setTag('description');
            }
        };

        AbstractComponent.prototype.getFirstImageFromContent = function (content) {
            var img;
            if (content) {
                img = Object.keys(content).find(function (k) {
                    return content[k].type === cnt.contentPartsTypes.IMAGE && content[k].url;
                });
                if (img) {
                    img = content[img].url;
                }
            }
            return img;
        };

        AbstractComponent.prototype.setSEOImage = function (imageUrl) {
            if (imageUrl) {
                this.metaService.setTag('og:image', window.location.origin + imageUrl);
            } else {
                this.metaService.setTag('og:image', window.location.origin + '/seo/thumb.png');
            }
        };

        exports.AbstractComponent = AbstractComponent;
        exports.inherit = function (obj, prototype, additionalParams) {
            obj.parameters = [
                ngMeta.MetaService,
                authService.AuthService,
                routingService.RoutingService
            ].concat(additionalParams);
            obj.prototype = Object.create(AbstractComponent.prototype);
            if (prototype) {
                Object.keys(prototype).forEach(function (k) {
                    obj.prototype[k] = prototype[k];
                });
            }
            obj.prototype.constructor = obj;
        };
        exports.component = function (obj, module, selector, filename, additionalInputs) {
            var inputs = ['route'];
            if (additionalInputs) {
                inputs = inputs.concat(additionalInputs);
            }
            obj.annotations = [
                new ngCore.Component({
                    moduleId: module.id,
                    selector: selector,
                    templateUrl: filename + '.html',
                    styleUrls: [filename + '.css'],
                    inputs: inputs,
                    outputs: ['headerChange']
                })
            ];
            return obj;
        };
    });