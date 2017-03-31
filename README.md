# express学习笔记
------------------------

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