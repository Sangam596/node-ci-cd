const dbClient = require('../db');
const passwordHash = require('password-hash');

const createUser = user =>{
   return new Promise((resolve,reject)=>{
            const db = dbClient.db('myDB');
            const userCollection = db.collection('users');
                userCollection.insertOne({
                    email:user.email,
                    password:passwordHash.generate(user.password)
                })
                .then(DBres=>{
                    console.log(`DB Responce : ${JSON.stringify(DBres)}`)
                    resolve();
                })
                .catch(err=>{
                    console.log(`error: ${err}`)
                    reject();
                })
    })
}

const varifyUser = (user, callback)=>{
    const db = dbClient.db('myDB');
    const userCollection = db.collection('users');
    userCollection.findOne({
        email:user.email
    })
    .then((dbUser) => {
        if(dbUser){
            const varifyPassword = passwordHash.verify(user.password,dbUser.password)
            if(varifyPassword){
                callback();
            }else{
                callback(null,{
                    message:`Please Varify Credentials provided !`
                });
            }
        }else{
            callback(null,{
                message:`User not found. Please Sign Up!`
            });
        }
    }).catch((err) => {
        callback(err)
    });
}
module.exports.createUser = createUser;
module.exports.varifyUser = varifyUser;
