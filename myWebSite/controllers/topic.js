const eventproxy=require('eventproxy'); // eventproxy 模块控制并发, 使用方法可以参考：http://www.cnblogs.com/zichi/p/4913133.html#top
//const Topic = require('../controllers/topic');
const validator = require('validator');  //用于表单验证
const api = require('../api/topic');
var config=require('../config');

// 新增主题,这里有待完善
exports.addNewTopic = (req,res,next) => {
   if(!req.session.user._id) {
     res.json({
       success: 0,
       msg: 'no login'
     });
     return false;
   }
   var node_cat=req.body.node;
   var node = config.nodes[node_cat].name;
   var title = req.body.title;
   var content = req.body.content;
   var author = {};
   author.avatar = req.session.user.profile_image_url ? req.session.user.profile_image_url : '';
   author.name = req.session.user.loginname ? req.session.user.loginname : '';
   author.authorId = req.session.user._id ? req.session.user._id : '';
   var data={
      node_cat: node_cat,
      node: node,
      title: title,
      content: content,
      author: author
   }
   api.newAndSave(data)
   .then(result => {
     if(result){
        res.json({
          success: 1,
          data: result
        })
     }else {
       res.json({
         success: 0,
         msg: "save topic fail"
       });
        // 到时候需要跳转到错误提示页
        console.log('存入主题失败');
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

// 获取列表详情页
exports.getTopicDetail=(req,res,next) => {
   var id=req.query.id;
   api.getTopicById({_id:id})
   .then(result => {
     if(result){
        res.json({
          success: 1,
          result: result
        });
     }else{
       res.json({
         success: 0,
         result: "get detail fail"
       })
     }
   })
}

// 获取所有的文章列表
exports.getAllTopic = (req,res,next) => {
   var ep=new eventproxy();
   var data={};
   if(req.session.user){
   	  data=req.session.user;
   }
   var query = {};
   var limit =Number(req.query.limit) || 10;
   var page = Number(req.query.page) || 1;
 	 var options = {skip:(page - 1)* limit,limit:limit };  //这里是用来做分页的地方，参数可以从url那里传过来，后面再对其进行优化
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
       topics:topics,
       topic_count:topic_count,
       user:data       //暂时跳转到首页去登录
     });
   })
}
