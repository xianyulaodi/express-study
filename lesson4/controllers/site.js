const eventproxy=require('eventproxy'); // eventproxy 模块控制并发, 使用方法可以参考：http://www.cnblogs.com/zichi/p/4913133.html#top
const Topic = require('../controllers/topic');

exports.index = (req,res,next) => {
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
   Topic.getTopicsByQuery(query,options,(err,topics) => {
       ep.emit('topics',topics);
   });
  //  获取话题总数，用于分页
   Topic.getCountByQuery({},(err,tcount) => {
      ep.emit('topic_count',tcount);
   });

   ep.all('topics','topic_count',(topics,topic_count) => {
     return res.render('site/index',{
       topics:topics,
       topic_count:topic_count,
       user:data       //暂时跳转到首页去登录
     })
   })
}
