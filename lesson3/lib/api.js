const UserModel = require('../models/users');

module.exports = {
  /**
  * 添加数据
  * @param {[type]}  data 需要保存的数据对象
  */
  save(data) {
    return new Promise((resolve,reject) => {
       UserModel.create(data,(err,doc) => {
         if(err){
           reject(err)
         }else{
           resolve(doc)
         }
       })
    })
  },
  // 查找数据
  find(data={},fields=null,options={}){
    return new Promise((resolve,reject) => {
      UserModel.find(data,fields,options,(err,doc) => {
        if(err){
          reject(err)
        }else{
          resolve(doc)
        }
      })
    })
  },
  findOne(data) {
     return new Promise((resolve,reject) => {
       UserModel.findOne(data,(err,doc) => {
         if(err){
           reject(err)
         }else{
           resolve(doc)
         }
       })
     })
  },
  findById(data) {
    return new Promise((resolve,reject) => {
      UserModel.findById(data,(err,doc) => {
        if(err){
          reject(err)
        }else{
          resolve(doc)
        }
      })
    })
  },
  update(conditions,update) {
    return new Promise((resolve,reject) => {
      UserModel.update(conditions,update,(err,doc) => {
        if(err){
          reject(err)
        }else{
          resolve(doc)
        }
      })
    })
  },
  remove(conditions) {
    return new Promise((resolve,reject) => {
      UserModel.remove(conditions,(err,doc) => {
        if(err){
          reject(err);
        }else{
          resolve(doc);
        }
      })
    })
  }

}
