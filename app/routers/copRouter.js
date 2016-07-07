var express = require('express');

var copHandlers = require('../handlers/copHandlers'),
    checkPermissions = require('../middleware/authorization').checkPermissions;

var ROLES = require('../constants').ROLES;

var router = express.Router();

router.get('/', copHandlers.getAll);
router.get('/:id', copHandlers.getItem);
router.post('/admin', checkPermissions([ROLES.ADMIN]), copHandlers.createItem);
router.put('/admin/:id', checkPermissions([ROLES.ADMIN]), copHandlers.updateItem);
router.delete('/admin/:id', checkPermissions([ROLES.ADMIN]), copHandlers.deleteItem);

module.exports = router;
