var vow  = require('vow'),
    guid = require('guid');

var copModel     = require('../models/copModel'),
    db           = require('../controls/database.js'),
    imageService = require('./imageService');

var DB_ERRORS       = require('../constants').DB_ERRORS,
    IMAGE_EXTENSION = require('../constants').IMAGE_EXTENSION;


// for security delete id from body (we have id in params.id), if we have not imageData, then we have not imageName
function checkInData(data) {
    delete data.id;
    (data.imageData)? (data.imageName = guid.create()  + IMAGE_EXTENSION) : (delete data.imageName);
    return data;
}

// this function delete parameters _id, _v - standard field for mongoDB
function checkOutData(data) {
    return (!data)? null : {
        id : data.id,
        link : data.link,
        title : data.title,
        imageName : !data.imageName? null : "images/" + data.imageName,
        description : data.description
    };
}

function getAll() {
    var defer = vow.defer();

    if (!db.isConnect()) {
        defer.reject(DB_ERRORS.DB_Disconnect);
    } else {
        copModel.find(function(err, cop) {
          if (err) return defer.reject(DB_ERRORS.DB_Disconnect);
          var result = [];

          cop.forEach(function(item) {
            result.push(checkOutData(item));
          });
          defer.resolve(result);
        });
    }
    return defer.promise();
}



function getOne(id) {
    var defer = vow.defer();

    if (!db.isConnect()) {
        defer.reject(DB_ERRORS.DB_Disconnect);
    } else {
        copModel.find({id : id}, function(err, cop) {
          if (err) return defer.reject(DB_ERRORS.DB_Disconnect);
          defer.resolve(checkOutData(cop[0]));
        });
    }
    return defer.promise();

}
function create(data) {  //post
    var defer = vow.defer();

    data = checkInData(data);
    data.id = guid.create();

    if (!db.isConnect()) {
        defer.reject(DB_ERRORS.DB_Disconnect);
    } else {
        //keep the transmitted data

        var newCop = new copModel(data);

        newCop.save(function(dbErr, cop) {
             if (!db.isConnect()) return defer.reject(DB_ERRORS.DB_Disconnect);
             //try to save image in public/images

             imageService.saveImageFromBase64(data.imageData, data.imageName, function (imageErr, imageName) {
                  if (!db.isConnect()) {
                          defer.reject(DB_ERRORS.DB_Disconnect);
                  } else if (!imageName) {
                       // if we have errors then save in database version data without image

                       copModel.findOneAndUpdate({id : newCop.id}, {imageName : null}, {'new': true},function (dbErr, cop) {
                          if (dbErr) return defer.reject(DB_ERRORS.DB_Disconnect);
                          defer.resolve(getOne(data.id));
                      });
                  }
             });
             defer.resolve(getOne(data.id));
        });
    }

    return defer.promise();
}

function update(id, data) {
    var defer = vow.defer();
    var newCop = data;

    data = checkInData(data);

    if (!db.isConnect()) {
        defer.reject(DB_ERRORS.DB_Disconnect);
    } else {
        //keep the transmitted data

        copModel.findOneAndUpdate({id : id}, newCop, {'new': false}, function (dbErr, cop) {
             if (!db.isConnect()) {
                 return defer.reject(DB_ERRORS.DB_Disconnect);
             } else if (cop) {
                 //if we have data with id, then try to save image in public/images

                 imageService.saveImageFromBase64(data.imageData, data.imageName, function (imageErr, imageName) {
                      if (!db.isConnect()) {
                              defer.reject(DB_ERRORS.DB_Disconnect);
                      } else if (!imageName) {
                           // if we have an errors, then save in database version data without image

                           copModel.findOneAndUpdate({id : id}, {imageName : cop.ImageName}, {'new': true},function (dbErr, oldCop) {
                              if (dbErr) return defer.reject(DB_ERRORS.DB_Disconnect);

                              defer.resolve(getOne(id));
                           });
                      } else {
                            // if the image is successfully added, then remove oldImage
                            imageService.removeImage(cop.imageName);
                            defer.resolve(getOne(id));
                      }
                 });
             }

             defer.resolve(getOne(id));
        });
    }
    return defer.promise();
}



function deleteOne(id) {
    var defer = vow.defer();

    if (!db.isConnect()) {
        defer.reject(DB_ERRORS.DB_Disconnect);
    } else {
       copModel.findOneAndRemove({id : id}, function (err, cop) {
            if (err) return defer.reject(DB_ERRORS.DB_Disconnect);
            cop && imageService.removeImage(cop.imageName);
            defer.resolve(checkOutData(cop));
       });
    }
    return defer.promise();
}


/*
function copy(b){
	var a = JSON.stringify(b);
	a = JSON.parse(a);
    return a;
}
*/

var service = {
      getAll : getAll,
      getOne : getOne,
      create : create,
      update : update,
      deleteOne : deleteOne
};

module.exports = service;
