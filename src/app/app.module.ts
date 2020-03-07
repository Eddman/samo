import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {MenuModule} from './menu/menu.module';
import {AppRoutingModule} from './routing/routing.module';
import {RoutingService} from './routing/routing.service';

if (!window.location.origin) {
    (window.location as any).origin = window.location.protocol + '//'
                                      + window.location.hostname + (window.location.port ? ':'
                                      + window.location.port : '');
}

@NgModule({
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        AppRoutingModule,
        HttpClientModule,
        MenuModule
    ],
    declarations: [
        AppComponent
    ],
    providers   : [
        RoutingService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule {
}
