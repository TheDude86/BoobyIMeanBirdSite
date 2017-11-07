var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const Bird = mongoose.model('Bird');
const Vote = mongoose.model('Vote');


var metricsSchema = new Schema({
    bird: {
        type: Bird,
        required: true
    },
    views: Number,
    upvotes: Vote,
    downvotes: Vote
});

module.exports = {model: mongoose.model('Metrics', metricsSchema);
