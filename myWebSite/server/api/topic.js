// topic的创建，查找等

const Topic = require('../models/topic');

module.exports = {
    /**
    * 添加话题内容
    **/
    newAndSave(data) {
      return new Promise((resolve,reject) => {
         Topic.create(data,(err,doc) => {
           if(err) {
             reject(err);
           } else {
             resolve(doc)
           }
         })
      })
    },

    // 根据查询条件获取主题
    findByQuery(data,options,callback) {
      Topic.find(data,null,options,(err,doc) => {
        if(err) {
          return callback(err);
        }
        callback(null,doc);
      })
    },
    // 获取商品总数
    getCountByQuery(query, callback) {
    	Topic.count(query,callback);
    },

    // 根据id查找主题详细信息
    getTopicById(data) {
      // data = {_id:'59c0e2e2e452f221ac998da1'};
      return new Promise((resolve,reject) => {
        Topic.findOne(data,(err,data) => {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        })
      })
    }
}
