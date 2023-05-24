const {MongoClient} = require('mongodb');
const url = ' mongodb://127.0.0.1:27017/';
const dbClient = new MongoClient(url);

dbClient.connect()
.then(()=>{
    console.log('Successfully Connected To Database');
})
.catch(err=>console.log(err))


module.exports = dbClient;