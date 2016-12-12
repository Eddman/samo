import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule, JsonpModule} from '@angular/http';

import {MetaModule} from '@meta/index';

import {RoutingService} from './routing/routing.service';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './routing/routing.module';
import {MenuModule} from './menu/menu.module';
import {AppComponent} from './app.component';

const metaConfig = {
    defaults: {
        title: 'SAMUEL NETOČNÝ, architekt'
    }
};

if (!window.location.origin) {
    (window.location as any).origin = window.location.protocol + "//"
        + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        MetaModule.forRoot(metaConfig),
        AppRoutingModule,
        AuthModule,
        HttpModule,
        JsonpModule,
        MenuModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [RoutingService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
