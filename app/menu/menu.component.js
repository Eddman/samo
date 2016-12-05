define(['module', 'exports',
        '@angular/core',
        '../abstract.component',
        '../common/modal/modal.login.component'],
    function (module, exports, ngCore, abstractComponent, loginModal) {
        'use strict';

        function MenuComponent() {
            abstractComponent.AbstractComponent.apply(this, arguments);
            this.editEnabled = new ngCore.EventEmitter();
        }

        // Items loading
        abstractComponent.inherit(MenuComponent, {
            ngOnInit: function () {
                this.loadItems();
            },
            loadItems: function () {
                this.routingService.getMenuRoutes().then(function (rootItem) {
                    this.rootItem = rootItem;
                    document.title = rootItem.title;
                }.bind(this), function (error) {
                    this.error = error;
                    delete this.rootItem;
                }.bind(this));
            }
        }, []);

        // Standard menu navigation
        abstractComponent.extend(MenuComponent, {
            isDisabled: function () {
                return this.routingService.disabled;
            },
            isGroupExpanded: function (groupItem) {
                var selected = this.routingService.selectedRoutePathParams;
                return selected && selected.length && selected[0] === groupItem.realURL;
            },
            getHomeLink: function () {
                var selected = this.routingService.selectedRoutePathParams;
                return selected ? '/' + selected.slice(0, selected.length - 1).join('/') : '/';
            },
            isPageHeaderVisible: function () {
                var selected = this.routingService.selectedRoute;
                return !selected || !selected.parameters && !selected.additionalHeader;
            },
            getPageHeader: function () {
                return this.routingService.selectedRoute.additionalHeader;
            }
        });

        // Edit mode
        abstractComponent.extend(MenuComponent, {
            startEdit: function () {
                abstractComponent.AbstractComponent.prototype.startEdit.apply(this);
                this.editEnabled.emit(true);
            },
            stopEdit: function () {
                abstractComponent.AbstractComponent.prototype.stopEdit.apply(this);
                this.editEnabled.emit(false);
            },
            edit: function () {
                // Enable edit mode
                this.startEdit();

                // Load all routes
                this.routingService.getRootConfiguration().then(function (root) {
                    this.rootItem = JSON.parse(JSON.stringify(root));
                }.bind(this)).catch(function (error) {
                    this.error = error;
                }.bind(this));
            }
        });

        // Save
        abstractComponent.extend(MenuComponent, {
            confirmSave: function () {
                // Open confirmation popup
                this.saveConfirmation.open();
            },
            save: function () {
                var rootItem = this.rootItem;

                // Remove root item
                this.rootItem = {};

                // Remove unnecessary local data
                this.removeBags(rootItem);

                // Save root configuration
                this.routingService.saveRootConfiguration(rootItem)
                // On save refresh
                    .then(function () {
                        // Disable edit mode
                        this.stopEdit();

                        // Load items
                        this.loadItems();
                    }.bind(this))
                    // On error
                    .catch(function (err) {
                        // Restore
                        this.rootItem = rootItem;

                        // Process error
                        this.onHttpError(err, this.save, this.edit, this.loadItems);
                    }.bind(this));
            },
            removeBags: function (item) {
                delete item.bag;
                if (item.routes) {
                    item.routes.forEach(function (item) {
                        this.removeBags(item);
                    }.bind(this));
                }
            }
        });


        // Cancel edit
        abstractComponent.extend(MenuComponent, {
            confirmCancel: function () {
                // Open confirmation popup
                this.cancelConfirmation.open();
            },
            cancel: function () {
                // Disable edit mode
                this.stopEdit();

                // Load items
                this.loadItems();
            }
        });

        // Adding groups
        abstractComponent.extend(MenuComponent, {
            addGroup: function () {
                this.rootItem.routes.push({
                    title: 'No name',
                    url: '',
                    type: 'group',
                    routes: []
                });
            }
        });


        abstractComponent.simpleComponent(MenuComponent, module, 'app-menu', 'menu.component');
        abstractComponent.addOutputs(MenuComponent, ['editEnabled']);
        abstractComponent.addHost(MenuComponent, {
            '[class.editMode]': 'isEdit'
        });

        // Queries for modal popups
        exports.MenuComponent = abstractComponent.addQueries(MenuComponent, {
            'loginModal': new ngCore.ViewChild(loginModal.ModalLoginComponent),
            'saveConfirmation': new ngCore.ViewChild('saveConfirmation'),
            'cancelConfirmation': new ngCore.ViewChild('cancelConfirmation')
        });
    });
