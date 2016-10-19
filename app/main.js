var bw = require('@angular/platform-browser-dynamic');
var appModules = require('./app.module');
var platform = bw.platformBrowserDynamic();
platform.bootstrapModule(appModules.AppModule);
