# express学习笔记

* 参考文章：
1. http://www.open-open.com/lib/view/open1454560780730.html
2. http://www.cnblogs.com/zhongweiv/p/nodejs_environment.html
3. http://blog.fens.me/series-nodejs/
------------------------
# lesson1

## 新建一个工程

1. 在命令行中输入：`express -e 项目名`  初始化了一个使用 ejs 模板引擎的工程`cd 项目名 && npm install`

2. 运行 ：`npm start` 再在浏览器输入对应的窗口即可

3. 自动更新：
 安装个supervisor `npm -g install supervisor`supervisor必须全局安装
启动时执行 `supervisor app.js`。express已经替换了启动方式，所以启动时执行 `supervisor ./bin/www`

## router参数说明
* `req.query`   处理 get 请求，获取 get 请求参数
* `req.params`  处理 /:xxx 形式的 get 或 post 请求，获取请求参数
* `req.body`    处理 post 请求，获取 post 请求体
* `req.param()` 处理 get 和 post 请求，但查找优先级由高到低为 `req.params→req.body→req.query`

#### 小tips：快速删除node_modules
1. 安装个全局的rimraf `npm install rimraf -g`,
2. 在需要删除node_modules的目录下，执行`rimraf node_modules`

## ejs模板的引用

1. 在view目录下新建一个other.ejs,如果要往里面传数据，可以在router里面写`res.render('other', { title: 'hello world' });`
`<% code %>`：JavaScript 代码。
`<%= code %>`：显示替换过 HTML 特殊字符的内容。
`<%- code %>`：显示原始 HTML 内容。
注意：  `<%= code %>` 和 ` <%- code %>` 的区别，当变量 code 为普通字符串时，两者没有区别。当 code 比如为 ` <h1>hello</h1>` 这种字符串时， `<%= code %> `会原样输出 ` <h1>hello</h1>` ，而 ` <%- code %> `则会显示 H1里面的 hello 字符串。

## 页面布局
这里我们不使用layout进行页面布局，而是使用更为简单灵活的include。include 的简单使用如下：
```html
<%- include a %>
hello,world!
<%- include b %>
```
a.ejs
`
this is a.ejs
`

* 补充:
`exports `和` module.exports`的区别，`exports`仅仅是 `module.exports`的一个地址引用，如果`module.exports`已经具备一些属性和方法，那么`exports`收集来的信息将被忽略;
1. 最好别分别定义`module.exports`和`exports`
2. NodeJs开发者建议导出对象用`module.exports`,导出多个方法和变量用`exports`

# lesson2 搭建一个简易博客

1. 原则:路由规划是整个网站的骨架部分，因为它处于整个架构的枢纽位置，相当于各个接口之间的粘合剂，所以应该优先考虑。
2. 我们通过引入会话（session）机制记录用户登录状态
3. * req.query：我用来接收GET方式提交参数
* req.body：我用来接收POST提交的参数
* req.params：两种都能接收到

### 如何字符串加密?
当我们提交表单后，比如密码这些敏感信息，不做个加密处理那也太不把用户私密信息当回事了，Node.js提供了一个加密模块 `crypto`
使用方法：
```javascript
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

```javascript
// session的使用
app.use(cookieParser('keyboard cat'));

//使用靠就这个中间件
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));
```
<strong>注意：坑点：！！！！需要注意的是，必须将这几句放在`app.use(app.router)`;之前</strong>

第三步，想session中写入内容
```javascript
req.session.name=username;
req.session.pwd=pwd;
```

写完后，用下面两句存储一下
```javascript
sender.send(req.session);
sender.end();
```

## Express 模板传值对象app.locals、res.locals
* `locals`是Express应用中 Application(app)对象和Response(res)对象中的属性，该属性是一个对象。该对象的主要作用是，将值传递到所渲染的模板中。
* `locals对象`
locals对象用于将数据传递至所渲染的模板中。

对于如下一个ejs模板：
```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= name %></title>
  </head>
  <body>
    <h1><a href="<%= url %>"><%= name %></a></h1>
    <p><%= introduce %></p>
  </body>
</html>
```
```javascript 
router.get('/', function(req, res) {  
  res.render('index', {name:'IT笔录', url:'http://itbilu.com', introduce:'学习、记录、整理'});
  // 也可以使用 res.locals 变量
  // res.locals = {
  //   name:'IT笔录', 
  //   url:'http://itbilu.com', 
  //   introduce:'学习、记录、整理'
  // };
  // res.render('index');
});
```
* `app.locals`与`res.locals`
       locals可能存在于app对象中即：`app.locals`；也可能存在于res对象中，即：`res.locals`。两者都会将该对象传递至所渲染的页面中。不同的是，`app.locals`会在整个生命周期中起作用；而`res.locals`只会有当前请求中起作用。由于`app.locals`在当前应用所有的渲染模中访问，这样我们就可以在该对象中定义一些顶级/全局的数据，并在渲染模板中使用。

## mongodb的使用
1. 参考这篇文章：http://www.cnblogs.com/paul123/p/5396290.html
2. 也可以参考这篇文章：http://www.tuicool.com/articles/NZRz2mR
3. 命令行的使用可以看看这个：http://www.cnblogs.com/woodk/p/6155955.html

4.4号的任务是实现node.js读取文件内容
node 读取操作文件
1. http://blog.csdn.net/youbl/article/details/29812669
2. http://www.baidu.com/link?url=io9KwmP3ADdBTRnA97m0JNloN1UpQy7eM-da9TKR42RXFSy_tjqy_WODsZvBm80le-FhXweuRnS3l-887Jm0A3U4prXRosVJ_-_8RkCjQwW&wd=&eqid=daff0c950004ffb80000000658e2693c

## node文件读取模块 fs
* Node.js读取文件内容包括同步和异步两种方式
 1. 同步读取，调用的是readFileSync
```javascript
var fs=require("fs");  
var data=fs.readFileSync("test.js","utf-8");  
console.log(data);  
```
2. 异步读取，调用readFile
```javascript
var fs=require("fs");  
fs.readFile("test.js",'utf-8',function(err,data){  
    if(err){  
        console.log("error");  
    }else{  
        console.log(data);  
    }  
});  
```
fs.readFile 接收了三个参数，第一个是文件名，第二个是编码方式，第三个为回调函数。
其他一下fs的api
```javascript
fs.writeFile('delete.txt','1234567890'，function(err){
    console('youxi!');
});

// 删除文件
fs.unlink('delete.txt', function(){
 console.log('success');
});

// 修改文件名称
fs.rename('delete.txt','anew.txt',function(err){
 console.log('rename success');

 // 查看文件状态
fs.stat('anew.txt', function(err, stat){
  console.log(stat);
 });
});

// 判断文件是否存在
fs.exists('a.txt', function( exists ){
    console.log( exists );
});
```



