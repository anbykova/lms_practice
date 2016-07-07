var nconf = require('nconf'),
    path  = require('path');
var commandLineArgs = require('command-line-args');

var config = require('../../config.json');

var optionsDefinitions = [
   { name: "PORT"   , type: Number, defaultValue: config['PORT']    || 3000 },
   { name: "MONGO_HOST", type: String, defaultValue: config['MONGO_HOST'] || 'localhost' },
   { name: "MONGO_PORT", type: Number, defaultValue: config['MONGO_PORT'] || 27017 }
];

var options = commandLineArgs(optionsDefinitions);

nconf.argv()
     .env()
     .file({file: path.join(__dirname, '../../config.json')});

nconf.overrides(options);

/*
 nconf.defaults({
     'serverPort': 19132,
     'proxyPort': 19133,
     'interface': {
         'cli': true,
         'webserver': true
     },
     'dev': false
 });*/

module.exports = nconf;
