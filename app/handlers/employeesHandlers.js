var employeesService = require('../services/employeesService'),
    log              = require('../logger');

var ERRORS  = require('../constants').ERRORS;

function getEmployees(req, res, next){
      try {
         employeesService.getAllEmployees(req.query).then(function success (data) {
             res.json(data);
         }, function error (err) {
             log.error(err.message);
             (err.code)? next(err) : next(ERRORS.InternalServerError);
         });
      } catch (err) {
         log.error(err.message);
         next(ERRORS.InternalServerError);
      }
}
// get info (city, cops) about one person by ldapName
function getCurrentUserInfo(req, res, next){
      try {
         employeesService.getEmployeeByLdapName(req.ldapName).then(function success (data) {
             res.json(data);
         }, function error (err) {
             log.error(err.message);
             (err.code)? next(err) : next(ERRORS.InternalServerError);
         });
      } catch (err) {
         log.error(err.message);
         next(ERRORS.InternalServerError);
      }
}
var handler = {
    getEmployees : getEmployees,
    getCurrentUserInfo :getCurrentUserInfo
};

module.exports = handler;