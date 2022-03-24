const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    reportId: {
        type: String,
        required: true
    },
    exerciseName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
    },
    order: {
        type: Number,
        required: true
    }
});

module.exports = Exercise = mongoose.model('Exercise', exerciseSchema);
