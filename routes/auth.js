const express = require('express');
var router = express.Router();
const session = require('express-session');
const jwt = require('jsonwebtoken');


const {createUser, varifyUser} = require('../controllers/auth');

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.post('/signup',(req,res)=>{
    createUser(req.body)
    .then((resp)=>{
        res.redirect('/auth/signin')
    })
    .catch((err)=>{
        console.log("Error",err)
    })
})     

router.get('/signin',(req,res)=>{
    res.render('signin',{
        message:``
    })
})
router.get('/admin',(req,res)=>{
    res.render('signin',{
        message:``
    })
})

router.post('/signin',(req,res)=>{
    varifyUser(req.body, (err, data)=>{
        if(err){
            console.log(err)
             res.sendStatus(500);
        }
        else if(data && data.message){
            res.render('signin', data)
        }
        else{
            const token = jwt.sign({
                email:data.email,
                isAdmin:true
            },'secret key');

            // res.json({  token });

            console.log(req.session)
            // req.session.email = data.email;
            // req.session.isAdmin = true;
            res.redirect('/signed_user')
        }
        
    })
}) 

router.post('/signout',(req, res)=>{
    req.session.destroy();
    res.clearCookie('connect-sid');
    res.redirect('/auth/signin');
})

module.exports=router;