var fs = require('fs');

var config         = require('../app/config'),
    copModel       = require('../app/models/copModel'),
    employeesModel = require('../app/models/employeesModel');

var COP_DATA      = config.get('COP_DATA'),
    EMPLOYEE_DATA = config.get('EMPLOYEE_DATA');

var mongoose = require('mongoose');

var MONGO_HOST = config.get('MONGO_HOST');
var MONGO_PORT = config.get('MONGO_PORT');
var MONGO_NAME = config.get('MONGO_NAME');

var dbUri = "mongodb://" + MONGO_HOST + ":" + MONGO_PORT + "/" + MONGO_NAME;
//'mongodb://' + config.db.user+':'+ config.db.pass+'@'+config.db.host+':'+config.db.port+ '/' + config.db.name;
var db = mongoose.connection;

mongoose.connect(dbUri);


db.once('open', function callback () {
        console.log('init_db start, connect to db');
        copModel.find(function(err, cop) {

                if (!cop.length) {

                    fs.readFile(COP_DATA, 'utf8', function (err, data) {
                        if (err) throw err;
                        var copData = JSON.parse(data);

                        copModel.collection.insertMany(copData, function(err) {
                        if (err) throw err;
                        });
                    });
                }
                employeesModel.remove({}, function(err) {
                   fs.readFile(EMPLOYEE_DATA, 'utf8', function (err, data) {
                       if (err) throw err;
                       var employeeData = JSON.parse(data);

                       employeesModel.collection.insertMany(employeeData, function(err) {
                           if (err) throw err;
                           mongoose.connection.readyState = 0;
                           db.close();
                           process.exit(0);
                       });
                   });

                });
        });
 });
db.on('error', function (err) {
    console.log('error')
    process.exit(0);
});


db.on('close', function() {
  console.log('close');
  process.exit(0);

});



