# express学习笔记

* 参考文章：
1. http://www.open-open.com/lib/view/open1454560780730.html
2. http://www.cnblogs.com/zhongweiv/p/nodejs_environment.html
3. http://blog.fens.me/series-nodejs/
------------------------
# lesson1

## 新建一个工程
首先需要在全局安装express `npm install express-generator -g `
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
** 注意 ** ：使用的时候，位置应该是放在路由器的前面，这样才会生效。比如
```javascript
app.use(local);    // local是我封装了res.locals的函数，位置要在路由器的前面，不然是不行的
app.use('/',router);
```

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

# lesson3  mongodb的使用

参考：[http://fwhyy.com/2011/11/mongo-service-startup/](http://fwhyy.com/2011/11/mongo-service-startup/)

## 如何开启mongodb
1. 首先，进入到安装mongodb的bin目录，如`D:\mongodb\bin`,然后执行命令`mongod --dbpath f:\MongoDB\data` 其中 `f:\MongoDB\data`是文件存放路径，看到如下信息说明成功了
![](http://images2015.cnblogs.com/blog/743331/201604/743331-20160415154227160-699397929.png)

2. mongodb的默认端口为27017，所以如果开启了mongodb,可以在浏览器输入`http://localhost:27017/`,如果现实类似的`It looks like you are trying to access MongoDB over HTTP on the native driver port.`,则说明mongodb启动成功

3. mongoose的api地位为[http://www.nodeclass.com/api/mongoose.html#quick_start](http://www.nodeclass.com/api/mongoose.html#quick_start)

## 如何查看有多少数据库

* 进入mongodb的bin目录，例如`D:\mongodb\bin`
* 执行`mongo`,然后再执行`show dbs`可以查看到有多少数据库。
* 如果要使用指定的数据库的话，可以执行`use 数据库名`。eg:`use myData`

** 这里需要注意的是，mongodb是需要开启的状态。即：`mongod --dbpath f:\MongoDB\data`这条命令的窗口是要开着的。**

## mongoose的使用

一般我们不直接用MongoDB的函数来操作MongoDB数据库,而使用mongose,mongoose就是一套操作MongoDB数据库的接口.

1. 连接上你的数据库

```javaScript
var mongoose = require('mongoose');
var db       = mongoose.connect('mongodb://127.0.0.1:27017/dataBase');
```
2. Schema
> 一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，不具备对数据库的操作能力，仅仅只是数据库模型在程序片段中的一种表现，可以说是数据属性模型(传统意义的表结构)，又或着是'集合'的模型骨架。说白了就是定义数据的类型。

```javaScript
const UserSchema = new mongoose.Schema({
    username : { type : String },
    password : { type : String },
    avatar : { type : String },
    age : { type : Number , default : 0 },
    description : { type : String },
    email : { type : String },
    github : { type : String },
    time : { type : Date , defaul : Date.now },
});
```

3. model
> 由Schema构造生成的模型，除了Schema定义的数据库骨架以外，还具有数据库操作的行为，类似于管理数据库属性、行为的类.
简单的说，就是 Schema定义了数据的类型，那么数据的操作要怎么办呢？ 定义一个类似的类，来操作 Schema声明的数据里面的类型

```javaScript
const UserModel = db.model("user", UserSchema );
```
`user` 数据库中的集合名称, 不存在会创建.

4. Entity
> 由Model创建的实体，使用save方法保存数据，Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性

** 具体的使用 **
参考[Mongoose使用操作](http://blog.csdn.net/u014267351/article/details/51212107)

** `Schema - 表结构` **

1. 构造函数
`new mongoose.Schema( { name:{type:String}, age:{type:Number, default:10} } )``

2. 添加属性
`Schema.add( { name: 'String', email: 'String', age: 'Number' } )``

3. 有时候Schema不仅要为后面的Model和Entity提供公共的属性，还要提供公共的方法
```javascript
Schema.method('say', function(){console.log('hello');} )
//这样Model和Entity的实例就能使用这个方法了
```
4. 添加静态方法
```javascript
Schema.static( 'say', function(){console.log('hello');} )
//静态方法，只限于在Model层就能使用
```
5. 追加方法
```javascript
Schema.methods.say = function(){console.log('hello');}; //静态方法，只限于在Model层就能使用
```
** `model - 文档操作` **
1. 构造函数, 参数1:集合名称, 参数2:Schema实例
`db.model('test1', TestSchema );`

2. 查询, 参数1忽略,或为空对象则返回所有集合文档
* `model.find({}, callback);``
* `model.find({},field,callback);` 过滤查询, 参数2: `{'name':1, 'age':0}` 查询文档的返回结果包含name, 不包含age(_id默认是1) 1为包含，0为不包含
* `model.find({},null,{limit:20});` 过滤查询,参数3: 游标操作 limit限制返回结果数量为20个,如不足20个则返回所有.
* `model.findOne({}, callback);` 查询找到的第一个文档
* `model.findById('obj._id', callback);` 查询找到的第一个文档,同上. 但是只接受 __id 的值查询

3. 创建, 在集合中创建一个文档
`Model.create(文档数据, callback))`

4. 更新,参数 1:查询条件, 参数2:更新对象,可以使用MondoDB的更新修改器
`Model.update(conditions, update, function(error)`

5. 删除, 参数1:查询条件
`Model.remove(conditions,callback);``

** `Entity - 文档操作` **
1. 构造函数, 其实就是model的实例
`new TestModel( { name:'xueyou', age:21 } );`

2. 创建, 在集合中创建一个文档.
`Entity.save(callback);`

** 修改器和更新器 **
1. 更新修改器:
'$inc' 增减修改器,只对数字有效.下面的实例: 找到 age=22的文档,修改文档的age值自增1
`Model.update({'age':22}, {'$inc':{'age':1} }  )`; 执行后: age=23

2. '$set' 指定一个键的值,这个键不存在就创建它.可以是任何MondoDB支持的类型.
`Model.update({'age':22}, {'$set':{'age':'haha'} }  );` 执行后: age='haha'

3. '$unset' 同上取反,删除一个键
`Model.update({'age':22}, {'$unset':{'age':'haha'} }  )`;  执行后: age键不存在

** 数组修改器: **

1. '$push' 给一个键push一个数组成员,键不存在会创建
`Model.update({'age':22}, {'$push':{'array':10} } )`; 执行后: 增加一个 array 键,类型为数组, 有一个成员 10

2. '$addToSet' 向数组中添加一个元素,如果存在就不添加
`Model.update({'age':22}, {'$addToSet':{'array':10} } )`; 执行后: array中有10所以不会添加

3. '$each' 遍历数组, 和 $push 修改器配合可以插入多个值
`Model.update({'age':22}, {'$push':{'array':{'$each': [1,2,3,4,5]}} } )`; 执行后: array : [10,1,2,3,4,5]

4. '$pop' 向数组中尾部删除一个元素
`Model.update({'age':22}, {'$pop':{'array':1} } )`; 执行后: array : [10,1,2,3,4] tips: 将1改成-1可以删除数组首部元素

5. '$pull' 向数组中删除指定元素
`Model.update({'age':22}, {'$pull':{'array':10} } )`; 执行后: array : [1,2,3,4] 匹配到array中的10后将其删除

**条件查询:**
`'$lt' `小于
`'$lte'` 小于等于
`'$gt' `大于
`'$gte'` 大于等于
`'$ne' `不等于
`Model.find({'age':{ '$gte':18 , '$lte':30 } } )`; 查询 age 大于等于18并小于等于30的文档

**或查询 OR:**
`'$in' `一个键对应多个值
`'$nin'` 同上取反, 一个键不对应指定值
`'$or' `多个条件匹配, 可以嵌套 $in 使用
`'$not'`     同上取反, 查询与特定模式不匹配的文档
`Model.find({'age':{ '$in':[20,21,22.'haha']} } )`; 查询 age等于20或21或21或'haha'的文档
`Model.find({"$or" :  [ {'age':18} , {'name':'xueyou'} ] })`; 查询 age等于18 或 name等于'xueyou' 的文档

**类型查询:**
null 能匹配自身和不存在的值, 想要匹配键的值 为null, 就要通过  '$exists' 条件判定键值已经存在 "$exists" (表示是否存在的意思)
`Model.find('age' :  { '$in' : [null] , 'exists' : true  } )`; 查询 age值为null的文档
`Model.find({name:{$exists:true}},function(error,docs){//查询所有存在name属性的文档})`;
`Model.find({telephone:{$exists:false}},function(error,docs){//查询所有不存在telephone属性的文档})`;

**正则表达式:**
MongoDb 使用 Prel兼容的正则表达式库来匹配正则表达式

`find( {'name' : /joe/i } ) `查询name为 joe 的文档, 并忽略大小写

`find( {'name' : /joe?/i } )` 查询匹配各种大小写组合

** 查询数组:**
`Model.find({'array':10} )`; 查询 array(数组类型)键中有10的文档, array : [1,2,3,4,5,10] 会匹配到
`Model.find({'array[5]':10} )`; 查询 array(数组类型)键中下标5对应的值是10, array : [1,2,3,4,5,10] 会匹配到

'$all' 匹配数组中多个元素
`Model.find({'array':[5,10]} )`; 查询 匹配array数组中 既有5又有10的文档

'$size' 匹配数组长度
`Model.find({'array':{"$size" : 3} } )`; 查询 匹配array数组长度为3 的文档

'$slice' 查询子集合返回
`Model.find({'array':{"$skice" : 10} } )`; 查询 匹配array数组的前10个元素
`Model.find({'array':{"$skice" : [5,10] } } )`; 查询 匹配array数组的第5个到第10个元素

where

用它可以执行任意javacript语句作为查询的一部分,如果回调函数返回 true 文档就作为结果的一部分返回
find({"$where":function(){for(var x inthis){//这个函数中的 this 就是文档}if(this.x !==null&&this.y !==null){returnthis.x +this.y ===10?true:false;}else{returntrue;}}})

简化版本
`find( {"$where" :  "this.x + this.y === 10" } )`
`find( {"$where" : " function(){ return this.x + this.y ===10; } " } )`

** ObjectId **

存储在MongoDB集合中的每个文档（document）都有一个默认的主键_id，这个主键名称是固定的，它可以是mongodb支持的任何数据类型，默认是ObjectId。

**mongoose中的schema.index **
建索引是为了提高查询速度，要根据实际业务建立索引，太多了也不好，这样更新数据会变慢，因为要更新索引
`TopicSchema.index({create_at: -1});`
1是正序， -1是逆序，复合索引是为了提高查询速度。
