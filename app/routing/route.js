define(['exports'], function (exports) {
    function Route(type, locale, configuration) {
        this.type = type;
        this.locale = locale;
        this.configuration = configuration;
    }

    Route.forParameters = function (type, locale, configuration, parameters) {
        var route = new Route(type, locale, configuration), params = {pathParams: parameters}, conf;
        for (conf in configuration) {
            if (configuration.hasOwnProperty(conf)) {
                params[conf] = configuration[conf];
            }
        }
        route.parameters = params;
        return route;
    };

    Route.forRedirect = function (redirectPath) {
        var redirection = new Route();
        redirection.redirectPath = redirectPath;
        return redirection;
    };

    Route.prototype.getParametrisedRoute = function () {
        this.parameters.parent = this;
        return new Route(this.type, this.locale, this.parameters);
    };

    exports.Route = Route;
});
