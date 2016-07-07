var ERRORS = require('../constants').ERRORS;

function notFoundHandler(req, res) {
    var err = ERRORS.NotFound;

    res.status(err.code).send({status: err.code, message: err.message});
}
  // if  res.render('error', { error: err });  , next(err);  then go to ...
function internalServerErrorHandler(err, req, res, next) {
    err = err || ERRORS.InternalServerError;

    res.status(err.code).send({status: err.code, message: err.message});
}

var error = {
    internalServerErrorHandler : internalServerErrorHandler,
    notFoundHandler : notFoundHandler
};

module.exports = error;
