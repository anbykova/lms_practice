var mongoose = require('mongoose');

var config = require('../config'),
    log    = require('../logger');

var MONGO_HOST = config.get('MONGO_HOST');
var MONGO_PORT = config.get('MONGO_PORT');
var MONGO_NAME = config.get('MONGO_NAME');

var dbUri = "mongodb://" + MONGO_HOST + ":" + MONGO_PORT + "/" + MONGO_NAME;
//'mongodb://' + config.db.user+':'+ config.db.pass+'@'+config.db.host+':'+config.db.port+ '/' + config.db.name;
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});

db.once('open', function callback () {
    log.info("Connected to DB on Uri:" + dbUri);
});
db.on('close', function() {

  log.info("disconnected");
  mongoose.connection.readyState = 0;
  db.close();

});
function start() {
    mongoose.connect(dbUri);
}
function dropDB() {
   mongoose.connect(dbUri,function(){
       mongoose.connection.db.dropDatabase();  });
}

function isConnect() {
    return mongoose.Connection.STATES.connected === mongoose.connection.readyState;
}

var database = {
   start : start,
   isConnect : isConnect,
   dropDB : dropDB
};

module.exports = database;

