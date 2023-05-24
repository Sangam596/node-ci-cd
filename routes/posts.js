const express = require('express');
const axios = require('axios');
var router = express.Router();


router.post('/create', ( req, res)=>{
    console.log('req.body: ', req.body);
    res.json(req.body)
})
router.get('/:post_id',(req,res)=>{//-> /users/:user_id
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then( resp =>{
        res.render('post',{
            posts:resp.data
        })
    }).catch(err => err);
})

module.exports = router;