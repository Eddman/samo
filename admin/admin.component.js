define(['module', 'exports', '@angular/core'], function (module, exports, ngCore) {
    'use strict';

    function AdminComponent() {
    }

    AdminComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            selector: 'samuel-netocny',
            templateUrl: 'admin.component.html'
        })
    ];

    exports.AdminComponent = AdminComponent;
});
