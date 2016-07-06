var express = require('express'),
    app     = express(),
    server  = require('./app/controls/server');

server.start(app);
server.registerRoutAndError(app);


