var ERRORS = require('../constants').ERRORS;

function checkPermissions(permission){
    return function (req, res, next) {
        // check roles

        function check(item) {
          return ~req.roles.indexOf(item);
        }

        (permission.some(check))? next(): next(ERRORS.Forbidden);
    };
}


var auth = {
    checkPermissions : checkPermissions
};

module.exports = auth;