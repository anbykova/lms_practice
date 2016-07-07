var server   = require('./app/controls/server'),
    database = require('./app/controls/database'),
    log      = require('./app/logger');

process.on('uncaughtException', function (error) {
    log.error(error);
});


server.start();
database.start();
