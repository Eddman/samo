define(['module', 'exports',
    '@angular/core',
    '../app/routing/routing.service'], function (module, exports, ngCore, routingService) {
    'use strict';

    function AdminComponent(routingService) {
        this.routingService = routingService;
        this.test = { value: 'test;'};
    }

    AdminComponent.prototype.ngOnInit = function () {
        this.routingService.getRootConfiguration().then(function(root) {
            this.root = root;
        }.bind(this));
    };

    AdminComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            templateUrl: 'admin.component.html'
        })
    ];
    AdminComponent.parameters = [[routingService.RoutingService]];

    exports.AdminComponent = AdminComponent;
});
