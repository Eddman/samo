import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DetailModule} from '../detail/detail.module';
import {ProjectsComponent} from './projects.component';
import {ProjectsService} from './projects.service';
import {ThumbnailComponent} from './thumbnail.component';

@NgModule({
    imports     : [
        CommonModule,
        DetailModule
    ],
    exports     : [
        ProjectsComponent
    ],
    declarations: [
        ProjectsComponent,
        ThumbnailComponent
    ],
    providers   : [ProjectsService]
})
export class ProjectsModule {
}
