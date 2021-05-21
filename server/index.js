const express = require('express');
const app = express();
const cors = require('cors');
require('./models');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + './public'));

app.use('/api',require('./api'));


app.listen(7000,() => {
    console.log("server Started...");
})

