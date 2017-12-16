const marked = require('marked')
const Post = require('../lib/mongo').Post
const CommentModel = require('./comments')
const CollectModel = require('./collect')
const FocusModel = require('./focus')

// 给 post 添加留言数 commentsCount
Post.plugin('addCommentsCount', {
  afterFind: function (posts) {
    return Promise.all(posts.map(function (post) {
      return CommentModel.getCommentsCount(post._id).then(function (commentsCount) {
        post.commentsCount = commentsCount
        return post
      })
    }))
  },
  afterFindOne: function (post) {
    if (post) {
      return CommentModel.getCommentsCount(post._id).then(function (count) {
        post.commentsCount = count
        return post
      })
    }
    return post
  }
})

// 给post 添加收藏数 collectCount
Post.plugin('addCollectCount', {
  afterFind: function (posts) {
    return Promise.all(posts.map(function (post) {
      return CollectModel.getCollectsCount(post._id).then(function (count) {
        post.collectCount = count
        return post
      })
    }))
  },
  afterFindOne: function (post) {
    if (post) {
      return CollectModel.getCollectsCount(post._id).then(function (count) {
        post.collectCount = count
        return post
      })
    }
    return post
  }
})

// 给post 添加 该文章收藏状态: 0:未收藏  1: 已收藏
Post.plugin('addCollectStatus', {
  afterFindOne: function (post,uid) {
    post.collectStatus = 0;
    if(!uid) {
      return post
    }
    if (post) {
      return CollectModel.getCollectStatus(post._id,uid).then(function (status) {
        post.collectStatus = status ? 1 : 0;
        return post
      })
    }
    return post
  }
})

// 添加关注状态
Post.plugin('addFocusStatus', {
  afterFindOne: function (post,uid) {
    post.focusStatus = 0;
    if(!uid) {
      return post
    }
    if (post) {
      return FocusModel.getFocusStatus(post.author._id,uid).then(function (status) {
        post.focusStatus = status ? 1 : 0;
        return post
      })
    }
    return post
  }
})

// 将 post 的 content 从 markdown 转换成 html
Post.plugin('contentToHtml', {
  afterFind: function (posts) {
    return posts.map(function (post) {
      post.content = marked(post.content)
      return post
    })
  },
  afterFindOne: function (post) {
    if (post) {
      post.content = marked(post.content)
    }
    return post
  }
})

module.exports = {
  // 创建一篇文章
  create: function create (post) {
    return Post.create(post).exec()
  },

  // 通过文章 id 获取一篇文章
  getPostById: function getPostById (post_id,uid) {
    return Post
      .findOne({ _id: post_id })
      .populate({ path: 'author', model: 'User' })
      .addCreatedAt()
      .addCommentsCount()
      .addCollectCount()
      .addCollectStatus(uid)
      .addFocusStatus(uid)
      .contentToHtml()
      .exec()
  },

  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getPosts: function getPosts (queryObj,page,pageSize) {
    const query = queryObj || {};
    return Post
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: -1 })
      .skip(page-1)  //分页
      .limit(pageSize)
      .addCreatedAt()
      .addCommentsCount()
      .addCollectCount()
      .contentToHtml()
      .exec()
  },

  // 获取热门文章,阅读量最高的五篇文章
  getHotPosts: function getHotPosts () {
    const query = {};
    return Post
      .find(query)
      .sort({ pv: -1 }) // -1 降序 | 1 升序
      .skip(0)  //分页
      .limit(5)  //只需五条
      .exec()
  },

  // 通过文章 id 给 pv 加 1
  incPv: function incPv (post_id) {
    return Post
      .update({ _id: post_id }, { $inc: { pv: 1 } })
      .exec()
  },

  // 通过文章 id 获取一篇原生文章（编辑文章）
  getRawPostById: function getRawPostById (post_id) {
    return Post
      .findOne({ _id: post_id })
      .populate({ path: 'author', model: 'User' })
      .exec()
  },

  // 通过文章 id 更新一篇文章
  updatePostById: function updatePostById (post_id, data) {
    return Post.update({ _id: post_id }, { $set: data }).exec()
  },

  // 通过文章 id 删除一篇文章
  delPostById: function delPostById (post_id) {
    return Post.remove({ _id: post_id })
      .exec()
      .then(function (res) {
        // 文章删除后，再删除该文章下的所有留言
        if (res.result.ok && res.result.n > 0) {
          return CommentModel.delCommentsByPostId(post_id)
        }
      })
  }
}
