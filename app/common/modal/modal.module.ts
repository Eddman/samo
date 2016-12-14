import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

import {ModalModule as ModuleModal}  from 'ng2-modal';

import {ModalConfirmationComponent} from "./modal.confirmation.component";
import {ModalLoginComponent} from "./modal.login.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModuleModal
    ],
    exports: [
        ModalConfirmationComponent,
        ModalLoginComponent
    ],
    declarations: [
        ModalConfirmationComponent,
        ModalLoginComponent
    ]
})
export class ModalModule {
}