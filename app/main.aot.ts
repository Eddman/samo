import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from '../ngFactories/app/app.module.ngfactory';
import {AuthModuleNgFactory} from '../ngFactories/app/auth/auth.module.ngfactory';
import {ModalModuleNgFactory} from '../ngFactories/app/common/modal/modal.module.ngfactory';
import {ContentModuleNgFactory} from '../ngFactories/app/content/content.module.ngfactory';
import {DetailModuleNgFactory} from '../ngFactories/app/detail/detail.module.ngfactory';
import {ListModuleNgFactory} from '../ngFactories/app/list/list.module.ngfactory';
import {MenuModuleNgFactory} from '../ngFactories/app/menu/menu.module.ngfactory';
import {ProjectsModuleNgFactory} from '../ngFactories/app/projects/projects.module.ngfactory';
import {AppRoutingModuleNgFactory} from '../ngFactories/app/routing/routing.module.ngfactory';
import {SliderModuleNgFactory} from '../ngFactories/app/slider/slider.module.ngfactory';
import {enableProdMode} from '@angular/core';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
platformBrowser().bootstrapModuleFactory(AuthModuleNgFactory);
platformBrowser().bootstrapModuleFactory(ModalModuleNgFactory);
platformBrowser().bootstrapModuleFactory(ContentModuleNgFactory);
platformBrowser().bootstrapModuleFactory(DetailModuleNgFactory);
platformBrowser().bootstrapModuleFactory(ListModuleNgFactory);
platformBrowser().bootstrapModuleFactory(MenuModuleNgFactory);
platformBrowser().bootstrapModuleFactory(ProjectsModuleNgFactory);
platformBrowser().bootstrapModuleFactory(AppRoutingModuleNgFactory);
platformBrowser().bootstrapModuleFactory(SliderModuleNgFactory);