var winston = require('winston'),
    fs      = require('fs'),
    mkdirp  = require('mkdirp');

var config = require('../config');

var PATH_LOG = config.get('PATH_LOG');

try {
   /* Create logs directory if not exist */
   if (!fs.existsSync(PATH_LOG)) {
       mkdirp.sync(PATH_LOG);
       //info('Folder for logs created: ' + PATH_LOG);
   }
} catch (err) {
   //console.log(err);
}
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'error-file',
      filename: PATH_LOG + 'filelog-error.log',
      level: 'error'
    }) ,
    new (winston.transports.File)({
      name: 'warn-file',
      filename: PATH_LOG + 'filelog-warn.log',
      level: 'warn'
    }),
    new (winston.transports.File)({
      name: 'info-file',
      filename: PATH_LOG + 'filelog-info.log',
      level: 'info'
    }),
    new (winston.transports.Console)({
          level: 'info'
        }) ,
  ]
});


logger.on('error', function(err) {
   logger.error(err);
});

function error (msg) {
    logger.error(msg);
}
function warn (msg) {
    logger.warn(msg);
}
function info (msg) {
    logger.info(msg);
}

function verbose(msg) {
    logger.verbose(msg);
}
function debug (msg) {
    logger.debug(msg);
}
function silly (msg) {
    logger.silly(msg);
}

var log = {
     error: error,
     warn: warn,
     info: info,
     verbose: verbose,
     debug: debug,
     silly: silly
};

module.exports = log;
