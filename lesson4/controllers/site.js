const eventproxy=require('eventproxy'); // eventproxy 模块控制并发, 使用方法可以参考：http://www.cnblogs.com/zichi/p/4913133.html#top
const Topic = require('../controllers/topic');

exports.index = (req,res,next) => {
   var ep=new eventproxy();
   var data={};
   if(req.session.user){
   	  data=req.session.user;
   }
   //  获取主题数据
   Topic.getTopicsByQuery({},{limit:20},(err,topics) => {
       ep.emit('topics',topics);
   });

   ep.all('topics',(topics) => {
     return res.render('site/index',{
       topics:topics,
       user:data       //暂时跳转到首页去登录
     })
   })
}
