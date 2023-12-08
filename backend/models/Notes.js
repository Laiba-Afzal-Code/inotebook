const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
title:{
    type: String,
    require: true
},
discription:{
    type: String,
    require: true,
},
teg:{
    type: String,
},
date:{
    type: Date,
    default: Date.now
},
});
module.exports = mongoose.model('Notes', UserSchema) 