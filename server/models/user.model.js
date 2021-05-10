const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstname: String,
    lastname: String,
    password: String,
    username: {
        type: String,
        unique: true,
        required: true,
    },
    post: [{ type: mongoose.Schema.Types.ObjectId , ref: 'post' }],
});

mongoose.model('user' , User);