const Eventproxy = require('eventproxy');
const Collect = require('../api/collect');
const Topic = require('../api/topic');
const User = require('../api/User');
const common = require('../common/common');
const proxy = new Eventproxy();

// 获取作者中心: 用户信息，自己写的文章列表
exports.getAuthorCenter = (req,res,next) => {
  const authorId = req.query.authorId;
  getArticle(req);
  getAuthorInfo(authorId);
  proxy.all('topics','authorInfo',(topics,authorInfo) => {
     common.succRes(res,{"list":topics,"authorInfo":authorInfo});
  });
}
// 获取作者的收藏列表
exports.getCollectList = (req,res,next) => {
  const authorId = req.query.authorId;
  Collect.findByQuery({user_id: authorId},{},(err,list) => {
    if(doc) {
      common.succRes(res,{"list":list});
    }
  });
}
// 获取粉丝列表
exports.getFansList = (req,res,next) => {

}
// 获取关注人的列表
exports.getFocusList = (req,res,next) => {

}

// 获取该作者的文章
function getArticle(req) {
  const authorId = req.query.authorId,
        page = req.query.page || 1,
        pageSize = req.query.pageSize || 10;
  Topic.findByQuery({author_id: authorId},{ skip:(page - 1)* pageSize, limit: pageSize },(err,data) => {
    if(data) {
      proxy.emit('topics',data);
    } else {
      proxy.emit('topics',[]);
    }
  });
}

//获取用户个人信息： 头像，个性签名，名字
function getAuthorInfo(authorId) {
  User.getUserById(authorId)
  .then(result => {
    if(result) {
      var data = {
        userName: result.userName,
        sigature: result.sigature,
        profile_image_url: result.profile_image_url
      }
      proxy.emit('authorInfo',data);
    } else {
      proxy.emit('authorInfo',{});
    }
  });
}
