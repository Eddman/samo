define(['module', 'exports', '@angular/core'], function (module, exports, ngCore) {
    function AppComponent() {
    }

    AppComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            selector: 'samuel-netocny',
            templateUrl: 'app.component.html'
        })
    ];

    exports.AppComponent = AppComponent;
});
