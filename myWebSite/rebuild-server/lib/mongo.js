const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

// 用户相关
exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' },
  user_power: { type: 'number'} //用户权限，0:无，1:有
})
exports.User.index({ name: 1 }, { unique: true }).exec()// 根据用户名找到用户，用户名全局唯一

const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

// 文章相关
exports.Post = mongolass.model('Post', {
  author: { type: Mongolass.Types.ObjectId },
  title: { type: 'string' },
  content: { type: 'string' },
  type: { type: 'string' }, //文章类型
  article_up: { type: 'string'},  //'是否置顶:0为否，1为是'
  home_show: { type: 'string'}, // 首页展示，1： 审核中 2： 审核通过 3：审核不通过
  is_recommend: { type: 'string'},  //'是否推荐:0为否，1为是'
  pv: { type: 'number' }
})
exports.Post.index({ author: 1, _id: -1 }).exec()// 按创建时间降序查看用户的文章列表


//文章评论
exports.Comment = mongolass.model('Comment', {
  author: { type: Mongolass.Types.ObjectId },
  content: { type: 'string' },
  post_id: { type: Mongolass.Types.ObjectId }
})
exports.Comment.index({ post_id: 1, _id: 1 }).exec()// 通过文章 id 获取该文章下所有留言，按留言创建时间升序


//某条评论下的所有评论回复
exports.CommentReply = mongolass.model('CommentReply',{
  comment_id: { type: Mongolass.Types.ObjectId }, //评论id
  reply_id: { type: Mongolass.Types.ObjectId }, // reply_id：表示回复目标的id，如果reply_type是comment的话，那么reply_id＝commit_id，如果reply_type是reply的话，这表示这条回复的父回复。
  content: { type: 'string' },
  reply_type: { type: 'string'},  // 是针对评论的回复(comment)，还是是针对回复的回复(reply)。
  from_uid: { type: Mongolass.Types.ObjectId },  // 回复用户id
  to_uid: { type: Mongolass.Types.ObjectId }    //目标用户id
})
exports.CommentReply.index({ comment_id: 1, from_uid: 1 }).exec()  // 通过评论 id 获取该评论下的所有评论回复


// 文章收藏
exports.Collect = mongolass.model('Collect',{
  post_id: { type: Mongolass.Types.ObjectId }, // 文章id
  uid : { type: Mongolass.Types.ObjectId }   // 用户uid
})
exports.Collect.index({ post_id: 1 }).exec()


// 关注作者
exports.Focus = mongolass.model('Focus', {
  to_uid: { type: Mongolass.Types.ObjectId },    // 被关注者id
  from_uid : { type: Mongolass.Types.ObjectId }  // 关注者id
})
exports.Focus.index({ to_uid: 1 }).exec()
