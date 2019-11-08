import {NgModule} from '@angular/core';

import {DragulaModule} from 'ng2-dragula/ng2-dragula';

import {ModalModule} from '../common/modal/modal.module';
import {DetailModule} from '../detail/detail.module';

import {ProjectsService} from './projects.service';
import {ThumbnailComponent} from './thumbnail.component';
import {ProjectsComponent} from './projects.component';

@NgModule({
    imports     : [
        DragulaModule,
        DetailModule,
        ModalModule
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
