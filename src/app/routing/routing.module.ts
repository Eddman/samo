import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {DetailModule} from '../detail/detail.module';
import {ListModule} from '../list/list.module';
import {ProjectsModule} from '../projects/projects.module';
import {SliderModule} from '../slider/slider.module';
import {RouterComponent} from './router.component';

const routes: Route[] = [
    {
        path     : '',
        component: RouterComponent
    },
    {
        path     : ':p0',
        pathMatch: 'full',
        component: RouterComponent
    },
    {
        path     : ':p0/:p1',
        pathMatch: 'full',
        component: RouterComponent
    },
    {
        path     : ':p0/:p1/:p2',
        pathMatch: 'full',
        component: RouterComponent
    },
    {
        path     : ':p0/:p1/:p2/:p3',
        pathMatch: 'full',
        component: RouterComponent
    }
];

@NgModule({
    imports     : [
        CommonModule,
        RouterModule.forChild(routes),
        SliderModule,
        ProjectsModule,
        DetailModule,
        ListModule
    ],
    declarations: [
        RouterComponent
    ]
})
export class AppRoutingModule {
}
