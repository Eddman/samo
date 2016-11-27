define(['exports',
        '@angular/core',
        '@angular/router',
        '@meta/index',
        './auth/auth.service',
        './routing/routing.service',
        './content/content'],
    function (exports, ngCore, ngRouter, ngMeta, authService, routingService, cnt) {
        'use strict';

        function AbstractComponent(metaService, authService, routingService, router, route, el) {
            this.metaService = metaService;
            this.authService = authService;
            this.routingService = routingService;
            this.router = router;
            this.route = route;
            this.isEdit = false;
            this.el = el.nativeElement;
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

        AbstractComponent.prototype.startEdit = function () {
            this.isEdit = true;
            this.routingService.disabled = true;
        };

        AbstractComponent.prototype.stopEdit = function () {
            this.isEdit = false;
            delete this.routingService.disabled;
        };

        exports.AbstractComponent = AbstractComponent;
        exports.inherit = function (obj, prototype, additionalParams) {
            obj.parameters = additionalParams.concat([
                ngMeta.MetaService,
                authService.AuthService,
                routingService.RoutingService,
                ngRouter.Router,
                ngRouter.ActivatedRoute,
                ngCore.ElementRef
            ]);
            obj.prototype = Object.create(AbstractComponent.prototype);
            if (prototype) {
                Object.keys(prototype).forEach(function (k) {
                    obj.prototype[k] = prototype[k];
                });
            }
            obj.prototype.constructor = obj;
        };

        exports.simpleComponent = function (obj, module, selector, filename, noCSS) {
            obj.annotations = [
                new ngCore.Component({
                    moduleId: module.id,
                    selector: selector,
                    templateUrl: filename + '.html',
                    styleUrls: noCSS ? undefined : [filename + '.css']
                })
            ];
            return obj;
        };

        exports.addInputs = function (obj, inputs) {
            obj.annotations[0].inputs = inputs;
            return obj;
        };

        exports.addOutputs = function (obj, outputs) {
            obj.annotations[0].outputs = outputs;
            return obj;
        };

        exports.addHost = function (obj, host) {
            obj.annotations[0].host = host;
            return obj;
        };

        exports.addAnimations = function (obj, animations) {
            obj.annotations[0].animations = animations;
            return obj;
        };

        exports.addQueries = function (obj, queries) {
            obj.annotations[0].queries = queries;
            return obj;
        };

        exports.viewComponent = function (obj, module, selector, filename, additionalInputs) {
            var inputs = ['route'];
            if (additionalInputs) {
                inputs = inputs.concat(additionalInputs);
            }
            exports.simpleComponent(obj, module, selector, filename);
            exports.addInputs(obj, inputs);
            exports.addOutputs(obj, ['headerChange']);
            return obj;
        };
    });