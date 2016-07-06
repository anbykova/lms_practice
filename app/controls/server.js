var config  = require('../config'),
    router  = require('../controls/router'),
    dataForRoutes = require('../routes/myServiceRoutes'),
    error = require('../routes/errorRoutes'),
    port = config.get('port');
function start(app){

    app.listen(port, function () {
        console.log('Example app');
    });
}
function registerRoutAndError(app){
    //registerroutes
    router.registerRoutes(app, dataForRoutes);
    //registererror
    app.use (error.exception);
    app.use (error.notFound);
}

var server = {
    start : start,
    registerRoutAndError : registerRoutAndError
}

module.exports = server;