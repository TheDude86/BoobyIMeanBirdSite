const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
    name: {type: String, required: true},
    url: String,
    date_added: String,
    upvotes: Number,
    downvotes: Number,
    views: Number,
    bio: String,
    score: Number,
    user_key: String
   
});

module.exports = mongoose.model('Show', birdSchema);
