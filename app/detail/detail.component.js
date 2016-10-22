define(['module', 'exports', '@angular/core'], function (module, exports, ngCore) {
    function DetailComponent() {
    }

    DetailComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            selector: 'detail-view',
            templateUrl: 'detail.component.html',
            styleUrls: ['detail.component.css'],
            inputs: ['route']
        })
    ];

    exports.DetailComponent = DetailComponent;
});