var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    ldapName: {
        type: String,
        unique: true,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    copInfo: [{
        copId : {type : String, required: true},
        copRoles: [{type: String}]
    }]
});

var ItemModel = mongoose.model('employee', Schema);

module.exports = ItemModel;