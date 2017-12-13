const Collect = require('../lib/mongo').Collect
const PostModel = require('../models/posts')

Collect.plugin('findPostById', {
  afterFind: function (collects) {
    return Promise.all(collects.map(function (collect) {
      return PostModel.getPostById(collect.postId).then(function (post) {
        collect.post = post
        return collect
      })
    }))
  }
})

module.exports = {

   // 根据用户id,查询该用户下的所有文章收藏id
  getCollectsByUserId: function getCollectsByUserId(uid,page = 1,pageSize = 10) {
    return Collect
          .find({ uid: uid })
          .skip(page-1)  //分页
          .limit(pageSize)
          .addCreatedAt()
          .findPostById()
          .exec()
  }

}
