const express = require('express');
const bcrypt = require('bcrypt');
const app = express.Router();
const mongoose = require('mongoose');
const CommentSchema = mongoose.model('comment');
const postSchema = mongoose.model('post');


app.post('/insert', (req,res) => {
    const Post = new postSchema({
        caption: req.body.caption,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        authorId: mongoose.Types.ObjectId(req.body.userId),
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

app.get('/posts/:id',(req,res) => {
    postSchema.find({authorId: req.params.id}).then((data) => {
        res.json({
            status: true,
            data: data,
            message: "Successfull"
        })
    }).catch(err => {
        res.json({
            status: false,
            message: "Something Went Wrong"
        })
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
                comment: 1,
                username: '$user.username',
                caption: 1,
                country: 1,
                state: 1,
                city: 1,
                authorId: 1,
                _id: 1,
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


app.post('/addComment',(req,res) => {
    const comt = new CommentSchema({
        content: req.body.content,
        authorId: req.body.authorId,
        postId: req.body.postId
    })

    comt.save().then((doc) => {
        if(doc){
            postSchema.findByIdAndUpdate(doc.postId,{$inc:{ comment: 1}},(err,data) => {
                if(data){
                    res.json(doc);
                }else{
                    res.json(false)
                }
            })
            
        }
        else{
            res.json(false)
        }
    })
})

app.post('/commentList', (req,res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit); 
    CommentSchema.aggregate([
        {
            $match: {
                postId: mongoose.Types.ObjectId(req.body.postId)
            }
        },
        {$skip: limit * (page - 1)},
        {$limit: limit},
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
                content: 1,
                authorId: 1,
                postId: 1
            }
        }
    ]).then(doc => {
        res.json(doc);
    })

})

app.post('/edit/:id',(req,res) => {

    try{
        postSchema.findByIdAndUpdate(req.params.id,{
            $set:{
                country: req.body.country,
                state: req.body.state,
                city: req.body.city,
                caption: req.body.caption,
            }
        }).then((data) => {
            if(!data){
                res.json({
                    status: false,
                    message: "Some Error Occured"
                })
            }
            else{
                res.json({
                    status: true,
                    message: "Updated Successfully",
                })
            }
        })
    }catch(err){
        res.json({
            status: false,
            message: "Some Error Occured"
        })   
    }
})
app.post('/delete/:id',(req,res) => {

    try{
        postSchema.findByIdAndDelete(req.params.id).then((data) => {
            if(!data){
                res.json({
                    status: false,
                    message: "Some Error Occured"
                })
            }
            else{
                res.json({
                    status: true,
                    message: "Deleted Successfully",
                })
            }
        })
    }
    catch(err){
        res.json({
            status: false,
            message: "Some Error Occured"
        })   
    }
})


module.exports = app;
