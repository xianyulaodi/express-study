const validator = require('validator');
const _ = require('lodash');
const Eventproxy = require('eventproxy');
const common = require('../common/common');
const User = require('../api/user');
const co  = require('co');
const Reply = require('../api/reply');

// 评论优化： start-------------------------------------------
// 存储评论的信息
function getReplyData(req) {
  var 
    data = {
      content: req.body.content,
      replyer_id: req.session.user._id, // 评论者id
      article_id: req.body.articleId, // 文章id 
      respUser_id: req.body.respUserId, //被评论者id      
    };
    return data;
}
// 添加评论
exports.addComment = (req,res,next) => {
  var data = getReplyData(req);

}
// 回复某条评论
exports.addCommentReply = (req,res,next) => {
  var data = getReplyData(req);
  data.respComentId = req.body.respComentId; //评论的id
}
/**
 {
  total: 13,
  comments: [
    {
      id: "dfjlasj" //评论id
      content: "评论内容",
      userId:　"评论者的id",
      respUser: "589d35738d6d81006c85e7c9", // 被评论者id
      userInfo: {  //评论者的信息
        "objectId": "58d4d9781b69e6006ba65edc",
                "username": "Carson_Ho",
                "avatar": "https://avatars3.githubusercontent.com/u/18041645?v=3",
                "company": "华南理工大学",e       
      }
      "respUserInfo": {  // 被评论人的信息
                "objectId": "589d35738d6d81006c85e7c9",
                "username": "温斯渤",
                "avatar": "https://avatars.githubusercontent.com/u/24890876?v=3",
                "company": "GDUT"
            },  
            topComment: [
        {
                id: "dfjlasj" //评论id
          content: "评论内容",
          userId:　"评论者的id",
          respUser: "589d35738d6d81006c85e7c9", // 被评论者id
                    respComment: "59f5e0a46fb9a06f875f8bb7", // 回复的该条评论id
          userInfo: {  //评论者的信息
            "objectId": "58d4d9781b69e6006ba65edc",
                    "username": "Carson_Ho",
                    "avatar": "https://avatars3.githubusercontent.com/u/18041645?v=3",
                    "company": "华南理工大学",e       
          }
          "respUserInfo": {  // 被评论人的信息
                    "objectId": "589d35738d6d81006c85e7c9",
                    "username": "温斯渤",
                    "avatar": "https://avatars.githubusercontent.com/u/24890876?v=3",
                    "company": "GDUT"
                },                      
                    "topComment": null,
                }             
            ]


    }   
  ]
}
 
 */
// 评论优化 end---------------------------------------------

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
  Reply.getRepliesByArticleId({ article_id:articleId },{},(error,data) => {
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
