import {NgModule} from "@angular/core";
import {RouterModule, Route} from "@angular/router";

import {SliderModule} from "../slider/slider.module";
import {ProjectsModule} from "../projects/projects.module";
import {DetailModule} from "../detail/detail.module";
import {ListModule} from "../list/list.module";

import {RouterComponent} from "./router.component";

let i: number, path: string = '';

const routes: Route[] = [];

routes.push({
    path: path,
    component: RouterComponent
});
for (i = 0; i <= 3; i += 1) {
    path += ':p' + i;
    routes.push({
        path: path,
        pathMatch: 'full',
        component: RouterComponent
    });
    path += '/';
}

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
