const mongoose = require('mongoose');

const url = process.env.url;

mongoose.connect(url ,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) {
        console.log("Some Error ...");
    } else {
        console.log("Database Connected ....");
    }
});

require('./post.model');
require('./comments.model');
require('./user.model');

