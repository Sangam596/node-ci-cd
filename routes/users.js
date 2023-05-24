const { default: axios } = require('axios');
const express = require('express');
var router = express.Router();

router.get('/:user_id',(req,res)=>{//-> /users/:user_id
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then( resp =>{
        res.render('user',{
            users:resp.data
        })
    }).catch(err => err);
})

module.exports = router;