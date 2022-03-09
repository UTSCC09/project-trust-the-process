const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    exercises: {
        type: [String],
        default: []
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        default: 0
    },
});

module.exports = Report = mongoose.model('Report', reportSchema);
