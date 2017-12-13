const Collect = require('../lib/mongo').Collect
const PostModel = require('./posts')

// 给post 添加收藏数 collectCount
Collect.plugin('findPostById', {
  afterFind: function (postIds) {
    return Promise.all(postIds.map(function (postId) {
      return PostModel.getRawPostById(postId).then(function (post) {
        postIds.post = post
        return postIds
      })
    }))
  }
})

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
  },

  // 根据用户id,查询该用户下的所有文章收藏id
  getCollectsByUserId: function getCollectsByUserId(uid,page = 1,pageSize = 10) {
    return Collect
        .find({ uid: uid })
        .populate({ path: 'author', model: 'User' })
        .sort({ _id: -1 })
        .skip(page-1)  //分页
        .limit(pageSize)
        .addCreatedAt()
        .findPostById()
        .exec()
  }
}
/**
 *  [
 *   {
 *    _id: 5a2fbe0635469e2828cbf689,
      uid: 5a268a1ea200260bacbc0a7d,
      postId: 5a2e7ea91175a11968895d7c,
      created_at: '2017-12-12 19:31'
    }
  ]
 */
