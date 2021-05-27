const express = require('express');
const bcrypt = require('bcrypt');
const app = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const user = mongoose.model('user')

// app.post('/insert',async (req,res) =>{
//     let password = await bcrypt.hash("12345678",10)
//     const User = new user({
//         firstname: "Xyz",
//         lastname: "xyz",
//         password: password,
//         username: "yashu07",
//     })

//     User.save().then((result) => {
//         if(!result){
//             res.json(false);
//         }
//         else {
//             res.json(true);
//         }
//     });
// })


app.post('/register',async (req,res) => {
    // console.log(req.body)

    if(req.body.username === undefined || req.body.password === undefined || req.body.email === undefined){
        return res.json({status: false,message: "Username and password are required"});
    }

    let username = req.body.username;

    user.findOne({$or: [{username: username},{email: req.body.email}]}).then(async (doc) => {
        if(!doc){
            let password = await bcrypt.hash(req.body.password,10);
            

            let User = new user({
                password: password,
                username: username,
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile || null
            })

            User.save().then(doc => {
                
                if(!doc){
                    res.json({status: false,message: "Something went wrong!"})
                }
                else{
                    res.json({status: true,message: "User registered Successfully"});
                }
            }) 
        }
        else{
            res.json({status: false,message: "Username or Email Already exist"})
        }
    })
})

app.post('/login',(req,res) => {
    if(req.body.usernameOREmail === "" || req.body.password === ""){
        res.json({
            status: false,
            message: "Username and Password are required"
        })
        return;
    }


    let usernameOREmail = req.body.usernameOREmail;
    let password = req.body.password;
    user.findOne({$or: [{username: usernameOREmail},{email: usernameOREmail}]}).then((doc) => {
        if(!doc){
            res.json({
                status: false,
                message: "Incorrect Useranme or Password"
            })
        }
        else{
            bcrypt.compare(password,doc.password, (err,result) => {
                if(err || !result){
                    res.json({
                        status: false,
                        message: "Incorrect Useranme or Password"
                    })
                }
                else{
                    let User = {
                        username: doc.username,
                        id: doc._id
                    }
                    jwt.sign(User,process.env.SECRET_KEY, (err,token) => {
                        if(err){
                            res.json({
                                status: false,
                                message: "Something went wrong"
                            })
                        }
                        else{
                            res.json({
                                status: true,
                                message: "Loged In successfullly",
                                token: token
                            })
                        }
                    })
                }
            })
        }
    }).catch(err => {
        res.json({
            status: false,
            message: "Something went wrong"
        })
    })

})


module.exports = app;
   