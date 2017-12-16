const Collect = require('../lib/mongo').Collect

module.exports = {
  // 收藏
  addCollect: function addCollect (data) {
    return Collect.create(data).exec()
  },

  removeCollect: function removeCollect (post_id) {
    return Collect.remove({ post_id: post_id }).exec()
  },

  // 通过文章 id 获取该文章下收藏数
  getCollectsCount: function getCommentsCount (post_id) {
    return Collect.count({ post_id: post_id }).exec()
  },

  getCollectStatus: function getCollectStatus (post_id,uid) {
    return Collect.findOne({ post_id: post_id,uid: uid }).exec()
  }
}
