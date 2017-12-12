const Focus = require('../lib/mongo').Focus


module.exports = {
  // 关注
  focus: function addCollect (data) {
    return Focus.create(data).exec()
  },

  // 取消关注
  unfocus: function unfocus (author) {
    return Focus.remove({ toUid: author }).exec()
  },

  // 获取粉丝数
  getFuns: function getFuns (uid) {
    return Focus.count({ toUid: uid }).exec()
  },

  // 获取关注者数
  getFocus: function getFuns (uid) {
    return Focus.count({ fromUid: uid }).exec()
  },

  getFocusStatus: function getCollectStatus (author,uid) {
    return Focus.findOne({ toUid: author,fromUid: uid }).exec()
  }
}
