var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var voteSchema = new Schema({
    total: Number,
    users: [ObjectId]
});

module.exports = {model: mongoose.model('Vote', boardSchema), schema: birdSchema};
