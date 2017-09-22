const Collect = require('../models/collect');
const Topic = require('../api/topic');

module.exports = {
  /**
  * 添加收藏
  **/
  addCollect(data) {
    return new Promise((resolve,reject) => {
      Collect.create(data,(err,doc) => {
        if(err) {
          reject(err);
        } else {
          resolve(doc)
        }
      })
    })
  },
  //取消收藏
  unCollect(query,callback) {
    Collect.remove(query,callback);
  },
  // 更新文章收藏数量
  updateArticleCollectNum(articleId,type,callback) {
   Topic.getTopicById({ _id: articleId })
    .then( (topic) => {
      if(topic) {
        if(type == 'add') {
          topic.collect_number += 1;
        } else {
          topic.collect_number -= 1;
        }
        topic.save(callback);
      }
    });
  },
  // 根据某些条件查找收藏信息
  findByQuery(data,options,callback) {
    Collect.find(data,null,options,(err,doc) => {
      if(err) {
        return callback(err);
      }
      callback(null,doc);
    })
  },
  // 是否已经收藏该文章
  findCollectExist(data,callback) {
    Collect.findOne(data,(err,result) => {
      if(err) return callback(err);
      callback(null,result);
    });
  }

}
