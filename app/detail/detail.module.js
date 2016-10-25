define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        './detail.component',
        './detail.service'],
    function (exports, ngCore, ngBrowser, detailComponent, detailService) {
        function DetailModule() {
        }

        DetailModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule
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
