import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MenuComponent} from './menu.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule
    ],
    exports     : [
        MenuComponent
    ],
    declarations: [
        MenuComponent
    ]
})
export class MenuModule {
}
