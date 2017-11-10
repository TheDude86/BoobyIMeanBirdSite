const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    note: String
});
const showSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    members: [memberSchema]
});

const birdSchema = new mongoose.Schema({
    name: {type: String, required: true},
    url: String,
    date_added: String,
    upvotes: Number,
    downvotes: Number,
    // views:
    bio: String,
    score: Number
    // user_key: 
   
});

module.exports = mongoose.model('Show', birdSchema);