define(['exports'], function (exports) {
    function MenuItem(title, url, items, locale) {
        this.title = title;
        this.routeLink = url;
        this.subItems = items;
        this.locale = locale;
    }

    exports.MenuItem = MenuItem;
});
