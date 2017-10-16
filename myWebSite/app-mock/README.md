# [NightPost](https://github.com/kkltmoyu/NightPost/)
这是一个具有贴吧功能的Web工程，发帖、查询发帖信息、图表统计、发表用户评论、用户注册登陆注销等。
本工程使用React全家桶+NodeJS+MongoDB搭建。当然，如果你愿意，也可以使用此工程作为脚手架进行项目构建或者学习。

## 关键技术
* 1.前端
	>ReactJS-15.5 + React-router-4 + redux + react-redux + antd组件库 + recharts-1.0 + ES6 + webpack + sass + redux DEVTOOLS（默认关闭，需要请在index.js中取消注释）<br/>
	其中antd组件与recharts库均已配置为按需加载
* 2.后端
	>NodeJS + express4 + MongoDB（MongoDB未集成在工程中请自行安装）<br/>
	前后端完全分离<br/>
	

## 项目开发
开发阶段采用nodeJS 7.9,前端调试使用chrom 51，后端nodeJS调试使用devtool

## 项目运行
### 1.开始 
	根据db.sh中的说明修改db.sh路径为自己本机上的mongo路径
### 2.运行
    git clone https://github.com/kkltmoyu/NightPost.git
    npm install安装库
    启动mongo：./db.sh
    启动node服务器端：node server/index.js
##### 开发环境:
    npm run dev
    浏览器输入 localhost:7000
##### 生产环境:
    npm run dist

![NightPost](https://raw.githubusercontent.com/kkltmoyu/night/master/main.PNG) 
![NightPost](https://raw.githubusercontent.com/kkltmoyu/night/master/tongji.PNG) 


todoList:
1. [x] 首页左侧列表 推荐用户
2. [x] 用户中心
3. [] 个人中心设置
4. [] 关注
5. [] 登录