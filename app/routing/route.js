define(['exports'], function (exports) {
    function Route(type, locale, configuration) {
        this.type = type;
        this.locale = locale;
        this.configuration = configuration;
    }

    Route.forParameters = function (type, locale, configuration, parameters) {
        var route = new Route(type, locale, configuration);
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
