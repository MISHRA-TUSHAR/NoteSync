
const mongoose = require('mongoose');
require('dotenv').config();



const mongoConnectionApi = process.env.MONGOURL;
mongoose.connect(mongoConnectionApi,{});




const db = mongoose.connection;


db.on('connected',()=>{
    console.log('connected to database');
});

db.on('error',(error)=>{
    console.log(`error connected to ${error}`);
});

db.on('reconnected',()=>{
    console.log('reconnected  to database');
});

module.exports = db;
