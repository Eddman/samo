import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from './ngFactories/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);