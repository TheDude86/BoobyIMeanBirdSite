var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var birdSchema = new Schema({
    name: String,
    url: String,
    date_added: String,
    upvotes: Number,
    downvotes: Number,
    views: Number,
    bio: String,
    score: Number,
    user_key: String
   
});

module.exports = {model: mongoose.model('Bird', birdSchema), schema: birdSchema};
