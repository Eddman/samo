import {NgModule} from "@angular/core";
import {AuthService} from "./auth.service";
import {StorageService} from "./storage.service";
import {RequestService} from "./request.service";

@NgModule({
    providers: [
        AuthService,
        StorageService,
        RequestService
    ]
})
export class AuthModule {
}