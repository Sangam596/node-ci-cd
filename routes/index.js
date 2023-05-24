const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

var postsRouter =require('./posts');
var usersRouter = require('./users');
const authRouter = require('./auth');
const adminRouter = require('./admin');

var isAdmin = (req, res, next) =>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const tokenPayload = jwt.verify(token, 'secret key')
        console.log('Token payload',tokenPayload);
         if(tokenPayload.isAdmin) next();
         else{
             res.sendStatus(403);
         }
    }else{
        res.sendStatus(401);
    }
}

const varifyToken = (req , res, next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const tokenPayload = jwt.verify(token, 'secret key')
        console.log('Token payload',tokenPayload);
         if(tokenPayload.email) next();
         else{
             res.sendStatus(403);
         }
    }else{
        res.sendStatus(401);
    }
}

router.use('/auth',authRouter)
router.use('/posts', varifyToken ,postsRouter);
router.use('/users',usersRouter);
router.use('/admin', isAdmin ,adminRouter)

module.exports = router;