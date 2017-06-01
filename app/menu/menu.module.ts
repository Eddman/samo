import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

import {DragulaModule} from 'ng2-dragula/ng2-dragula';

import {ModalModule} from '../common/modal/modal.module';

import {MenuComponent} from './menu.component';
import {MenuItemEditorComponent} from './item.editor.component';

@NgModule({
    imports     : [
        DragulaModule,
        BrowserModule,
        RouterModule,
        FormsModule,
        ModalModule
    ],
    exports     : [
        MenuComponent
    ],
    declarations: [
        MenuComponent,
        MenuItemEditorComponent
    ]
})
export class MenuModule {
}
