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
    },
    /**
    * 获取用户信息
    **/
    getUserById(id) {
      return new Promise((resolve,reject) => {
        User.findOne({_id:id},(err,doc) => {
          if(err){
            reject(err);
          }else{
            resolve(doc);
          }
        })
      })
    },

    /**更新数据，三个参数: 查询的条件，更新的数据，options忘了*/
    updateData(condition,updateData,options){
      return new Promise((resolve,reject) => {
        User.update(condition,updateData,options,(err,doc) => {
          if(err){
            reject(err)
          }else{
            resolve(doc);
          }
        })
      })
    }
}
