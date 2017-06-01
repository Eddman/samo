import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HttpModule, JsonpModule} from '@angular/http';

import {RoutingService} from './routing/routing.service';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './routing/routing.module';
import {MenuModule} from './menu/menu.module';
import {AppComponent} from './app.component';

if (!window.location.origin) {
    (window.location as any).origin = window.location.protocol + '//'
        + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

@NgModule({
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        AppRoutingModule,
        AuthModule,
        HttpModule,
        JsonpModule,
        MenuModule
    ],
    declarations: [
        AppComponent
    ],
    providers   : [RoutingService],
    bootstrap   : [AppComponent]
})
export class AppModule {
}
