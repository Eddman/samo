define(['module',
        'exports',
        '@angular/core',
        '@angular/router',
        '@modal',
        './modal.confirmation.component',
        '../../abstract.component'],
    function (module, exports, ngCore, ngRouter, ngModal, confirmationModal, abstractComponent) {
        'use strict';

        function ModalLoginComponent(metaService, authService) {
            abstractComponent.AbstractComponent.apply(this, arguments);
            this.login = new ngCore.EventEmitter();
            this.cancel = new ngCore.EventEmitter();
        }

        abstractComponent.inherit(ModalLoginComponent, {
            open: function () {
                this.loginModal.open();
            },
            loginClick: function () {
                this.loggingIn = true;
                delete this.err;
                this.authService.login({
                    user: this.username,
                    password: this.password
                }).subscribe(function (success) {
                    if (success) {
                        this.login.emit();
                    }
                    this.loggingIn = false;
                }.bind(this), function (err) {
                    this.error = err;
                    this.loggingIn = false;
                }.bind(this));
            },
            cancelClick: function () {
                this.loginModal.close();
                this.cancelConfirmation.open();
            },
            confirmCancelation: function () {
                this.cancel.emit();
            }
        }, []);

        ModalLoginComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'modal-login',
                templateUrl: 'modal.login.component.html',
                outputs: ['login', 'cancel'],
                queries: {
                    'loginModal': new ngCore.ViewChild(ngModal.Modal),
                    'cancelConfirmation': new ngCore.ViewChild(confirmationModal.ModalConfirmationComponent)
                }
            })
        ];

        exports.ModalLoginComponent = ModalLoginComponent;
    });
