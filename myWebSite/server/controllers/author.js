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
  User.getUserById(authorId,(err,result) => {
    if(result) {
      var data = {
        userName: result.userName,
        sigature: result.sigature,
        profile_image_url: result.profile_image_url,
        fansNum : result.fans_num,
        foucsNum: result.focus_num,
        fans_ids: result.fans_ids
      }
      proxy.emit('authorInfo',data);
    } else {
      proxy.emit('authorInfo',{});
    }    
  });
}

// 关注作者
exports.focusAuthor = (req,res,next) => {
  var authorId = req.body.authorId;
  var userId = req.session.user._id;
  if(!common.isLogin(req)) {
    common.noLoginRes(res);
    return false;
  }     
  if(authorId == userId) {
    common.failRes(res,'can not foucs yourself');
    return false;
  }
  updataAuthorFans(authorId,userId,true);
  updateUserFocus(authorId,userId,true);
  proxy.all('upFans','upFocus',(result1,result2) => {
    if(result1.fail || result2.fail) {
      common.failRes(res,'focus fail');
      return false;
    }
    common.succRes(res);
  });  
}

// 更新作者粉丝数
function updataAuthorFans(authorId,userId,isAdd) {
  var options = {
    $inc:{ fans_num:1 },
    $push:{ fans_ids: userId }
  };
  if(!isAdd) {
    options = {
      $inc:{ fans_num: -1 },
      $pull:{ fans_ids: userId }
    }
  }
  User.updateData({ _id: authorId },options,{}).then(result => {
    if(result) {
      proxy.emit('upFans',result);
    } else {
      proxy.emit('upFans',{fail: 1});
    }
  });  
}

// 更新用户关注数
function updateUserFocus(authorId,userId,isAdd) {
  var options = {
    $inc:{ focus_num:1 },
    $push:{ focus_ids: authorId }
  };
  if(!isAdd) {
    options = {
      $inc:{ focus_num: -1 },
      $pull:{ focus_ids: authorId }
    }    
  }
  User.updateData({ _id: userId },options,{}).then(result => {
    if(result) {
      proxy.emit('upFocus',result);
    } else {
      proxy.emit('upFocus',{fail: 1});
    }
  }); 
}

//取消关注作者
exports.unfocusAuthor = (req,res,next) => {
  var authorId = req.body.authorId;
  var userId = req.session.user._id;
  if(!common.isLogin(req)) {
    common.noLoginRes(res);
    return false;
  }
  updataAuthorFans(authorId,userId,false);
  updateUserFocus(authorId,userId,false);
  proxy.all('upFans','upFocus',(result1,result2) => {
    if(result1.fail || result2.fail) {
      common.failRes(res,'un focus fail');
      return false;
    }
    common.succRes(res);
  });    
} 

// 判断是否已关注了该作者
exports.hadFocus = (req,res,next) => {
  const uesrId = req.session.user._id;
  const authorId = req.body.authorId;
  User.getUserById(uesrId,(err,result) => {
    var focusList = result.focus_ids;
    // 已关注
    if(focusList.indexOf(authorId) > -1) {
      common.succRes(res,{"isFocus": 1});
      return;
    } 
    common.succRes(res,{"isFocus": 0});    
  });
}
