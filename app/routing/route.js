define(['exports'], function (exports) {
    'use strict';

    function Route(type, configuration) {
        this.type = type;
        this.configuration = configuration;
    }

    Route.forParameters = function (type, configuration, parameters) {
        var route = new Route(type, configuration);
        route.parameters = parameters;
        return route;
    };

    Route.forRedirect = function (redirectPath) {
        var redirection = new Route();
        redirection.redirectPath = redirectPath;
        return redirection;
    };

    exports.Route = Route;
});
