const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    exercises: {
        type: [String],
        default: []
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        default: 0
    },
});

module.exports = Report = mongoose.model('Report', reportSchema);
