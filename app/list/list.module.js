define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        './list.component'],
    function (exports, ngCore, ngBrowser, listComponent) {
        function ListModule() {
        }

        ListModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule
                ],
                exports: [
                    listComponent.ListComponent
                ],
                declarations: [
                    listComponent.ListComponent
                ]
            })
        ];

        exports.ListModule = ListModule;
    });
