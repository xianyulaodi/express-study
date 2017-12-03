const User = require('../api/user');
const common = require('../common/common');
const uploadPic = require('../common/uploadPic');
const formidable = require('formidable');
const fs  = require('fs');
const path = require("path");
const config = require('../config');

// 获取用户个人信息
exports.getUserInfo = (req,res,next) => {
  const id = req.session.user._id;
  User.getUserById(id,(err,user) => {
    if(user) {
      const data = {
        userName: user.userName,
        sigature: user.sigature,
        email: user.email,
        profile_image_url: user.profile_image_url,
        location: user.location,
        introdece: user.introdece,
        uid: id
      }
      common.succRes(res,{"userInfo": data});
    } else {
      common.failRes(res,'get info fail');
    }      
  });
};

// 个人资料设置
exports.setUserInfo = (req,res,next) => {
  const
    data = {
      userName: req.body.userName || '',
      sigature: req.body.sigature || '', // 个性签名
      email: req.body.email || '',  //邮箱
      location: req.body.location || '',// 坐标,
      introdece: req.body.introdece || ''// 坐标,
    },
    id = req.session.user._id;
   User.updateData({_id: id},data,{upsert: false})
   .then(result => {
     if(result.ok == 1) {
       req.session.user.userName = data.userName;
       req.session.user.sigature = data.sigature;
       req.session.user.email = data.email;
       req.session.user.location = data.location;
       req.session.user.introdece = data.introdece;
       common.succRes(res);
     } else {
       common.failRes(res,'update info fail');
     }
   });
};

// 直返回用户uid
exports.getUserId = (req,res,next) => {
  var uid = 0;
  if(req.session.user) {
    uid = req.session.user._id;
  }
  common.succRes(res,{ uid: uid });
}

// 检查用户是否登录了
exports.checkIsLogin = (req,res,next) => {
  if(req.session && req.session.user) {
    var uid = req.session.user._id;
    common.succRes(res,{ uid: uid });  
    return false;
  } 
  common.failRes(res,'update info fail');
}


// 上传头像
exports.uploadHeadPic = (req,res,next) => {
    uploadPic.uploadPic(req,res,next,(resUrl) => {
        User.updateData(
            {_id: req.session.user._id},
            {profile_image_url: resUrl},
            {upsert: false}
        ).then(result => {
            if(result.ok == 1) {
                common.succRes(res,{picUrl: resUrl});
                req.session.user.profile_image_url = resUrl;
            } else {
                common.failRes(res,'upload pic fail');
            }
        });
    }); 
}

// 修改密码
// 参数: oldPass,newPass --> 旧密码，新密码
exports.changePass = (req,res,next) => {
  var oldPass = req.body.oldPass;
  var newPass = req.body.newPass;
  if(req.session.user.password != oldPass ) {
    common.failRes(res,'old password not correct');
    return false;
  }
  User.updateData({_id: req.session.user._id },{ password: newPass },{upsert: false})
    .then(result => {
      if(result.ok == 1) {
        common.succRes(res);
      } else {
        common.failRes(res,'update password fail');
      }
  });  
}
