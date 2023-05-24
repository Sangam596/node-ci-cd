const dotenv = require('dotenv');
dotenv.config();

module.exports={
    host:process.env.HOST,
    port:process.env.PORT,
    NODE_ENV:process.env.NODE_ENV
    
};
