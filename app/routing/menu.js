define(['exports'], function (exports) {
    'use strict';

    function MenuItem(title, url, items, locale) {
        this.title = title;
        //noinspection JSUnusedGlobalSymbols
        this.routeLink = url;
        //noinspection JSUnusedGlobalSymbols
        this.subItems = items;
        this.locale = locale;
    }

    exports.MenuItem = MenuItem;
});
