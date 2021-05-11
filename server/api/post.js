const express = require('express');
const bcrypt = require('bcrypt');
const app = express.Router();
const mongoose = require('mongoose');
const { post } = require('./user');

const postSchema = mongoose.model('post');


app.post('/insert', (req,res) => {
    const Post = new postSchema({
        caption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        country: "Australia",
        state: "goa",
        city: "Ahm",
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

    let country = req.query.country;
    let state = req.query.state;
    let city = req.query.city;
    let page = parseInt(req.query.page);
    let lmt = parseInt(req.query.limit);


    
    postSchema.aggregate([
        {
            $match:{
                $and: [
                    {country: {"$regex":country || ".*","$options": "i"}},
                    {state: {"$regex":state || ".*","$options": "i"}},
                    {city: {"$regex":city || ".*","$options": "i"}},
                ]
                
            }
        },
        {$skip: lmt * (page - 1)},
        {$limit: lmt},
        {
            $lookup: {
                from: 'users',
                localField: 'authorId',
                foreignField: '_id',
                as: 'user',
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                username: '$user.username',
                caption: 1,
                country: 1,
                state: 1,
                city: 1,
                authorId: 1,
            }
        }
    ]).then(doc => {
        if(page === 1){
            postSchema.find({$and: [
                {country: {"$regex":country || ".*","$options": "i"}},
                {state: {"$regex":state || ".*","$options": "i"}},
                {city: {"$regex":city || ".*","$options": "i"}},
            ]},'_id').countDocuments().then(data => {
                res.json({doc,data})
            }).catch(err => res.json(doc))
        }
        else{
            res.json(doc)
        }
    }).catch(err => {

        res.json(err);
    })
})


module.exports = app;
