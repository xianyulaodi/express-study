const Collect = require('../lib/mongo').Collect

module.exports = {
  // 收藏
  addCollect: function addCollect (data) {
    return Collect.create(data).exec()
  },

  removeCollect: function removeCollect (postId) {
    return Collect.remove({ postId: postId }).exec()
  },

  // 通过文章 id 获取该文章下收藏数
  getCollectsCount: function getCommentsCount (postId) {
    return Collect.count({ postId: postId }).exec()
  },

  getCollectStatus: function getCollectStatus (postId,uid) {
    return Collect.findOne({ postId: postId,uid: uid }).exec()
  }
}
