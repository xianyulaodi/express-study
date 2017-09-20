const User = require('../api/user');

module.exports = {
  // 获取用户个人信息
  getUserInfo(req,res,next) {
       var id = req.query.userId;
       User.getUserById(id)
       .then(user => {
          if(user) {
            res.json({
              success: 1,
              user: user
            });
          } else {
            res.json({
              success: 0,
              msg: 'fail'
            })
          }
       })
  },
  // 个人资料设置,这里暂时还有问题
  setUserInfo(req,res,next) {
    if(req.session.user) {
      var id = req.session.user._id;
      User.getUserById(id)
      .then(user => {
        if(user){
          user.profile_image_url = req.body.headerimage;
          user.email = req.body.email;
          user.sigature = req.body.sigature;
          user.location = req.body.address;
          user.loginname = req.body.name;
          user.password = req.body.password;
          User.updateData({_id:id},user,{upsert: true})
          .then(result => {
            if(result.ok == 1){
              req.session.user = user;
              res.json({
                success: 1,
                msg: 'update success'
              });
            }else{
              res.json({
                success: 0,
                msg: 'update fail'
              });
            }

          })
        }
      })
    } else {
       res.json({
         success: 0,
         msg: "no login"
       })
    }
  }
}
