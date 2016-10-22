var bw = require('@angular/platform-browser-dynamic');
var core = require('@angular/core');
var appModules = require('./app.module');
core.enableProdMode();
var platform = bw.platformBrowserDynamic();
platform.bootstrapModule(appModules.AppModule);
