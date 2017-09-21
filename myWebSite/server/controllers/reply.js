const validator = require('validator');
const _ = require('lodash');
const Eventproxy = require('eventproxy');
const common = require('../common/common');
const Reply = require('../api/reply');

// 添加评论
exports.add = (req,res,next) => {
  if(!common.isLogin(req)) {
    common.noLoginRes(res);
    return false;
  } 
  const 
    articleId = req.body.articleId,
    content = req.body.content,
    replyerId = req.session.user._id,
    replyer_name = req.session.user.userName,
    replyer_profile = req.session.user.profile_image_url || '',
    proxy = new Eventproxy(),
    data = {
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
      common.failRes(res,'get repiles fail');
      return false;
    }
    common.succRes(res,{"list": data});
  });
}

exports.delComment = (req,res,next) => {
  var replyId = req.body.replyId; // 评论id
  var replyerId = req.body.replyerId; // 评论者id
  if(req.session.user._id != replyerId ) {
    common.failRes(res,'not your article');
    return false;    
  }
  Reply.delReplyByReplyId({ _id:replyId },(error,data) => {
    if(error) {
      common.failRes(res,'del reply fail');
      return false;
    }
    common.succRes(res);
  });  
 
}
