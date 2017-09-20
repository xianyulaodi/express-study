const eventproxy=require('eventproxy'); // eventproxy 模块控制并发, 使用方法可以参考：http://www.cnblogs.com/zichi/p/4913133.html#top
//const Topic = require('../controllers/topic');
const validator = require('validator');  //用于表单验证
const api = require('../api/topic');
var config=require('../config');

// 新增主题
exports.addNewTopic = (req,res,next) => {
  if(!req.session.user._id) {
    res.json({
      status: 201, // 201 
      message: "no login"
    });
    return false;
  }
  const data={
    title: req.body.title,
    content: req.body.content,
    type: req.body.type, //文章类型
    authorInfo: {
      name: req.session.user.userName, 
      authorId: req.session.user._id, 
      authorPic: req.session.user.profile_image_url || "" 
    }
  }
  api.newAndSave(data)
  .then(result => {
    if(result){
      res.json({
        "status" : 200,
        "message" : "success",
        "result":result
      });
    } else {
      res.json({
        "status" : 100,
        "message" : "save topic fail"
      });
    }
  })
}

// 根据查询条件获取主题,一次性返回20条数据
const getTopicsByQuery=(query,options,callback) => {
  api.findByQuery(query,options,callback);
};
// 获取首页总数,用于分页
const getCountByQuery = (query, callback) => {
	api.getCountByQuery(query,callback);
}

// 获取文章情页
exports.getArticleDetail=(req,res,next) => {
   var articleId = req.query.articleId;
   api.getTopicById({ _id: articleId })
   .then(result => {
     if(result){
      res.json({
        "status" : 200,
        "message" : "success",
        "data": result
      });
     } else {
      res.json({
        "status" : 100,
        "message" : "get artile detail fail",
      });
     }
   })
}

// 获取所有的文章列表
exports.getTopicList = (req,res,next) => {
   var ep = new eventproxy();
   // var data = {};
   // if(req.session.user) {
   // 	  data = req.session.user;
   // }
   var query = {};
   var limit =Number(req.query.pageSize) || 10;
   var page = Number(req.query.page) || 1;
 	 var options = { skip:(page - 1)* limit,limit:limit };  //这里是用来做分页的地方，参数可以从url那里传过来，后面再对其进行优化
   //  获取主题数据
   getTopicsByQuery(query,options,(err,topics) => {
       ep.emit('topics',topics);
   });
  //  获取话题总数，用于分页
   getCountByQuery({},(err,tcount) => {
      ep.emit('topic_count',tcount);
   });

   ep.all('topics','topic_count',(topics,topic_count) => {
      res.json({
        "status" : 200,
        "message" : "success",  
        "list": topics,
        "total": topic_count 
      });
   })
}

exports.delArticleById = (req,res,nex) => {
  var articleId = req.query.articleId;
  api.delArticleById({ _id: articleId },(err,data) => {
    res.json({
      "status" : 200,
      "message" : "success"
    })
  }) 
}

// 更新文章
exports.updateArticle = (req,res,nex) => {
  var articleId = req.body.articleId;
  var content = req.body.content;
  console.log(articleId,content);
  api.updateArticle({_id: articleId},{content: content},(err,data) => {
    res.json({
      "status" : 200,
      "message" : "success999",
      "data": data
    })
  }) 
}
