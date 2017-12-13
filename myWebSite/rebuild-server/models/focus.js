const Focus = require('../lib/mongo').Focus
const UserModel = require('./users');

// 粉丝群
Focus.plugin('getFansInfo', {
  afterFind: function (fanses) {
    return Promise.all(fanses.map(function (fans) {
      return UserModel.getUserById(fans.fromUid).then(function (fansInfo) {
        fans.fansInfo = fansInfo
        return fans
      })
    }))
  }
})

// 关注群
Focus.plugin('getFocusInfo', {
  afterFind: function (focuses) {
    return Promise.all(focuses.map(function (focus) {
      return UserModel.getUserById(focus.toUid).then(function (focusInfo) {
        focus.focusInfo = focusInfo
        return focus
      })
    }))
  }
})


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
  getFans: function getFans (uid) {
    return Focus.find({ toUid: uid })
           .getFansInfo()
           .exec()
  },

  // 获取关注者数
  getFocus: function getFocus (uid) {
    return Focus.find({ fromUid: uid })
           .getFocusInfo()
           .exec()
  },

  getFocusStatus: function getCollectStatus (author,uid) {
    return Focus.findOne({ toUid: author,fromUid: uid }).exec()
  }
}
