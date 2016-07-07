var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    imageName: {
        type: String
    },
    description: {
        type: String
    }
});


var ItemModel = mongoose.model('cop', Schema);

module.exports = ItemModel;