define(['module', 'exports',
        '@angular/core',
        '../abstract.component',
        '../routing/route'],
    function (module, exports, ngCore, abstractComponent, route) {
        'use strict';

        function MenuItemEditorComponent() {
            abstractComponent.AbstractComponent.apply(this, arguments);
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
                if(!this.item.routes) {
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
        }, []);


        abstractComponent.simpleComponent(MenuItemEditorComponent, module,
            'item-editor', 'item.editor.component');
        exports.MenuItemEditorComponent = abstractComponent.addInputs(MenuItemEditorComponent, ['item']);
    });
