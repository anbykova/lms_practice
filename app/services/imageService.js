var guid         = require('guid'),
    mkdirp       = require('mkdirp'),
    log          = require('../logger'),
    fs           = require('fs');

var config = require('../config');

var PATH_IMAGES    = config.get('PATH_IMAGES'),
    IMAGE_EXTENSION = require('../constants').IMAGE_EXTENSION;

function removeImage (imageName) {
    if (!imageName) return false;
    var pathImage = PATH_IMAGES + imageName;

    //check the existence of a image for remove

    fs.exists(pathImage, function (exists) {
         if (exists) {
               fs.unlink(pathImage, function (err) {
                   if (err) log.error(err);
                   log.info("remove image success");
               });
         } else {
               log.info("not exist");
         }
    });
}

function saveImageFromBase64(data, imageName, callback) {
    if (!data) {log.info('we have not data'); return false;}
    var isValidCallback = (typeof callback == 'function');

    // check the existence of a folder for photos

    fs.exists(PATH_IMAGES, function (exists) {
        if(exists) {
            //check the existence of a image with the same imageName

            fs.exists(PATH_IMAGES + imageName, function (exists) {
                 if (exists) {imageName = guid.create().toString(); + IMAGE_EXTENSION;}
                 writeFile();
            });
        } else {

            // create folder for images

            mkdirp(PATH_IMAGES, function(err){
               if (err) {
                   log.error(err);
                   return isValidCallback && callback(err);
               }
               log.info("Directory for images created successfully!");
               writeFile();
            });

        }
    });


    function writeFile() {
        fs.writeFile(PATH_IMAGES + imageName, new Buffer(data.toString('base64'), 'base64'),  function (err) {
            if (err) {
                log.error(new Error("File not created: " + imageName));
                isValidCallback && callback(err);
            } else {
                log.info("File created: " + imageName);
            }
            isValidCallback && callback(err, imageName);
        });
    }
}

var imageService = {
    removeImage : removeImage,
    saveImageFromBase64 : saveImageFromBase64
};

module.exports = imageService;