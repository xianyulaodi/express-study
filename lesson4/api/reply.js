const Reply = require('../models/reply');
const Topic = require('../models/Topic');

module.exports = {
  // 创建保存一条回复信息
  newAndSave(data) {
    return new Promise((resolve,reject) => {
       Reply.create(data,(err,doc) => {
         if(err){
           reject(err);
         }else{
           resolve(doc)
         }
       })
    })
  },
  // 根据topicid来查找相关的回复
  getRepliesByTopicId(query,options,callback){
    Reply.find(query,null,options,callback);
  },
  // 获取评论总数
  getCountByQuery(query,callback){
    Reply.count(query,callback);
  },
  // 更新文章的最近回复信息
  updateLastReply(topicId,replerId,replyName,callback){
    Topic.findOne({_id:topicId},(err,topic) => {
      if(err || !topic) return callback(err);
      topic.last_reply_id = replerId; //回复人的id
      topic.last_reply_at = new Date();
      topic.last_reply_name = replyName ;
      topic.reply_number += 1;
      topic.save(callback);
    })
  },

  // 根据条件查找
  searchByQuery(query,option,callback) {
    Reply.find(query,null,option,(err,replies) => {
      if(err) return callback(err);
      callback(null,replies);
    })
  }
}
