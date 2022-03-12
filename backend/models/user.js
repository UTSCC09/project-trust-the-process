const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true 
    },
    reports: {
        type: [String],
        default: []
    }
});

module.exports = User = mongoose.model('User', userSchema);
