const mongoose = require('mongoose');
const db = require('../lib/mongo');

const UserSchema = new mongoose.Schema({
    username : { type : String },
    password : { type : String },
    avatar : { type : String },
    age : { type : Number , default : 0 },
    description : { type : String },
    email : { type : String },
    github : { type : String },
    time : { type : Date , defaul : Date.now },
});

const UserModel = db.model("user", UserSchema );

module.exports = UserModel;
