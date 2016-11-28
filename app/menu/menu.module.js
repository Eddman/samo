define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/router',
        '@angular/forms',
        '../common/modal/modal.module',
        './menu.component',
        './item.editor.component'],
    function (exports, ngCore, ngBrowser, ngRouter, ngForms, modalModules, menuComponent, itemEditorComponent) {
        'use strict';

        function MenuModule() {
        }

        MenuModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    ngRouter.RouterModule,
                    ngForms.FormsModule,
                    modalModules.ModalModule
                ],
                exports: [
                    menuComponent.MenuComponent
                ],
                declarations: [
                    menuComponent.MenuComponent,
                    itemEditorComponent.MenuItemEditorComponent
                ]
            })
        ];

        exports.MenuModule = MenuModule;
    });
