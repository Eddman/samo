"use strict";
var MenuItem = (function () {
    function MenuItem(title, routeLink, subItems, realURL) {
        this.title = title;
        this.routeLink = routeLink;
        this.subItems = subItems;
        this.realURL = realURL;
    }
    return MenuItem;
}());
exports.MenuItem = MenuItem;
