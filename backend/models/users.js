var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    name: {type: String, required: true}   
});

module.exports = {model: mongoose.model('User', userSchema), schema: userSchema};
