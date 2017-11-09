var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var metricsSchema = new Schema({
    bird: {
        type: String,
        required: true
    },
    views: Number,
    upvotes: ObjectId,
    downvotes: ObjectId
});

module.exports = {model: mongoose.model('Metrics', metricsSchema), schema: metricsSchema};