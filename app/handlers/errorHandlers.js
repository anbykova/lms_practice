var ERRORS = require('../constants').ERRORS;

function notFoundHandler(req, res) {
    var err = ERRORS.NotFound;

    res.status(err.code).send({status: err.code, message: err.message});
}
// if  res.render('error', { error: err });  , next(err);  then go to ...
function internalServerErrorHandler(err, req, res, next) {
    var error;
    // check error, if it mistake from constants, then send this
    if (err.code) {
        error = err;
    } else {
    // check error, if error.code exists in the constants, then we send our mistake with this code, message
        for (key in ERRORS) {
            if (ERRORS[key].code == err.status) {error = ERRORS[key];}
        }
    }
    error = error || ERRORS.InternalServerError;
    res.status(error.code).send({status: error.code, message: error.message});
}

var error = {
    internalServerErrorHandler : internalServerErrorHandler,
    notFoundHandler : notFoundHandler
};

module.exports = error;

