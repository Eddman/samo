define(['module', 'exports', '@angular/core', '@meta/index'], function (module, exports, ngCore, ngMeta) {
    'use strict';

    function AppComponent(metaService) {
    }

    AppComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            selector: 'samuel-netocny',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css']
        })
    ];
    AppComponent.parameters = [ngMeta.MetaService];

    exports.AppComponent = AppComponent;
});
