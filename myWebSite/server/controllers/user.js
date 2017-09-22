const User = require('../api/user');
const common = require('../common/common');
const formidable = require('formidable');
const fs  = require('fs');
const path = require("path");
const config = require('../config');

// 获取用户个人信息
exports.getUserInfo = (req,res,next) => {
   const id = req.session.user._id;
   User.getUserById(id)
   .then(user => {
      if(user) {
        common.succRes(res,{"userInfo": user});
      } else {
        common.failRes(res,'get info fail');
      }
   });
};

// 个人资料设置,这里暂时还有问题
exports.setUserInfo = (req,res,next) => {
  const
    data = {
      userName: req.body.userName || '',
      sigature: req.body.sigature || '', // 个性签名
      email: req.body.email || '',  //邮箱
      location: req.body.location || ''// 坐标
    },
    id = req.session.user._id;
   User.updateData({_id: id},data,{upsert: true})
   .then(result => {
     if(result.ok == 1) {
       req.session.user.userName = userName;
       req.session.user.sigature = sigature;
       req.session.user.email = email;
       req.session.user.location = location;
       common.succRes(res);
     } else {
       common.failRes(res,'update info fail');
     }
   });
};

// 上传头像
exports.uploadHeadPic = (req,res,next) => {
  var form = formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = config.upload.path;
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024; // 单位为byte
  form.type = true;
  form.on('error', function(err) {
    console.error('upload failed', err.message);
    next(err);
  });
  form.parse(req,(err, fields, files) => {
    if (err) {
      res.send(err);
      return;
    };
    var newPath = form.uploadDir + files.imgFile.name;  //imgFile为file的name字段
    fs.renameSync(files.imgFile.path, newPath); //重命名
    const resUrl = '//'+ config.hostname + ':' + config.port +  config.upload.url + files.imgFile.name;
    User.updateData({_id: req.session.user._id},{profile_image_url: resUrl},{upsert: true})
    .then(result => {
      if(result.ok == 1) {
        common.succRes(res,{picUrl: resUrl});
        req.session.user.profile_image_url = resUrl;
      } else {
        common.failRes(res,'upload pic fail');
      }
    });
  });
}
