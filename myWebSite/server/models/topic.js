const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const db = require('../lib/mongo');

/**
    title: req.body.title,
    content: req.body.content,
    type: type, //文章类型
**/
 // 话题列表
const TopicSchema = new mongoose.Schema({
 	node : {type:String},
 	node_cat: {type:String},
 	title: {type:String},
 	content: {type:String},
 	type: {type:String}, //文章类型
 	author_id: {type: ObjectId },
	top: {type: Boolean, default: false},            //是否为置顶帖
	good: {type: Boolean, default: false},           //是否为精华帖
	reply_ornot: {type: Boolean, default: false},  // **   是否有人回复
	reply_number: {type: Number, default: 0},
	collect_number: {type: Number, default: 0}, // 收藏人数
	visit_number: {type: Number, default: 0},
	create_at: {type: Date, default: Date.now},
	update_at: {type: Date},
	last_reply_id: {type: ObjectId},					 //最后回复人的id
	last_reply_name: {type: String},					 //最后回复人的name
	last_reply_at: {type: Date},
	reader_ips:[],  //阅读者的ip
	author: {
		name:{type: String},
		avatar_url: {type: String}
	},
	watched_fellow: [{type: ObjectId}],               //关注的人们的id
	favored_fellow: [{type: ObjectId}]                //该文章的喜欢人数。这里到时候需要分个表
});

TopicSchema.index({create_at: -1});                  //查看:"最新创建"
TopicSchema.index({top: -1,last_reply_at: -1});      //查看:"默认"
TopicSchema.index({good: -1,last_reply_at: -1});     //查看:"优质帖子"
TopicSchema.index({reply_number: 1,create_at: -1});  //查看:"无人问津"
TopicSchema.index({author_id: 1,favor_fellow_number: -1});  //个人信息:"热门话题"
TopicSchema.index({node_cat:  1, create_at: -1});               //主题页面："该节点下的其他话题"

const Topic = db.model('Topic',TopicSchema);

 module.exports = Topic;

