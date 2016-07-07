var express          = require('express'),
    expressValidator = require('express-validator'),
    bodyParser       = require('body-parser'),
    methodOverride   = require('method-override');

var config          = require('../config'),
    copRouter       = require('../routers/copRouter'),
    employeesRouter = require('../routers/employeesRouter'),
    errorHandlers   = require('../handlers/errorHandlers'),
    log             = require('../logger');

var checkValidTokenAndSetParams = require('../middleware/authentication').checkValidTokenAndSetParams;

var app         = express(),
    PORT        = config.get('PORT'),
    PATH_IMAGES = config.get('PATH_IMAGES'),
    URL         = config.get('URL');

function start(){
    app.use('/', express.static('./public/webApp'));  //Serves resources from public folder
    app.use(methodOverride());  //create a new middleware function to override the req.method property with a new value.
    app.use(bodyParser.json()); //parse application/json
    app.use(expressValidator());//this line must be immediately after bodyParser
    app.use('/images', express.static(PATH_IMAGES));  //Serves resources from public folder
    app.use(checkValidTokenAndSetParams);   //for authentication

    app.listen(PORT, function () {
        log.info('Express server listening on port ' + PORT);
    });

    //register routes
    app.use(URL, employeesRouter);
    app.use(URL, copRouter);


    //register error
    app.use (errorHandlers.internalServerErrorHandler);
    app.use (errorHandlers.notFoundHandler);
}

var server = {
    start : start
};

module.exports = server;
