const mongoose = require('mongoose');
const commentSchema = require('./comments.model.js');

const post = new mongoose.Schema({
    caption: String,
    country: String,
    state: String,
    city: String,
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    comment: [commentSchema],
});

mongoose.model('post' , post);