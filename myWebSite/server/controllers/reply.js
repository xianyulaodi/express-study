const validator = require('validator');
const _ = require('lodash');
const Eventproxy = require('eventproxy');
const common = require('../common/common');
const User = require('../api/user');
const co  = require('co');
const Reply = require('../api/reply');

// 添加评论
exports.add = (req,res,next) => {
  if(!common.isLogin(req)) {
    common.noLoginRes(res);
    return false;
  } 
  const 
    articleId = req.body.articleId,
    authorId = req.body.authorId,
    content = req.body.content,
    replyerId = req.session.user._id,
    proxy = new Eventproxy(),
    data = {
      content: content,
      replyer_id: replyerId,
      article_id: articleId,
      author_id: authorId,
      create_at: common.getTimeNow()
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
    Reply.updateReply(articleId,replyerId,(err) => {
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
    combineAuthorInfoWithReply(data,res);
  });
}

function combineAuthorInfoWithReply(replies,res) {
  var data = replies;
  co(function* () {
    var replyList = [];
    for(var i = 0,len = data.length; i < len; i++) {
      var replyInfo = data[i];
      var replyer_id  = replyInfo.replyer_id;         
      yield new Promise((resolve, reject) => {
        User.getUserById(replyer_id,(err,user) => {
          if(user) {
            replyInfo.replyer.name = user.userName;
            replyInfo.replyer.avatar_url = user.profile_image_url;
          }
          replyList.push(replyInfo);
          resolve(true);          
        });
      });
    }
    common.succRes(res,{"list": replyList});
  }); 
}

exports.delComment = (req,res,next) => {
  var replyId = req.body.replyId; // 评论id
  Reply.delReplyByReplyId({ _id:replyId },(error,data) => {
    if(error) {
      common.failRes(res,'del reply fail');
      return false;
    }
    common.succRes(res);
  });  
 
}
