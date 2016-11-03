define(['module', 'exports', '@angular/core'], function (module, exports, ngCore) {
    'use strict';

    function AppComponent() {
    }

    AppComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            selector: 'samuel-netocny',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css']
        })
    ];

    exports.AppComponent = AppComponent;
});
