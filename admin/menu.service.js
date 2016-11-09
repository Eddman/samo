define(['exports'], function (exports) {
    'use strict';

    function MenuService() {
    }

    MenuService.prototype.setSelectedMenuRoute = function (route) {
        this.selectedMenuRoute = route;
    };

    exports.MenuService = MenuService;
});
