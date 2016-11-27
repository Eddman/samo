define(['module',
        'exports',
        '@angular/core',
        '@modal',
        '../../abstract.component'],
    function (module, exports, ngCore, ngModal, abstractComponent) {
        'use strict';

        function ModalConfirmationComponent() {
            abstractComponent.AbstractComponent.apply(this, arguments);
            this.yes = new ngCore.EventEmitter();
            this.no = new ngCore.EventEmitter();
        }

        abstractComponent.inherit(ModalConfirmationComponent, {
            open: function () {
                this.modal.open();
            },
            yesClick: function () {
                this.yes.emit();
                this.modal.close();
            },
            noClick: function () {
                this.no.emit();
                this.modal.close();
            }
        }, []);

        abstractComponent.simpleComponent(ModalConfirmationComponent, module, 'modal-confirm',
            'modal.confirmation.component', true);
        abstractComponent.addOutputs(ModalConfirmationComponent, ['yes', 'no']);
        exports.ModalConfirmationComponent = abstractComponent.addQueries(ModalConfirmationComponent, {
            'modal': new ngCore.ViewChild(ngModal.Modal)
        });
    });
