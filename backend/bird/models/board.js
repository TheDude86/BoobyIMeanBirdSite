var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var boardSchema = new Schema({
    date: Date,
    mostPopular: ObjectId,
    leastPopular: ObjectId,
    trending: ObjectId
});

module.exports = {model: mongoose.model('Board', boardSchema), schema: birdSchema};
