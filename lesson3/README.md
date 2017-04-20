
# express + mongoose 脚手架

## 使用方法

1. 确保你的电脑上安装了mongodb,开启mongodb.
方法：进入mongodb的bin目录，执行'mongod --dbpath 数据库地址' eg:'D:\mongodb\bin>mongod --dbpath F:\myFile\express-mongod
b\myblog'

2. 执行'npm install'

3. 执行'npm start'

4. 浏览器输入：'http://localhost:3001'

修改端口号可以在 /config 里面修改

## 项目说明

1. 数据的来源在 `controllers`，所以需要返回什么数据，修改controlers对应的文件即可
2. ajax的请求路径设置在 router里面，比如，`ajax.post('/login')`;是因为有router里面有一个  `router.post('/login',login.login);`相互对应
3. 整个是项目是一个MVC的模式。 `Model`、 `Controllers`、 `View`
