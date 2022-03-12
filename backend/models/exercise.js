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
    weight: {
        type: Number,
        required: false
    }
});

module.exports = Exercise = mongoose.model('Exercise', exerciseSchema);
