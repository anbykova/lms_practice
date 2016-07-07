 var jwt = require('jsonwebtoken');

 var config = require('../config');

 var ERRORS     = require('../constants').ERRORS,
     SECRET_KEY = config.get('SECRET_KEY');

function checkValidTokenAndSetParams(req, res, next) {

    function getToken() {
        var token = req.headers.authorization || req.body.token || req.query.token ||
            req.headers['x-access-token'];

        var bearerAndToken = token.split(' ');

        return {bearer : bearerAndToken[0], code : bearerAndToken[1]};
    }
     try {
        var token = getToken();

        if (!token.bearer || !token.code || (!token.bearer.toLowerCase() == "bearer")) return next(ERRORS.Unauthorized);
        // if we have secret key in config.json, then check token with secret key, else without

        if (SECRET_KEY) {
            jwt.verify(token.code, SECRET_KEY, function(err, decoded) {

                if (err) {
                    next(ERRORS.Unauthorized);
                } else {
                    //save roles(admin, user), uniq ldapName in req
                    req.roles = decoded.ROLES;
                    req.ldapName = decoded.LDAP_NAME;
                    next();
                }
            });
        } else {
            var decoded = jwt.decode(token.code);
            //save roles(admin, user), uniq ldapName in req
            req.roles = decoded.ROLES;
            req.ldapName = decoded.LDAP_NAME;
            next();
        }
     } catch (err) {
         next(ERRORS.Unauthorized);
     }
}

var auth = {
    checkValidTokenAndSetParams : checkValidTokenAndSetParams
};

module.exports = auth;
   //  var token2 = jwt.sign({ ROLES: ["ADMIN"],   "LDAP_NAME" : "azotov" }, 'secret');
   //  console.log(token2);

     // token for admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsIlJPTEVTIjpbIkFETUlOIl19.6ZhnLXuyU1teitY_1XLz9n9ukYiYKe-ni4G7RsPqsSE
     // token fo user   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJST0xFUyI6WyIiXSwiaWF0IjoxNDY4ODQyMjE5fQ.5n9g7keISwRmzl1Ad1DmlpbC7tbyo3i4omgt4AKgsJE
     // token with ldapName aDMIN eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJST0xFUyI6WyJBRE1JTiJdLCJMREFQX05BTUUiOiJtcHVwa2luYSIsImlhdCI6MTQ2OTAwNjM4Mn0.VmzsWsJEFdFf3cPQeFJHRjw4uczltDU7Peg39aiq_1A
     // token with ldapname, user eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJST0xFUyI6WyJVU0VSIl0sIkxEQVBfTkFNRSI6Im1wdXBraW5hIiwiaWF0IjoxNDY5MDA2OTI0fQ.eBhY4jfUIEVPumpMRqBUk29fahO_mpgZTVCs-pj21Bw
