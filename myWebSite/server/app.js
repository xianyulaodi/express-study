var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);  //需要在session的下面
var ejs = require('ejs');
var router=require('./routes');
var config = require('./config');
var log4js = require('log4js');  // 添加日志统计

// 静态文件目录
var staticDir = path.join(__dirname,'/public');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.session_secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(staticDir));

// session 设置
app.use(session({
    name:config.name,
    secret:config.session_secret,
    store:new MongoStore({
      url:config.mongodb  // 用来保存数据库的一些session，比如记住登录密码等
    }),
    cookie:{
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      signed: true, httpOnly: true
    }, //cookie 有效期30天,
	  resave:true,
	  saveUninitialized:true
}));

// 添加日志统计 START
var log4js_config = require("./config/log4js.json");  
log4js.configure(log4js_config);  
app.use(log4js.connectLogger(log4js.getLogger('log_file'), { level: log4js.levels.INFO }));  // 这样所有的请求都会走这里的日志统计
var logger = log4js.getLogger('log_file');  // log_file 跟配置文件的 category 对应
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');
// 添加日志统计 END


// 接口支持跨域访问 START
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type=application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true) //支持跨域传cookie
  // res.header("X-Powered-By", ' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");

  if (req.method == 'OPTIONS') {
    console.log('option');
    //res.sendStatus(200); /让options请求快速返回/
  }
  else {
    next();
  }
});
// 跨域请求 END


// routes
app.use('/',router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  logger.error(err);
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  logger.error(err);
  res.render('error');
});

module.exports = app;
