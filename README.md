# express学习笔记

* 参考文章：
http://www.open-open.com/lib/view/open1454560780730.html
http://www.cnblogs.com/zhongweiv/p/nodejs_environment.html
------------------------
# lesson1

# 新建一个工程

1. 在命令行中输入：

`express -e 项目名`  初始化了一个使用 ejs 模板引擎的工程

`cd 项目名 && npm install`

2. 运行 ：
`npm start` 再在浏览器输入对应的窗口即可

3. 自动更新：
安装个supervisor `npm -g install supervisor`supervisor必须全局安装
启动时执行 `supervisor app.js`。express已经替换了启动方式，所以启动时执行 `supervisor ./bin/www`

## router参数说明
* `req.query`   处理 get 请求，获取 get 请求参数
* `req.params`  处理 /:xxx 形式的 get 或 post 请求，获取请求参数
* `req.body`    处理 post 请求，获取 post 请求体
* `req.param()` 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query

## 小tips：快速删除node_modules
1. 安装个全局的rimraf `npm install rimraf -g`,
2. 在需要删除node_modules的目录下，执行`rimraf node_modules`

## ejs模板的引用

1. 在view目录下新建一个other.ejs,如果要往里面传数据，可以在router里面写 res.render('other', { title: 'hello world' });
<% code %>：JavaScript 代码。
<%= code %>：显示替换过 HTML 特殊字符的内容。
<%- code %>：显示原始 HTML 内容。
注意：  <%= code %> 和  <%- code %> 的区别，当变量 code 为普通字符串时，两者没有区别。当 code 比如为  <h1>hello</h1> 这种字符串时， <%= code %> 会原样输出  <h1>hello</h1> ，而  <%- code %> 则会显示 H1里面的 hello 字符串。

## 页面布局
这里我们不使用layout进行页面布局，而是使用更为简单灵活的include。include 的简单使用如下：
```
<%- include a %>
hello,world!
<%- include b %>
```
a.ejs
`
this is a.ejs
`

补充:exports 和 module.exports的区别，exports仅仅是 module.exports的一个地址引用，如果module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略;

1. 最好别分别定义module.exports和exports
2. NodeJs开发者建议导出对象用module.exports,导出多个方法和变量用exports

# lesson2 搭建一个简易博客

1. 原则:路由规划是整个网站的骨架部分，因为它处于整个架构的枢纽位置，相当于各个接口之间的粘合剂，所以应该优先考虑。
2. 我们通过引入会话（session）机制记录用户登录状态
3. 
* req.query：我用来接收GET方式提交参数
* req.body：我用来接收POST提交的参数
* req.params：两种都能接收到

### 如何字符串加密?
当我们提交表单后，比如密码这些敏感信息，不做个加密处理那也太不把用户私密信息当回事了，Node.js提供了一个加密模块 `crypto`
使用方法：
```
var express = require('express');
var router = express.Router();
var crypto = require('crypto');

router.post('/',function(req, res){
  var userPwd = req.body.txtUserPwd;
  //生成口令的散列值
  var md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列
  var en_upwd = md5.update(userPwd).digest('hex');
  console.log('加密后的密码:'+en_upwd);

});

module.exports = router;
```

## session的使用


// session的使用
app.use(cookieParser('keyboard cat'));

//使用靠就这个中间件
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));
<strong>注意：坑点：！！！！需要注意的是，必须将这几句放在app.use(app.router);之前</strong>

第三步，想session中写入内容
req.session.name=username;
req.session.pwd=pwd;

写完后，用下面两句存储一下
sender.send(req.session);
sender.end();



