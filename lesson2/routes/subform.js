var express = require('express');
var router = express.Router();
var crypto = require('crypto');

router.get('/', function(req, res) {
  var 
  userName = req.query.txtUserName,
  userPwd = req.query.txtUserPwd,
  userName2 = req.param('txtUserName'),
  userPwd2 = req.param('txtUserPwd');
  var md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列
  var en_upwd = md5.update(userPwd).digest('hex');

  // console.log('req.query用户名:'+userName);
  console.log('加密后的密码:'+en_upwd);
  // console.log('req.param用户名:'+userName2);
  // console.log('req.param密码:'+userPwd2);

  res.render('subform', { title: '提交表单及接收参数示例' });
});

module.exports = router;