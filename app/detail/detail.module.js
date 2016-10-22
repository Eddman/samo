define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        './detail.component'],
    function (exports, ngCore, ngBrowser, detailComponent) {
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
                ]
            })
        ];

        exports.DetailModule = DetailModule;
    });
