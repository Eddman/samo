define(['module',
        'exports',
        '@angular/core',
        '@modal',
        './modal.confirmation.component',
        '../../abstract.component'],
    function (module, exports, ngCore, ngModal, confirmationModal, abstractComponent) {
        'use strict';

        function ModalLoginComponent() {
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

        abstractComponent.simpleComponent(ModalLoginComponent, module, 'modal-login', 'modal.login.component', true);
        abstractComponent.addOutputs(ModalLoginComponent, ['login', 'cancel']);
        exports.ModalLoginComponent = abstractComponent.addQueries(ModalLoginComponent, {
            'loginModal': new ngCore.ViewChild(ngModal.Modal),
            'cancelConfirmation': new ngCore.ViewChild(confirmationModal.ModalConfirmationComponent)
        });
    });
