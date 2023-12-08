const mongoose = require('mongoose');

const mongoURL= "mongodb://localhost:27017/";
mongoose.set('strictQuery', true); 
const connectToMongo = async ()=>{
     mongoose.connect(mongoURL, ()=>{
    console.log('connected to mongoDB successfully');
    });
}
module.exports = connectToMongo;