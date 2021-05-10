const express = require('express');
const app = express.Router();
app.use('/user', require('./user'));
app.use('/post', require('./post'));

module.exports = app;