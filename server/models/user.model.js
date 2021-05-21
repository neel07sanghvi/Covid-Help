const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: String,
    password: {
        type: String,
        required: true, 
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    }
});

mongoose.model('user' , User);