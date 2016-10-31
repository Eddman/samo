define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/router',
        './content.component',
        './img.directive',
        './columns.directive'],
    function (exports, ngCore, ngBrowser, ngRouter, contentComponent, imgDirective, columnsDirective) {
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
                    contentComponent.ContentComponent, imgDirective.ImageDirective, columnsDirective.ColumnsDirective
                ]
            })
        ];

        exports.ContentComponent = ContentComponent;
    });
