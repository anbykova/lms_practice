var copService = require('../services/copService'),
    log        = require('../logger');
var ERRORS  = require('../constants').ERRORS;

function getAll(req, res, next) {
     try {
        copService.getAll().then(function success (data) {
            res.json(data);
        }, function error (err) {
            log.error(err.message);
            next(ERRORS.InternalServerError);
        });
     } catch (err) {
        log.error(err.message);
        next(ERRORS.InternalServerError);
     }
}

function getItem(req, res, next) {
    var id = req.params.id;

    try {
        copService.getOne(id).then(function success (data) {
             if (data) {
                res.json(data);
            } else {
                next(ERRORS.NotFound);
            }
        },function error (err) {
            log.error(err);
            next(ERRORS.InternalServerError);
        });
    } catch (err) {
        log.error(err.message);
        next(ERRORS.InternalServerError);
    }

}


function createItem(req, res, next) { //post
   try {
       req.assert('title', 'Title is required').notEmpty();
       req.assert('link', 'Link is required').notEmpty();

       var errors = req.validationErrors();

       if (errors) {
           log.error(errors);
           next(ERRORS.BadRequest);
       } else {
           var data = req.body;

           copService.create(data).then(function success (data) {
               if (data) {
                   res.json(data);
               } else {
                   next(ERRORS.NotFound);
               }
           }, function error (err) {
                   log.error(err.message);
                   next(ERRORS.InternalServerError);
           });
       }
   } catch (err) {
       log.error(err.message);
       next(ERRORS.InternalServerError);
   }
}

function updateItem(req, res, next) { //put
   var id = req.params.id,
       data = req.body;

   try {
       copService.update(id, data).then(function success (data) {
           if (data) {
               res.json(data);
           } else {
               next(ERRORS.NotFound);
           }
       }, function error (err) {
               log.error(err.message);
               next(ERRORS.InternalServerError);
       });
   } catch (err) {
        log.error(err.message);
        next(ERRORS.InternalServerError);
   }

}

function deleteItem(req, res, next) {
   var id = req.params.id;

    try {
        copService.deleteOne(id).then(function success (data) {
            if (data) {
                res.json(data);
            } else {
                next(ERRORS.NotFound);
            }
        }, function error (err) {
                log.error(err.message);
                next(ERRORS.InternalServerError);
        });
    } catch (err) {
        log.error(err.message);
        next(ERRORS.InternalServerError);
    }
}

var handler = {
    getAll : getAll,
    getItem : getItem,
    createItem : createItem,
    updateItem : updateItem,
    deleteItem : deleteItem
};

module.exports = handler;
