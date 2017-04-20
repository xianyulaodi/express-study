const api = require('../lib/api');

exports.login = (req,res,next) => {
  var user = {
     username : req.body.username,
     password : req.body.password
  };
  api.findOne(user)
    .then(result => {
       if(result) {
         res.json({
           "data" : result,
           "success" : true,
           "list" : [
             {
               age:18,
               city:'广州',
               companny:'netease'
             }
           ]
         })
       } else {

         res.json({
            "success": false
          })
       }
    })
}
