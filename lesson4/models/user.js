const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// 用户信息 -- 数据结构
const UserSchema = new Schema({
   loginname:{type:String},
   password : {type:String},
   email : {type:String},
   url : {type:String},
   active :{type:Boolean,default:false},
   location:{type:String,default:'暂无'},
   profile_image_url : {type:String},
   sigature:{type:String,default:'用户暂无个性签名'}, //用户签名
   rank:{type:Number,default:3},  //级别：0-管理员，1-高级用户，2-普通用户，3-新手
   concerned_topics :[{topicId:ObjectId,topicTitle:String,topicNode:String}],  //关注的文章id集合
   messageCount :{type:Number, default:0 }
});
 UserSchema.index({name:1}); ////建立索引，提高查询熟读，其中 1 是正序，-1是逆序
 mongoose.model('User',UserSchema);
