function registerRoutes(app, routes) {
    routes.forEach(
        function(route) {app[route.method](route.url, route.callback)}
    );
};

var routes = {
    registerRoutes : registerRoutes
};

module.exports = routes;