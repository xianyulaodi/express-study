# 正式进入node + express + mongodb 的实战阶段
---

 在lesson3中，我们搭建了一个express+mongoose的脚手架，在这节课当中，我们将进行一个完整的项目实战，从而更进一步的学习node.js

**任务**
1. 用node.js写这个网站： [https://ruby-china.org/topics](https://ruby-china.org/topics);
2. 参考：[https://github.com/funeyu/nodeLab](https://github.com/funeyu/nodeLab)
3. 后期可以将这个网站改造成简书类型的，名字待定
4. 前期没有前后端分离，有些部分前后端写在一起了。后期可以将其前后端分离，前端用vue或者react，后端 express+mongoose，也可以考虑koa2+mongoose，目前对koa2不熟悉
5. 后期将语法全部转为 ES6


## 1. 将渲染模板修改为html
```javascript
var ejs = require('ejs');
...
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
```
## 2. 获取url传来的参数
1. `req.query`获取到的是一个object，如果要获取具体值，可以`req.query.id`等
2. `req.params`获取的值是url后面的一部分，比如`GET /topic?id=58ff17984edb452fd0fa2cee&node_cat=node8 200 25.245 ms - 331`,需要自己拆解
3. `req.body`获取一些请求参数，解析body不是nodejs默认提供的，你需要载入`body-parser`中间件才可以使用`req.body`


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

## 图片的上传
1. 使用`req.busboy.on`
首先需要在app.js中require一下，并设置相关参数
```javascript
var busboy =require('connect-busboy');
app.use(busboy({ immediate: true }));

// 然后
var uuid = require('node-uuid')
if (req.busboy) {
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		console.log(fieldname);
		console.log(filename);
		console.log(file);
		console.log(mimetype);
		if(mimetype.substr(0,5)=="image"){//我这里是上传了图片
			var id = uuid.v1();
			console.log(id);
			tmpUploadPath = path.join(conf.__uploads, id+'.jpg');
			file.pipe(fs.createWriteStream(tmpUploadPath));
			msg = {errorno:0,uuid:id,msg:"success"}
		}
    });
    req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {//处理其他非文件字段
		console.log(key);
		console.log(value);
    });
    req.busboy.on('finish', function() {//处理完毕后的回调
        res.json(msg)
    });
}
```

## All-todoList:
网站的架构已经出来了，接下来写一下后面的todo列表
1. 首页的分页    done
2. 首页的缓存优化，并发请求的处理
3. 图片的上传
4. 文章的修改编辑
5. 添加个人中心==》 功能包括：修改头像、添加座右铭、修改昵称等等
6. 新增评论系统   30%
7. 新增点赞功能
8. 优化文章的编辑，让其支持markdown的编辑模式
9. 完善代码，添加对错误的处理等
10. 添加搜索功能
11. nginx的配置，这个放在最后
12. 排序

* 2017/5/1 todoList
1. 首页的分页  done
2. 评论的生成，回复，删除，统计等。  暂时做了评论的 生成和显示
就这两个任务

* 2017/5/4 todoList
1. 个人资料的修改，包括修改昵称，密码，头像上传，个性签名等  done
2. bug修复，跳转到文章详情页，用户登录信息没有传过去,原因是没有传全局的用户信息，用res.locals,将用户的登录信息保存到全局   done
3. 写一篇关于path的文章

* 2017/5/5 todoList
1. 图片上传   ing
2. bug修复和完善
