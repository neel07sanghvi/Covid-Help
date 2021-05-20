const express = require('express');
const bcrypt = require('bcrypt');
const app = express.Router();
const mongoose = require('mongoose');

const user = mongoose.model('user')

app.post('/insert',async (req,res) =>{
    let password = await bcrypt.hash("12345678",10)
    const User = new user({
        firstname: "Xyz",
        lastname: "xyz",
        password: password,
        username: "yashu07",
    })

    User.save().then((result) => {
        if(!result){
            res.json(false);
        }
        else {
            res.json(true);
        }
    });
})


module.exports = app;
   