var fs = require('fs');

var config         = require('../config'),
    copModel       = require('../models/copModel'),
    employeesModel = require('../models/employeesModel');

var COP_DATA      = config.get('COP_DATA'),
    EMPLOYEE_DATA = config.get('EMPLOYEE_DATA');

var mongoose = require('mongoose');

var DB_HOST = config.get('DB_HOST');
var DB_PORT = config.get('DB_PORT');
var DB_NAME = config.get('DB_NAME');

var dbUri = "mongodb://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME;
//'mongodb://' + config.db.user+':'+ config.db.pass+'@'+config.db.host+':'+config.db.port+ '/' + config.db.name;
var db = mongoose.connection;

mongoose.connect(dbUri);
//надо ли удалять папку с images
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



