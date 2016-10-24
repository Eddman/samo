define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        './list.component',
        './list.service',
        '../content/content.module'],
    function (exports, ngCore, ngBrowser, listComponent, listService, contentModule) {
        function ListModule() {
        }

        ListModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    contentModule.ContentComponent
                ],
                exports: [
                    listComponent.ListComponent
                ],
                declarations: [
                    listComponent.ListComponent
                ],
                providers: [
                    listService.ListService
                ]
            })
        ];

        exports.ListModule = ListModule;
    });
