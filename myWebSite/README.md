# 正式进入node + express + mongodb 的实战阶段
---

 在lesson3中，我们搭建了一个express+mongoose的脚手架，在这节课当中，我们将进行一个完整的项目实战，从而更进一步的学习node.js

**任务**
用node.js写这个网站： [https://ruby-china.org/topics](https://ruby-china.org/topics);
参考：[https://github.com/funeyu/nodeLab](https://github.com/funeyu/nodeLab)

## 1. 将渲染模板修改为html
```javascript
var ejs = require('ejs');
...
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
```
## 2. 获取url传来的参数
1. `req.query`获取到的是一个object，如果要获取具体值，可以`req.query.id`等,多用于获取get请求
2. `req.params`获取的值是url后面的一部分，比如`GET /topic?id=58ff17984edb452fd0fa2cee&node_cat=node8 200 25.245 ms - 331`,需要自己拆解
3. `req.body`获取一些请求参数，解析body不是nodejs默认提供的，你需要载入`body-parser`中间件才可以使用`req.body`，多用于获取post请求参数


## 3. 分页的做法
1. 可以先获取你要获取的数据的总数，这里需要mongod单独去查一次，比如
```javascript
exports.getCountByQuery(query, callback){
  Topic.count(query,callback);
}
```
2. 分find结合一起使用
```javascript
var query = {};
var limit =Number(req.query.limit) || 10;
var page = Number(req.query.page) || 1;
var options = {skip:(page - 1)* limit,limit:limit };  //这里是用来做分页的地方，参数可以从url那里传过来，后面再对其进行优化
Topic.getTopicsByQuery(query,options,(err,topics) => {
    ep.emit('topics',topics);
});
```
其中`getTopicsByQuery`里面的内容为
```javascript
exports.findByQuery(data,options,callback){
  Topic.find(data,null,options,(err,doc) => {
    if(err){
      return callback(err);
    }
    callback(null,doc);
  })
}
```

自己设计一个类似于简书的产品

** 产品定位：**   技术类博客平台，但是跟其他博客平台肯定要做一些不一样的东西，这个暂时还没想好，可以边做边思考

** 前端：**       vue全家桶; vue + vue-router +vuex
** 后端：**       node + express + mongodb + nginx;
** 打包工具：**   webpack + gulp;
** 期间包括：**   产品定位 + 界面设计 + 前后端优化
** 开发周期：**   2017-7 至 2017-12 半年时间

## todoList:
网站的架构已经出来了，接下来写一下后面的todo列表
1. 首页的分页   done
2. 首页的缓存优化，并发请求的处理
3. 图片的上传
4. 文章的修改编辑
5. 添加个人中心==》 功能包括：修改头像、添加座右铭、修改昵称等等 done
6. 新增评论系统
7. 新增点赞功能
8. 优化文章的编辑，让其支持markdown的编辑模式
9. 完善代码，添加对错误的处理等
10. 添加搜索功能
11. nginx的配置，这个放在最后
12. 排序

2017/5/1今天的任务
1. 首页的分页
2. 评论的生成，回复，删除，统计等。
就这两个任务

2. 写一篇关于path的文章

这个脚手架是我需要的，可以参考，就是要这种类似的效果： http://react-china.org/t/react-express4-mongodb/12730


图片的上传用这个模块 formidable
