import {NgModule} from "@angular/core";
import {RouterModule, Route} from "@angular/router";

import {SliderModule} from "../slider/slider.module";
import {ProjectsModule} from "../projects/projects.module";
import {DetailModule} from "../detail/detail.module";
import {ListModule} from "../list/list.module";

import {RouterComponent} from "./router.component";

const routes: Route[] = [
    {
        path: '',
        component: RouterComponent,
    },
    {
        path: ':p0',
        pathMatch: 'full',
        component: RouterComponent,
    },
    {
        path: ':p0/:p1',
        pathMatch: 'full',
        component: RouterComponent,
    },
    {
        path: ':p0/:p1/:p2',
        pathMatch: 'full',
        component: RouterComponent,
    },
    {
        path: ':p0/:p1/:p2/:p3',
        pathMatch: 'full',
        component: RouterComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SliderModule,
        ProjectsModule,
        DetailModule,
        ListModule
    ],
    exports: [RouterModule],
    declarations: [RouterComponent]
})
export class AppRoutingModule {
}
