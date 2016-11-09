define(['module', 'exports',
    '@angular/core'], function (module, exports, ngCore) {
    'use strict';

    function MenuTreeComponent() {
        this.types = ['group','slider','projects','detail','list'];
    }

    MenuTreeComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            selector: 'menu-tree',
            templateUrl: 'menu-tree.component.html',
            inputs: ['config', 'parentConfig'] ,
            styleUrls: ['../node_modules/bootstrap/dist/css/bootstrap.min.css']
        })
    ];

    exports.MenuTreeComponent = MenuTreeComponent;
});
