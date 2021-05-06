const mongoose = require('mongoose');
const postSchema = require('./post.model.js');

const User = new mongoose.Schema({
    firstname: String,
    lastname: String,
    password: String,
    post: [{ type: postSchema , ref: 'post' }],
});

mongoose.model('User' , User);