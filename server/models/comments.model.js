const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    
});

mongoose.model('comment' , commentSchema);