define(['exports'], function (exports) {
    'use strict';

    function MenuItem(title, url, items, realURL) {
        this.title = title;
        //noinspection JSUnusedGlobalSymbols
        this.routeLink = url;
        //noinspection JSUnusedGlobalSymbols
        this.subItems = items;
        //noinspection JSUnusedGlobalSymbols
        this.realURL = realURL;
    }

    exports.MenuItem = MenuItem;
});
