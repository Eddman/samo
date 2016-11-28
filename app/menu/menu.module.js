define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/router',
        '@angular/forms',
        '@dragula/ng2-dragula',
        '../common/modal/modal.module',
        './menu.component',
        './item.editor.component'],
    function (exports, ngCore, ngBrowser, ngRouter, ngForms, ngDragula, modalModules, menuComponent, itemEditorComponent) {
        'use strict';

        function MenuModule() {
        }

        MenuModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngDragula.DragulaModule,
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
