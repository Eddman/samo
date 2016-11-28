define(['module', 'exports',
        '@angular/core',
        '../abstract.component',
        '@dragula/components/dragula.provider'],
    function (module, exports, ngCore, abstractComponent, dragulaService) {
        'use strict';

        function MenuItemEditorComponent(dragulaService) {
            abstractComponent.AbstractComponent.apply(this, Array.prototype.slice.call(arguments, 1));
            this.dragulaService = dragulaService;
            this.routeTypes = [
                {
                    technical: 'slider',
                    hr: 'Slider'
                },
                {
                    technical: 'projects',
                    hr: 'Project structure'
                },
                {
                    technical: 'list',
                    hr: 'List structue'
                },
                {
                    technical: 'detail',
                    hr: 'Detail structure'
                }];
        }

        abstractComponent.inherit(MenuItemEditorComponent, {
            ngOnInit: function () {
                if (this.item.type === 'group') {
                    this.getGroupItems().some(function (item) {
                        if (this.identical(item.technical, this.item.redirect)) {
                            this.item.redirect = item.technical;
                            return true;
                        }
                    }.bind(this));
                }
                this.setupDragAndDrop();
            },
            setupDragAndDrop: function () {
                this.dragAndDropBag = this.item.url;
                // Get the bag element
                this.bagEl = Array.prototype.slice.call(this.el.childNodes[0].childNodes).find(function (child) {
                    return child.className === 'dragulaBag';
                });

                // Setup dragula for the bag above
                this.dragulaService.setOptions(this.dragAndDropBag, {
                    containers: [this.bagEl],
                    revertOnSpill: true
                });

                // Setup models for dragula
                this.dragulaService.find(this.dragAndDropBag).drake.models = [this.item.routes];
            },
            ngOnDestroy: function () {
                // Destroy dragula
                if (this.dragAndDropBag && this.dragulaService.find(this.dragAndDropBag)) {
                    this.dragulaService.destroy(this.dragAndDropBag);
                }
            },
            getGroupItems: function () {
                if (!this.children) {
                    this.children = [];
                    if (this.item.routes) {
                        this.item.routes.forEach(function (child) {
                            this.children.push({
                                technical: [this.item.url, child.url],
                                hr: child.title
                            });
                        }.bind(this));
                    }
                }
                return this.children;
            },
            identical: function (arr1, arr2) {
                var i, l;
                if (!arr1 && !arr2) {
                    return true;
                }
                if (!arr1 || !arr2) {
                    return false;
                }

                // compare lengths - can save a lot of time
                if (arr1.length != arr2.length) {
                    return false;
                }

                for (i = 0, l = arr2.length; i < l; i++) {
                    // Check if we have nested arrays
                    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
                        // recurse into the nested arrays
                        if (!arr1[i].equals(arr2[i])) {
                            return false;
                        }
                    }
                    else if (arr1[i] != arr2[i]) {
                        // Warning - two different object instances will never be equal: {x:20} != {x:20}
                        return false;
                    }
                }
                return true;
            },
            addChild: function () {
                if (!this.item.routes) {
                    this.item.routes = [];
                }
                delete this.children;
                this.item.routes.push({
                    url: {
                        toString: function () {
                            return '';
                        }
                    },
                    type: this.routeTypes[0].technical
                })
            }
        }, [
            dragulaService.DragulaService
        ]);


        abstractComponent.simpleComponent(MenuItemEditorComponent, module,
            'item-editor', 'item.editor.component');
        exports.MenuItemEditorComponent = abstractComponent.addInputs(MenuItemEditorComponent, ['item']);
    });
