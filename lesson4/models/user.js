const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const db = require('../lib/mongo');

 // 用户信息 -- 数据结构
 const UserSchema = new mongoose.Schema({
   loginname:{type:String},
    pass : {type:String},
    repassword : {type:String},
    email : {type:String},
    url : {type:String},
    active :{type:Boolean,default:false},
    location:{type:String,default:'暂无'},
    profile_image_url : {type:String},
    sigature:{type:String,default:''}, //用户签名
    rank:{type:Number,default:3},  //级别：0-管理员，1-高级用户，2-普通用户，3-新手
    concerned_topics :[{topicId:ObjectId,topicTitle:String,topicNode:String}],  //关注的文章id集合
    messageCount :{type:Number, default:0 }
 });

 UserSchema.index({name:1});
 const User = db.model("User", UserSchema );

 module.exports = User;
 //exports.User= User ;  //这种写法不可以，研究一些这两种写法的不同才行
