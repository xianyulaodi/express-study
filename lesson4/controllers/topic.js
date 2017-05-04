const validator = require('validator');  //用于表单验证
const EventProxy = require('eventproxy');
const api = require('../api/topic');
const Reply = require('../api/reply');
// const remarkable = require('remarkable'); // 这个用于代码高亮，1.0版本暂时不用，优化的时候再使用
const config=require('../config');

// 新增主题,这里有待完善
exports.addNewTopic = (req,res,next) => {
   var node_cat=validator.trim(req.body.node);
   node_cat=validator.escape(node_cat);
   var node = config.nodes[node_cat].name;
   var title=validator.trim(req.body.title);
   title=validator.escape(title);
   var content=validator.trim(req.body.content);
   var author={};
   //author.avatar= req.session.user.profile_image_url ? req.session.user.profile_image_url : '';
   //author.name= req.session.user.loginname ? req.session.user.loginname : '';
   //var id=req.session.user._id ? req.session.user._id : '';
   var id = ''
   var data={
      node_cat:node_cat,
      node:node,
      title:title,
      content:content,
      author:author,
      id:id
   }
   api.newAndSave(data)
   .then(result => {
     if(result){
        res.redirect('/')
     }else {
        // 到时候需要跳转到错误提示页
        console.log('存入主题失败');
     }
   })
}

// 根据查询条件获取主题,一次性返回20条数据
exports.getTopicsByQuery=(query,options,callback) => {
  api.findByQuery(query,options,callback);
};
// 获取首页总数,用于分页
exports.getCountByQuery = (query, callback) => {
	api.getCountByQuery(query,callback);
}

// 获取列表详情页，回复内容(或者说评论内容)。  获取同节点下的其他话题待定
exports.getTopicDetail=(req,res,next) => {
   const id=req.query.id;
   const node_cat = req.query.node_cat;
   const proxy = new EventProxy();
   api.getTopicById({_id:id})
   .then(topic => {
     if(topic){
       proxy.emit('topic',topic);
     }else{
        res.send('获取详情页数据失败');
     }
   });
   var query ={topic_id:id};
   var options = {sort:'create_at'};
   Reply.getRepliesByTopicId(query,options,(err,replies) => {
      //  replies.forEach(function(reply){
      //        reply.conent =  reply.content;
      //  });
      proxy.emit('replies',replies);
   });
   proxy.all('topic','replies',(topic,replies) => {
       console.log(replies);
       res.render('site/topic',{
         topic:topic,
         replies:replies
       })
   })
}
