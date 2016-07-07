function registerRoutes(app, routes) {
    routes.forEach(
        function(route) {app[route.method](route.url, route.callback)}
    );
}

var router = {
    registerRoutes : registerRoutes
}

module.exports = router;