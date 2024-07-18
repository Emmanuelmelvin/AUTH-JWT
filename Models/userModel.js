const mongoose = require('mongoose');

// Create a schema
const Schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    } , 
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

const User = mongoose.model('user', Schema);
module.exports = User