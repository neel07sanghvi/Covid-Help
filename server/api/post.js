const express = require('express');
const bcrypt = require('bcrypt');
const app = express.Router();
const mongoose = require('mongoose');
const { post } = require('./user');

const postSchema = mongoose.model('post');


app.post('/insert', (req,res) => {
    const Post = new postSchema({
        caption: "hello",
        country: "india",
        state: "guj",
        city: "snagar",
        authorId: mongoose.Types.ObjectId("6098cc9b54ad380a6c26309a"),
    })

    Post.save().then(doc => {
        if(!doc){
            res.json(false);
        }
        else {
            res.json(true);
        }
    })
})

app.get('/list',(req,res) => {
    postSchema.find({}).limit(3).populate('authorId').then(doc =>  {
        if(doc){

            res.json(doc);
        }
        res.json(false);
    }) 
})


module.exports = app;
