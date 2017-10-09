const eventproxy=require('eventproxy'); // eventproxy 模块控制并发, 使用方法可以参考：http://www.cnblogs.com/zichi/p/4913133.html#top
const validator = require('validator');  //用于表单验证
const ip = require('ip');
const api = require('../api/topic');
const common = require('../common/common');
var config=require('../config');
var log = require('log4js').getLogger("log_file"); // 日志统计

// 新增主题
exports.addNewTopic = (req,res,next) => {
  if(!req.session.user._id) {
    res.json({
      status: 201, // 201
      message: "no login"
    });
    return false;
  }
  const data = {
    title: req.body.title,
    content: req.body.content,
    type: req.body.type || '', //文章类型
    author_id: req.session.user._id,
    authorInfo: {
      name: req.session.user.userName,
      authorId: req.session.user._id,
      authorPic: req.session.user.profile_image_url || ""
    }
  }
  api.newAndSave(data)
  .then(result => {
    if(result) {
      common.succRes(res,{data: result});
      log.info('add new topic success');
    } else {
      common.failRes(res,'save topic fail');
      log.error('add new topic fail');
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
     if(result) {
      common.succRes(res,{data:result});
      log.info('get article detail success');
      countArticleRead(result); //更新文章阅读量
     } else {
      common.failRes(res,'get artile detail fail');
      log.error('get article detail fail');
     }
   })
}

// 获取所有的文章列表
exports.getTopicList = (req,res,next) => {
   var ep = new eventproxy();
   var query = {};
   var limit =Number(req.query.pageSize) || 10;
   var page = Number(req.query.page) || 1;
 	 var options = { skip:(page - 1)* limit,limit:limit };  //这里是用来做分页的地方，参数可以从url那里传过来，后面再对其进行优化
   // 获取主题数据
   getTopicsByQuery(query,options,(err,topics) => {
       ep.emit('topics',topics);
   });
   // 获取话题总数，用于分页
   getCountByQuery({},(err,tcount) => {
      ep.emit('topic_count',tcount);
   });

   ep.all('topics','topic_count',(topics,topic_count) => {
      common.succRes(res,{"list":topics,"total":topic_count});
      log.info('get topiclist success');
   })
}
// 删除文章
exports.delArticleById = (req,res,nex) => {
  var articleId = req.body.articleId;
  var authorId = req.body.authorId;
  if(req.session.user._id != authorId ) {
    common.failRes(res,'not your article');
    log.error('del article fail');
    return false;
  }
  api.delArticleById({ _id: articleId },(err,data) => {
    common.succRes(res);
    log.info('del article success');
  })
}

// 更新文章
exports.updateArticle = (req,res,nex) => {
  var articleId = req.body.articleId;
  var content = req.body.content;
  var title = req.body.title;
  api.updateArticle({_id: articleId},{ 
    content: content,
    title: title 
  }).then(result => {
     if(result){
        common.succRes(res);
        log.info('update article success');
     } else {
        common.failRes(res,'update article fail');
        log.info('update article fail');
     }
   })
}

// 统计文章阅读量
function countArticleRead(data) {
  var readerIp = ip.address(); // 获取读者的ip地址，统计文章阅读量，一个ip地址统计一次
  var readerIps = data.reader_ips || [];
  var isRead = readerIps.indexOf(readerIp) > -1; 
  if(isRead) {
    return false;
  }
  api.updateArticle({_id: data._id},{ 
    $inc:{ visit_number: 1 },
    $push:{ reader_ips: readerIp }
  }).then(result => {
    if(result){
      common.succRes(res);
      log.info('count article read success');
    } else {
      common.failRes(res,'count read num fail');
      log.error('count article read fail');
    }
  });  
}

// 搜索，模糊匹配
exports.search = (req, res,next) => {
  var str = req.query.title,
      page = req.query.page || 1,
      q = {};    
  if (str) {  
    var pattern = new RegExp("^.*"+ str +".*$");
    q.title = pattern;
  }
  var rankObj = {};
  rankObj.visit_number = 1;    //以阅读量为排序
  api.search(q, rankObj, page,(err, data, length) => {
    if (err) {
      common.failRes(res,'search fail');
      log.error('search '+str+'fail');
      return false;
    }
    common.succRes(res,{"list":data,"total":length});
    log.error('search '+str+'success');
  });
};


