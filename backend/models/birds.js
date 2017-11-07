var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const Vote = mongoose.model('Vote');

var birdSchema = new Schema({
    name: {type: String, required: true},
    url: String,
    date_added: String,
    upvotes: Number,
    downvotes: Number,
    views: Number,
    bio: String,
    score: Number
    // user_key: 
   
});

module.exports = {model: mongoose.model('Bird', birdSchema), schema: birdSchema};
