const marked = require('marked')
const Comment = require('../lib/mongo').Comment
const CommentReply = require('../lib/mongo').CommentReply

// 将 comment 的 content 从 markdown 转换成 html
Comment.plugin('contentToHtml', {
  afterFind: function (comments) {
    return comments.map(function (comment) {
      comment.content = marked(comment.content)
      return comment
    })
  }
})

// 获取评论下的回复
Comment.plugin('addCommentReplies', {
  afterFind: function (comments) {
    return Promise.all(comments.map(function (comment) {
      return getCommentReplies(comment._id).then(function (replies) {
        comment.replies = replies
        return comment
      })
    }))
  }
})

// 获取评论下的回复
Comment.plugin('addReplyCount', {
  afterFind: function (comments) {
    return Promise.all(comments.map(function (comment) {
      return getCommentRepliesCount(comment._id).then(function (replyCount) {
        comment.replyCount = replyCount
        return comment
      })
    }))
  }
})

// 通过一个外键与另一张表建立关联时,可使用 populate
function getCommentReplies(commentId) {
  return CommentReply
         .find({ commentId: commentId })
         .populate({ path: 'fromUid', model: 'User' })
         .populate({ path: 'toUid', model: 'User' })
         .exec()
}

// 通过评论 id 获取该评论的回复数
function getCommentRepliesCount(commentId) {
  return CommentReply.count({ commentId: commentId }).exec()
}

module.exports = {
  // 创建一个留言
  create: function create (comment) {
    return Comment.create(comment).exec()
  },

  // 通过留言 id 获取一个留言
  getCommentById: function getCommentById (commentId) {
    return Comment.findOne({ _id: commentId }).exec()
  },

  // 通过留言 id 删除一个留言
  delCommentById: function delCommentById (commentId) {
    return Comment.remove({ _id: commentId }).exec()
  },

  // 通过文章 id 删除该文章下所有留言
  delCommentsByPostId: function delCommentsByPostId (postId) {
    return Comment.remove({ postId: postId }).exec()
  },

  // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
  getComments: function getComments (postId) {
    return Comment
      .find({ postId: postId })
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: 1 })
      .addCreatedAt()
      .addCommentReplies()
      .addReplyCount()
      .contentToHtml()
      .exec()
  },

  // 通过文章 id 获取该文章下留言数
  getCommentsCount: function getCommentsCount (postId) {
    return Comment.count({ postId: postId }).exec()
  },

  //创建评论回复
  create_reply: function create_reply(comment) {
    return CommentReply.create(comment).exec()
  }

}
