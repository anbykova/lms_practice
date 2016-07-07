var express = require('express');

var employeesHandlers = require('../handlers/employeesHandlers'),
    checkPermissions  = require('../middleware/authorization').checkPermissions,
    checkUserInCop    = require('../middleware/checkUserInCop').checkUserInCop;


var ROLES = require('../constants').ROLES;

var router = express.Router();

router.get('/admin/employees/', checkPermissions([ROLES.ADMIN]), employeesHandlers.getEmployees);
router.get('/employees/current', employeesHandlers.getCurrentUserInfo);
router.get('/employees/', checkUserInCop, employeesHandlers.getEmployees);



module.exports = router;