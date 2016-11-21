define(['module',
        'exports',
        '@angular/core',
        '@angular/router',
        '@modal',
        '../../abstract.component'],
    function (module, exports, ngCore, ngRouter, ngModal, abstractComponent) {
        'use strict';

        function ModalLoginComponent(metaService, authService) {
            abstractComponent.AbstractComponent.apply(this, arguments);
            this.login = new ngCore.EventEmitter();
            this.cancel = new ngCore.EventEmitter();
        }

        abstractComponent.inherit(ModalLoginComponent, {
            open: function () {
                this.modal.open();
            },
            loginClick: function () {
                this.login.emit();
            },
            cancelClick: function () {
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
                    'modal': new ngCore.ViewChild(ngModal.Modal)
                }
            })
        ];

        exports.ModalLoginComponent = ModalLoginComponent;
    });
