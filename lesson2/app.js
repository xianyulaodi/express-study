var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var session = require('express-session');

var index = require('./routes/index');
var subform = require('./routes/subform');
var usesession = require('./routes/usesession');
var usecookies = require('./routes/usecookies');
var usecrypto = require('./routes/usecrypto'); 


var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');

// var settings=require('./settings');

var MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session的使用
//这里传入了一个密钥加session id
app.use(cookieParser('keyboard cat'));
//使用靠就这个中间件
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));

// 路由配置
app.use('/', index);
app.use('/subform', subform);
app.use('/usesession', usesession);
app.use('/usecookies', usecookies);
app.use('/usecrypto', usecrypto);

// app.use('/reg', reg);
// app.use('/login', login);
// app.use('/logout', logout);

 
fs.readFile("package.json",'utf-8',function(err,data){  
    if(err){  
        console.log("error");  
    }else{  
        console.log(data);  
    }  
});  
console.log("READ FILE ASYNC END");  



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
