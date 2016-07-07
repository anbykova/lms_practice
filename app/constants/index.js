var METHODS = {
    GET    : 'get',
    POST   : 'post',
    PUT    : 'put',
    DELETE : 'delete'
};

var ERRORS = {
    BadRequest: {
       code : 400,
       message : "Bad Request"
    },
    Unauthorized : {
        code : 401,
        message : "Unauthorized"
    },
    Forbidden : {
        code : 403,
        message : "Forbidden"
    },
    NotFound : {
        code : 404,
        message : "Not Found"
    },
    InternalServerError : {
        code : 500,
        message : "Internal Server Error"
    }
};
var DB_ERRORS = {
    DB_Disconnect : {
        message : "Connection to database is not opened."
    }
};

var IMAGE_EXTENSION = ".png";

var ROLES = {
  ADMIN : "ADMIN",
  USER : "USER"
};

module.exports = {
    METHODS : METHODS,
    ERRORS : ERRORS,
    ROLES : ROLES,
    DB_ERRORS : DB_ERRORS,
    IMAGE_EXTENSION : IMAGE_EXTENSION
};