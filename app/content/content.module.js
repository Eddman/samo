define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/router',
        './content.component'],
    function (exports, ngCore, ngBrowser, ngRouter, contentComponent) {
        function ContentComponent() {
        }

        ContentComponent.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    ngRouter.RouterModule
                ],
                exports: [
                    contentComponent.ContentComponent
                ],
                declarations: [
                    contentComponent.ContentComponent
                ]
            })
        ];

        exports.ContentComponent = ContentComponent;
    });
