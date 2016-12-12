import {NgModule} from "@angular/core";

import {DetailService} from "./detail.service";

import {ContentModule} from "../content/content.module";
import {DetailComponent} from "./detail.component";

@NgModule({
    imports: [
        ContentModule
    ],
    exports: [
        ContentModule,
        DetailComponent
    ],
    declarations: [
        DetailComponent
    ],
    providers: [DetailService]
})
export class DetailModule {
}
