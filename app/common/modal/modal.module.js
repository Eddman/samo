define(['exports',
        '@angular/core',
        '@dragula/ng2-dragula',
        '@modal',
        './modal.confirmation.component'],
    function (exports, ngCore, ngDragula, ngModal, modalComponent) {
        'use strict';

        function ModalModule() {
        }

        ModalModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngModal.ModalModule
                ],
                exports: [
                    modalComponent.ModalConfirmationComponent
                ],
                declarations: [
                    modalComponent.ModalConfirmationComponent
                ]
            })
        ];

        exports.ModalModule = ModalModule;
    });
