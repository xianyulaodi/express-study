# 正式进入node.js的实战阶段
---
> 在lesson3中，我们搭建了一个express+mongoose的脚手架，在这节课当中，我们将进行一个完整的项目实战，从而更进一步的学习node.js

** 任务 **
用node.js写这个网站： [https://ruby-china.org/topics](https://ruby-china.org/topics);
参考：[https://github.com/funeyu/nodeLab](https://github.com/funeyu/nodeLab)

## 1. 将渲染模板修改为html
```javascript
var ejs = require('ejs');
...
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
```
