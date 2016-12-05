define(['module', 'exports',
        '@angular/core',
        '../abstract.component',
        '@dragula/components/dragula.provider'],
    function (module, exports, ngCore, abstractComponent, dragulaService) {
        'use strict';

        function MenuItemEditorComponent(dragulaService) {
            abstractComponent.AbstractComponent.apply(this, Array.prototype.slice.call(arguments, 1));
            this.dragulaService = dragulaService;
        }

        // Init/Destroy component
        abstractComponent.inherit(MenuItemEditorComponent, {
            ngOnInit: function () {
                this.setupDragAndDrop();
                this.el.classList.add(this.item.type);
            },
            ngOnDestroy: function () {
                this.destroyDragAndDrop();
            }
        }, [
            dragulaService.DragulaService
        ]);

        // Adding new items
        abstractComponent.extend(MenuItemEditorComponent, {
            addChild: function () {
                if (!this.item.routes) {
                    this.item.routes = [];
                }
                this.item.routes.push({
                    title: 'No name',
                    url: '',
                    type: 'unknown',
                    config: {
                        type: [this.guid(), this.guid()]
                    }
                });
            }
        });

        // Removal
        abstractComponent.extend(MenuItemEditorComponent, {
            confirmRemove: function () {
                this.deleteConfirmation.open();
            },
            remove: function () {
                this.parentLevel.routes.splice(this.parentLevel.routes.indexOf(this.item), 1);
            }
        });

        // URL changes
        abstractComponent.extend(MenuItemEditorComponent, {
            changedURL: function (value) {
                if (this.parentLevel && this.parentLevel.redirect === this.item.url) {
                    this.parentLevel.redirect = value;
                }
                this.item.url = value;
            }
        });

        // Drag & Drop
        abstractComponent.extend(MenuItemEditorComponent, {
            setupDragAndDrop: function () {
                var dragIndex, dragElm, domIndexOf = function (child, parent) {
                    return Array.prototype.indexOf.call(parent.children, child);
                };

                // Make sure we destroy the old bag.
                this.destroyDragAndDrop();

                // Construct bagName
                this.item.bag = this.guid() + 'Bag';

                // Get the bag element
                this.bagEl = Array.prototype.slice.call(this.el.childNodes).find(function (child) {
                    return child.className === 'dragulaBag';
                });

                // Add bag name as class to element so we know if we're in correct bag when starting to move element
                if (!this.bagEl.classList.contains(this.item.bag)) {
                    this.bagEl.classList.add(this.item.bag);
                }

                // Add special class name for group bags
                if (this.item.type === 'group' && !this.bagEl.classList.contains('groupBag')) {
                    this.bagEl.classList.add('groupBag');
                }
                // Setup dragula for the bag above
                this.dragulaService.setOptions(this.item.bag, {
                    containers: [this.bagEl],
                    revertOnSpill: true,
                    direction: 'vertical',
                    moves: function (el, container, handle) {
                        return handle.parentElement.className === 'handle'
                            && handle.parentElement.parentElement
                                .parentElement.parentElement.classList.contains(this.item.bag);
                    }.bind(this),
                    isContainer: function (el) {
                        return (!dragElm || !dragElm.classList.contains('group'))
                            && el.classList.contains('dragulaBag')
                            && el.classList.contains('groupBag');
                    }.bind(this)
                });

                // Setup models for dragula (added support for distinct bags)
                this.dragulaService.find(this.item.bag).drake.on('remove', function (el, source) {
                    var sourceModel = this.item.routes;
                    sourceModel.splice(dragIndex, 1);
                }.bind(this));
                this.dragulaService.find(this.item.bag).drake.on('drag', function (el, source) {
                    dragElm = el;
                    dragIndex = domIndexOf(el, source);
                });
                this.dragulaService.find(this.item.bag).drake.on('drop', function (dropElm, target, source) {
                    var dropIndex = domIndexOf(dropElm, target),
                        sourceModel = this.item.routes, notCopy, targetModel, dropElmModel;
                    if (!target) {
                        return;
                    }
                    // console.log('DROP');
                    // console.log(sourceModel);
                    if (target === source) {
                        sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
                    }
                    else {
                        notCopy = dragElm === dropElm;
                        targetModel = this.getTargetModel(target);
                        if (!targetModel) {
                            return;
                        }
                        dropElmModel = notCopy ? sourceModel[dragIndex] : JSON.parse(JSON.stringify(sourceModel[dragIndex]));
                        if (notCopy) {
                            sourceModel.splice(dragIndex, 1);
                        }
                        targetModel.splice(dropIndex, 0, dropElmModel);
                        target.removeChild(dropElm); // element must be removed for ngFor to apply correctly
                    }
                }.bind(this));
            },
            getTargetModel: function (targetBag) {
                var rootLevel = this.parentLevel, route;
                if (rootLevel) {
                    route = rootLevel.routes.find(function (group) {
                        return targetBag.classList.contains(group.bag);
                    });

                    if (route) {
                        return route.routes;
                    }
                }
            },
            destroyDragAndDrop: function () {
                // Destroy dragula
                if (this.item.bag && this.dragulaService.find(this.item.bag)) {
                    this.dragulaService.destroy(this.item.bag);
                }
                delete this.item.bag;
            }
        });

        // GUID generation
        abstractComponent.extend(MenuItemEditorComponent, {
            guid: function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }
        });

        // Component definition
        abstractComponent.simpleComponent(MenuItemEditorComponent, module,
            'item-editor', 'item.editor.component');

        // Component inputs
        abstractComponent.addInputs(MenuItemEditorComponent, ['item', 'parentLevel']);

        // Component children (modals, etc.)
        exports.MenuItemEditorComponent = abstractComponent.addQueries(MenuItemEditorComponent, {
            'deleteConfirmation': new ngCore.ViewChild('deleteConfirmation')
        });
    });
