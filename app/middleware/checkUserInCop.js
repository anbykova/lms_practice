var employeesModel = require('../models/employeesModel');

var ERRORS = require('../constants').ERRORS;

       //check ldapName in cop (copId)
function checkUserInCop (req,res, next) {
    if (!req.ldapName) return next(ERRORS.Forbidden);
    if (!(req.query && req.query.copId)) return next(ERRORS.BadRequest);

    employeesModel.find({ldapName : req.ldapName, copId : req.query.copId}, function(err, employee) {
        console.log(req.params);
        console.log(req.query);
          if (err) return next(ERRORS.InternalServerError);
          if (!employee) return next(ERRORS.Forbidden);
          next();
    });
}

var auth = {
    checkUserInCop : checkUserInCop
};

module.exports = auth;