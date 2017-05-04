const validator = require('validator');
const _ = require('lodash');
const Eventproxy = require('eventproxy');
const Reply = require('../api/reply');

// 新增评论
exports.add = (req,res,next) => {
    const topicId = req.body.topicId;
    const content = req.body.content;
    const topicNode = req.body.topicNode;
    const topicTitle = req.body.topicTitle;
    const con = validator.trim(content);
    const replyerId = req.session.user._id;
    const replyer_profile = req.session.user.profile_image_url;
    const replyerName = req.session.user.loginname;
    const attached ={
      topicTitle:topicTitle,
      topicNode:topicNode,
      topicId:topicId,
      replyerId:replyerId,
      replyerName:replyerName,
      replyer_profile:replyer_profile
    }
    const proxy = new Eventproxy();
    var data={
      content:con,
      replyer_id:replyerId,
      topic_id:topicId,
      topic_title:topicTitle,
      replyer_profile:replyer_profile,
      replyer_name:replyerName
    }
    console.log(data);
    Reply.newAndSave(data)
    .then(result => {
      if(result){
        proxy.emit('reply');
      }
    });

    Reply.updateLastReply(topicId,replyerId,replyerName,(err) => {
      if(err) return;
      proxy.emit('topic',topicId);
    });
    proxy.all('topic','reply',(topicId) => {
      return res.redirect('/topic?id='+topicId+'&node_cat='+topicNode);
    });
}
