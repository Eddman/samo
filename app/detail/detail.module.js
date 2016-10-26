define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        './detail.component',
        './detail.service',
        '../content/content.module'],
    function (exports, ngCore, ngBrowser, detailComponent, detailService, contentModule) {
        function DetailModule() {
        }

        DetailModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    contentModule.ContentComponent
                ],
                exports: [
                    detailComponent.DetailComponent
                ],
                declarations: [
                    detailComponent.DetailComponent
                ],
                providers: [detailService.DetailService]
            })
        ];

        exports.DetailModule = DetailModule;
    });
