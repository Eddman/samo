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
            },
            isDisabled: function () {
                return this.routingService.disabled;
            },
            isRootExpanded: function (menuLocale) {
                var selected = this.routingService.selectedRoutePathParams;
                return selected && selected.length && selected[0] === menuLocale.realURL;
            },
            isMenuHidden: function () {
                var selected = this.routingService.selectedRoute;
                return selected && (selected.parameters || selected.additionalHeader);
            },
            getHomeLink: function () {
                var selected = this.routingService.selectedRoutePathParams;
                return selected ? '/' + selected.slice(0, selected.length - 1).join('/') : '/';
            },
            getPageHeader: function () {
                return this.routingService.selectedRoute.additionalHeader;
            },
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
                    this.rootItem = root;
                }.bind(this)).catch(function (error) {
                    this.error = error;
                }.bind(this));
            },
            confirmSave: function () {
                // Open confirmation popup
                this.saveConfirmation.open();
            },
            save: function () {
                // Disable edit mode
                this.stopEdit();

                // Load items
                this.loadItems();
            },
            confirmCancel: function () {
                // Open confirmation popup
                this.cancelConfirmation.open();
            },
            cancel: function () {
                // Disable edit mode
                this.stopEdit();

                // Load items
                this.loadItems();
            },
            addGroup: function () {
                this.rootItem.routes.push({
                    title: 'No name',
                    url: '',
                    type: 'group',
                    routes: []
                });
            }
        }, []);


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
