var ERRORS = require('../constants').ERRORS;

function checkPermissions(permission){
    return function (req, res, next) {
        next();
        //return next(ERRORS.Forbidden); //next(403);
    }
}
var auth = {
    checkPermissions : checkPermissions
};

module.exports = auth;
