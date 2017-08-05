// 这里是注册，登录，登出的 数据库操作

const User = require('../models/user');

module.exports = {
    /**
    * 注册新用户
    **/
    newAndSave(data) {
      return new Promise((resolve,reject) => {
         User.create(data,(err,doc) => {
           if(err){
             reject(err);
           }else{
             resolve(doc)
           }
         })
      })
    },
    /**
    * 登录
    */
    login(loginName,passWord) {
      return new Promise((resolve,reject) => {
        User.findOne({'loginname':loginName,'pass' : passWord },(err,doc) => {
          if(err){;
            reject(err);
          }else{
            resolve(doc);
          }
        })
      })
    }
}
