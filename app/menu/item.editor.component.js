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

        abstractComponent.inherit(MenuItemEditorComponent, {
            ngOnInit: function () {
                this.setupDragAndDrop();
            },
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
            },
            guid: function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            },
            confirmRemove: function () {
                this.deleteConfirmation.open();
            },
            remove: function () {
                this.parentLevel.routes.splice(this.parentLevel.routes.indexOf(this.item), 1);
            },
            setupDragAndDrop: function () {
                var dragIndex, dragElm, domIndexOf = function (child, parent) {
                    return Array.prototype.indexOf.call(parent.children, child);
                };

                // Construct bagName
                this.dragAndDropBag = this.guid() + 'Bag';
                this.item.bag = this.dragAndDropBag;

                // Get the bag element
                this.bagEl = Array.prototype.slice.call(this.el.childNodes).find(function (child) {
                    return child.className === 'dragulaBag';
                });

                // Add bag name as class to element so we know if we're in correct bag when starting to move element
                if (!this.bagEl.classList.contains(this.dragAndDropBag)) {
                    this.bagEl.classList.add(this.dragAndDropBag);
                }

                // Add special class name for group bags
                if (this.item.type === 'group' && !this.bagEl.classList.contains('groupBag')) {
                    this.bagEl.classList.add('groupBag');
                }
                // Setup dragula for the bag above
                this.dragulaService.setOptions(this.dragAndDropBag, {
                    containers: [this.bagEl],
                    revertOnSpill: true,
                    direction: 'vertical',
                    moves: function (el, container, handle) {
                        return handle.parentElement.className === 'handle'
                            && handle.parentElement.parentElement
                                .parentElement.parentElement.classList.contains(this.dragAndDropBag);
                    }.bind(this),
                    isContainer: function (el) {
                        return el.classList.contains('dragulaBag') && el.classList.contains('groupBag');
                    }
                });

                // Setup models for dragula (added support for distinct bags)
                this.dragulaService.find(this.dragAndDropBag).drake.on('remove', function (el, source) {
                    var sourceModel = this.item.routes;
                    sourceModel.splice(dragIndex, 1);
                }.bind(this));
                this.dragulaService.find(this.dragAndDropBag).drake.on('drag', function (el, source) {
                    dragElm = el;
                    dragIndex = domIndexOf(el, source);
                });
                this.dragulaService.find(this.dragAndDropBag).drake.on('drop', function (dropElm, target, source) {
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
            ngOnDestroy: function () {
                // Destroy dragula
                if (this.dragAndDropBag && this.dragulaService.find(this.dragAndDropBag)) {
                    this.dragulaService.destroy(this.dragAndDropBag);
                }
            }
        }, [
            dragulaService.DragulaService
        ]);


        abstractComponent.simpleComponent(MenuItemEditorComponent, module,
            'item-editor', 'item.editor.component');
        abstractComponent.addInputs(MenuItemEditorComponent, ['item', 'parentLevel']);

        exports.MenuItemEditorComponent = abstractComponent.addQueries(MenuItemEditorComponent, {
            'deleteConfirmation': new ngCore.ViewChild('deleteConfirmation')
        });
    });
