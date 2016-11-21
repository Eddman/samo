define(['exports',
        '@angular/core',
        '@angular/forms',
        '@modal',
        './modal.confirmation.component',
        './modal.login.component'],
    function (exports, ngCore, ngForms, ngModal, modalComponent, modalLoginComponent) {
        'use strict';

        function ModalModule() {
        }

        ModalModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngForms.FormsModule,
                    ngModal.ModalModule
                ],
                exports: [
                    modalComponent.ModalConfirmationComponent,
                    modalLoginComponent.ModalLoginComponent
                ],
                declarations: [
                    modalComponent.ModalConfirmationComponent,
                    modalLoginComponent.ModalLoginComponent
                ]
            })
        ];

        exports.ModalModule = ModalModule;
    });
