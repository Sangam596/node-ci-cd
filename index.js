const {PORT, HOST} = require('./config');
const path = require('path');
const session = require('express-session');

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT;


const express = require('express');
const app = express();

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }
//   }))

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname+ '/public')));


app.set('views','routes');
app.set('view engine','ejs');

var indexRouter = require('./routes');
app.use(indexRouter) //or app.use('/',indexRouter)

app.get('/',(req,res)=>{
    res.render('main1');
})
const authUser =(req, res, next)=>{
    if(req.session.email && req.session.isAdmin){
        next();
    }else{
        res.sendStatus(401);
    }
}
app.get('/signed_user' ,authUser , (req,res)=>{

    res.render('signed_user', {
        email: req.session.email
    })
})

app.listen(port,()=>{
    console.log(`Server is started at http://${hostname}:${port}`)
});