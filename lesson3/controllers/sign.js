const api = require('../lib/api');
/**
* 注册页面的controller
**/
exports.sign_up = (req,res,next) => {
  var user = {
    username : req.body.username,
    password : req.body.password,
    email : req.body.email
  }
  api.save(user)
  .then(result => {
    console.log(result);
    if (result) {
      res.json({
        data: result,
        success: true
      })
    } else {
      res.json({
        data: result,
        success: false
      })
    }
  })
}
