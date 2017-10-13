const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const db = require('../lib/mongo');

 // 用户信息 -- 数据结构
 const UserSchema = new mongoose.Schema({
    userName:{type:String},
    password : {type:String},
    repeatPassword : {type:String},
    email : {type:String},
    url : {type:String},
    active :{type:Boolean,default:false},
    location:{type:String,default:'暂无'},
    profile_image_url : {type:String, default:'//upload.jianshu.io/users/upload_avatars/2061572/c3b59df1-d46b-40c3-8804-f46317f148f4.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120'},
    sigature:{type:String,default:'用户暂无个性签名'}, //用户签名
    rank:{type:Number,default:3},  //级别：0-管理员，1-高级用户，2-普通用户，3-新手
    concerned_topics :[{topicId:ObjectId,topicTitle:String,topicNode:String}],  //关注的文章id集合
    messageCount :{type:Number, default:0 },
    fans_num: {type:Number,default:0},  // 粉丝数量
    focus_num: {type:Number,default:0}, // 关注的人
    fans_ids: [],
    focus_ids: []
 });

 UserSchema.index({name:1});
 const User = db.model("User", UserSchema );

 module.exports = User;
 //exports.User= User ;  //这种写法不可以，研究一些这两种写法的不同才行
