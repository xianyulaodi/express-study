## myBlog 

## 开发环境

- Node.js: `8.9.1`  // 新装了系统，用supervisor 启动8.9.1的，会内存泄漏，何解？  6.1.0 版本的就不会
- MongoDB: `3.4.10`
- Express: `4.16.2`

## mongolass 

   地址: https://github.com/mongolass/mongolass
   API: 和 node-mongodb-native一样  http://mongodb.github.io/node-mongodb-native/2.2/api/

## 使用UI: semantic-ui

  http://www.semantic-ui.cn/


todoList 

1. [x] 登陆

2. [x] 注册

3. [x] 退出

4. [x] 新增文章

5. [x] 获取文章详情

6. [x] 获取所有文章

7. [x] 新增文章评论

8. [x] 获取文章评论

9. [x] 评论的回复

10. [x] 删除某条评论

11. [x] 删除某篇文章

12. [x] 修改某篇文章

13. [x] 头像上传,图片上传

14. [x] 阅读量的统计,除去重复统计

15. [x]  为服务的运行记录日志或者错误日志  关注这篇文章:https://github.com/nomiddlename/log4js-node   
      (使用的是log4js。注意log4js的版本，这里用的是0.6.15的版本。2.x的版本配置文件不一样)

16. [x] 热门文章 阅读量最高的五篇文章

17. [x] 根据某个分类查找某类文章

20. [x] 搜索

21. [x] 个人中心，包括该用户写的文章，收藏的文章， 关注数，粉丝数

22. [x] 收藏，取消收藏，对应文章数的增加和减少

23. [x] 关注作者、取消关注作者

24. [x] 密码加密,Base64 + 随机密码  (参考这篇文章：https://github.com/kuangshp/node-password)

[x] 用户中心设置: 用户性，个性签名，坐标，邮箱
[x] 修改密码
[x] web socket 来进行用户反馈的聊天。 群聊

[] 引入nginx   
[] 进程管理  process,自动重启，某个进程如果有问题，kill掉。负载均衡
[] 文章排序:  根据：1. 评论 2.阅读量 3.最新   http://blog.csdn.net/wangliqiang1014/article/details/16861337
[] 加tocken防止 csrf
[] 百度统计
[] 缩进全部改为四个空格
[x] 设置请求超时  connect-timeout 打算用这个模块
[] 登陆超时 //把sesssion过期时间设置短一点就可以了

10月11号任务: done
  web socket 来进行用户反馈的聊天
  参看这个demo: https://github.com/wuyanxin/chatapp-demo
  客户端引入404问题： http://blog.csdn.net/changhuzhao/article/details/50884231
  api地址: https://socket.io/get-started/chat/


后台管理
[x]  banner广告图，新增广告的后端管理系统
[x]  首页文章的审核，审核通过才可以发布到首页
[]  访问数据列表，每天网站有多少访问量的统计、访问的地方、渠道(比如手机访问还是浏览器，什么浏览器等、用户的访问时间)
[] 权限访问控制、比如超级管理员什么的
权限访问的模块： node_acl 待定
https://github.com/OptimalBits/node_acl
https://github.com/wuwanyu/node_aclDemo 


bugs
[] 选择某个类型的文章，数据切换了，tab没切换
[] 评论回复自己不能回复自己。考虑要不要修复
[] node8.9.1版本的话，cpu占据的有点高，要检查一下哪里的cpu比较高
所以暂时用回node 6.1.0版本

在node中，child_process这个模块非常重要。掌握了它，等于在node的世界开启了一扇新的大门。
https://segmentfault.com/a/1190000007735211  process_child这篇文章写的比较好

-------------------------------------------------------------------------------------------------------

10月份计划:

1. 完成这个博客的所有后端部分，优化并美化代码。

2. 整理一份接口文档

3. 输出几份博客： 
   a. nginx以及它的一些配置  参考： http://www.jianshu.com/p/fd25a9c008a0?utm_campaign=maleskine&utm_content=note&utm_medium=pc_all_hots&utm_source=recommendation
   b. socket.io的使用  socket中实现私聊: https://cnodejs.org/topic/557a999216839d2d539361a3
   http://blog.csdn.net/blueblueskyhua/article/details/70807847   vue+websocket+express+mongodb实战项目（实时聊天）（一）
   c. node 中添加日志统计  参考：https://github.com/nomiddlename/log4js-node 
   d. node中密码加密  参考：https://github.com/kuangshp/node-password
   ...

4. [x] 看看ES6的文章: https://juejin.im/post/59d7790e6fb9a00a496e926a

5. [x] https://ioliu.cn/2017/add-valine-comments-to-your-blog/  hexo新增评论  

6. [x] mongodb返回的对象中不能新增或者删除新属性的坑： http://www.cnblogs.com/fhen/p/5322493.html

7. 前端数据加密，反爬虫有哪些策略



2017-12月计划=====================================================================================

1. 月底上线，上线的功能只有文章列表和文章详情，其他功能暂时都不开放

2. 修改样式

3. 代码高亮


=====================================================================================


知识点：
------------------------------------------------------------------------------------
1. co模块，可以异步执行一些操作
co(function* () {
  var arr = [];
  for(var i = 0,len = 20; i < len; i++) {
    yield new Promise((resolve, reject) => {
      setTimeout(function() {
        arr.push(123);
        resolve(true);
      },10);
    });
  }
  console.log(arr);
  console.log('next');
}); 

2. 让浏览器变得可以编辑，控制台上写
document.body.contentEditable=true


3. mongodb 通过一个外键与另一张表建立关联时,可使用 populate

例:
```javascript
// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
getComments: function getComments (postId) {
  return Comment
    .find({ postId: postId })
    .populate({ path: 'author', model: 'User' })
    .exec()
}
```

4. a/b模块之间不能相互引用，由于node.js避免相互引用的死循环，所以，会有一个模块引用另一为空的情况。
解决方法： 最好不要相互引用，或者用第三个js，c来引用这两个模块，因为a/b模块在c中是加载完成的
或者用c来分别引用 a/b，而不是将两者互相引用


5. 将 `app.set('views', path.join(__dirname, '/views'))` 改为 `app.set('views', path.join(__dirname, './views'))`.可以解决views里面设置多个文件夹的问题  比如 views/admin/index.ejs  views/article/index.ejs  

6. https://www.cnblogs.com/aaron-leb/p/5706176.html  数据库设计

7. 高效升级插件npm-check-updates
   
  全局安装： npm install -g npm-check-updates
  执行命令： ncu  查看有哪些包是可以更新的
  执行命令： ncu -a  将可以升级的包全部升级 

8. crypto 已是node中的一个内置项目，可以直接饮用，无需再安装npm包

