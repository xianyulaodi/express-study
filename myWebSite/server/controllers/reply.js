const validator = require('validator');
const _ = require('lodash');
const Eventproxy = require('eventproxy');
const Reply = require('../api/reply');

exports.add = (req,res,next) => {
    const topicId = req.body.topicId;
    const content = req.body.content;
    const topicNode = req.body.topicNode;
    const topicTitle = req.body.topicTitle;
    // const con = validator.trim(content);
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
    };
    const proxy = new Eventproxy();
    var data={
      content:content,
      replyer_id:replyerId,
      topic_id:topicId,
      topic_title:topicTitle,
      replyer_profile:replyer_profile,
      replyer_name:replyerName
    };

    Reply.newAndSave(data)
    .then(result => {
      var obj = {};
      if(result) {
        obj = {
          success: 1,
          data:result
        }
      } else {
        obj = {
          success: 0,
          msg: "add replies fail"
        }
      }
      proxy.emit('reply',obj);
    });


    Reply.updateLastReply(topicId,replyerId,replyerName,(err) => {
      if(err) return;
      proxy.emit('topic',topicId);
    });
    proxy.all('topic','reply',(topicI,result) => {
      res.json(result);
    });

}
// 根据文章id获取该文章下的所有评论信息
exports.getRepliesByTopicId = (req,res,next) => {
  var topicId=req.query.topicId;
  Reply.getRepliesByTopicId({topic_id:topicId},{},(error,data) => {
    if(error) {
      res.json({
        success: 0,
        msg: 'get replies fail'
      });
      return false;
    }
    res.json({
       success: 1,
       data: data
    })
  });
  /**
  Reply.getRepliesByTopicId({_id:id})
  .then(result => {
    console.log(888);
    if(result){
       res.json({
         success: 1,
         result: result
       });
    }else{
      res.json({
        success: 0,
        result: "get detail fail"
      })
    }
  });**/
}
