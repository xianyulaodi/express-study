const validator = require('validator');
const _ = require('lodash');
const Eventproxy = require('eventproxy');
const Reply = require('../api/reply');

// 添加评论
exports.add = (req,res,next) => {
  if(!req.session.user._id) {
    res.json({
      status: 201,
      message: "no login"
    });
  }
  const 
    articleId = req.body.articleId,
    content = req.body.content,
    replyerId = req.session.user._id,
    replyer_name = req.session.user.userName,
    replyer_profile = req.session.user.profile_image_url || '';
    const proxy = new Eventproxy();
    var data={
      content: content,
      replyer_id: replyerId,
      article_id: articleId,
      replyer_profile: replyer_profile,
      replyer_name: replyer_name
    };

    Reply.newAndSave(data)
    .then(result => {
      var obj = '';
      if(result) {
        obj = {
          "status" : 200,
          "message" : "success"
        }
      } else {
        obj = {
          "status" : 100,
          "message" : "add replies fail"
        }
      }
      proxy.emit('reply',obj);
    });

    // 更新文章的评论
    Reply.updateLastReply(articleId,replyerId,replyer_name,(err) => {
      if(err) return;
      proxy.emit('topic',articleId);
    });

    proxy.all('topic','reply',(articleId,result) => {
      res.json(result);
    });
}

// 根据文章id获取该文章下的所有评论信息
exports.getComments = (req,res,next) => {
  var articleId=req.query.articleId;
  Reply.getRepliesByArticleId({article_id:articleId },{},(error,data) => {
    if(error) {
      res.json({
        success: 100,
        message: 'get replies fail'
      });
      return false;
    }
    res.json({
      "status": 200,
      "message": "success",  
      "list": data    
    });
  });
}

exports.delComment = (req,res,next) => {
  var replyId = req.query.replyId; // 评论id
  var replyerId = req.query.replyerId; // 评论者id
  if(req.session.user._id != replyerId ) {
    res.json({
      success: 100,
      message: 'not your article'
    });
    return false;    
  }
  Reply.delReplyByReplyId({ _id:replyId },(error,data) => {
    if(error) {
      res.json({
        success: 100,
        message: 'del reply fail'
      });
      return false;
    }
    res.json({
      "status": 200,
      "message": "success",     
    });
  });  
 
}
