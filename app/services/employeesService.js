var vow  = require('vow');

var employeesModel = require('../models/employeesModel'),
    db             = require('../controls/database.js');

var DB_ERRORS = require('../constants').DB_ERRORS;

function checkOutEmployee(data) {
    return (!data)? null : {
        ldapName : data.ldapName,
        city : data.city,
        copInfo : data.copInfo
    };
}

function getAllEmployees(query) {

    var defer = vow.defer();

    if (!db.isConnect()) {
        defer.reject(DB_ERRORS.DB_Disconnect);
    } else {
          employeesModel.find(query, function(err, employee) {
                if (err) return defer.reject(DB_ERRORS.DB_Disconnect);
                var result = [];

                employee.forEach(function(item) {
                     result.push(checkOutEmployee(item));
                });
                defer.resolve(result);
          });
    }
    return defer.promise();
}


function getEmployeeByLdapName(ldapName) {

    var defer = vow.defer();

    if (!db.isConnect()) {
        defer.reject(DB_ERRORS.DB_Disconnect);
    } else {
          employeesModel.find({ldapName : ldapName}, function(err, employee) {
                if (err) return defer.reject(DB_ERRORS.DB_Disconnect);
                var result = [];

                employee.forEach(function(item) {
                     result.push(checkOutEmployee(item));
                });
                defer.resolve(result[0]);
          });
    }
    return defer.promise();
}
var service = {
      getAllEmployees : getAllEmployees,
      getEmployeeByLdapName : getEmployeeByLdapName
};

module.exports = service;