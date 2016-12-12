"use strict";
var Route = (function () {
    function Route(type, configuration) {
        this.type = type;
        this.configuration = configuration;
    }
    Route.forParameters = function (type, configuration, parameters) {
        var route = new Route(type, configuration);
        route.parameters = parameters;
        return route;
    };
    ;
    Route.forRedirect = function (redirectPath) {
        var redirection = new Route();
        redirection.redirectPath = redirectPath;
        return redirection;
    };
    return Route;
}());
exports.Route = Route;
