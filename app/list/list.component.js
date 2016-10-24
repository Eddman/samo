define(['module', 'exports', '@angular/core'], function (module, exports, ngCore) {
    function ListComponent() {
    }

    ListComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            selector: 'list-view',
            templateUrl: 'list.component.html',
            styleUrls: ['list.component.css'],
            inputs: ['route']
        })
    ];

    exports.ListComponent = ListComponent;
});