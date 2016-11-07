var bw = require('@angular/platform-browser-dynamic');
var core = require('@angular/core');
var adminModules = require('./admin.module');
core.enableProdMode();
var platform = bw.platformBrowserDynamic();
platform.bootstrapModule(adminModules.AdminModule);
