
# process笔记
参考: http://www.cnblogs.com/Joans/p/4462993.html  


## uncaughtException 
作用： 他会把异常抓取出来供你处理，而不会让进程挂掉
```javascript
process.on('uncaughtException', function (err) {
　　console.log('Caught exception: ' + err);
});
```

demo:
```javascript
process.on('uncaughtException', function (err) {
　　console.log('Caught exception: ' + err);
});
setTimeout(function () {
　　console.log('This will still run.');
}, 500);

//下面这行出错了
nonexistentFunc();
console.log('This will not run.');
```

## exit   这里不知道怎么触发
作用： exit方法会在当进程退出的时候执行。
因为进程退出之后将不再执行事件循环，所有只有那些没有回调函数的代码才会被执行。在下面例子中，setTimeout里面的语句是没有办法执行到的。
demo:
```javascript
process.on('exit', function () {
　　setTimeout(function () {
　　　　console.log('This will not run');
　　}, 100);
　　console.log('Bye.');
});
```

## 与当前进程交互

node提供了一些process的属性，如下：

process.version：包含当前node实例的版本号；
process.installPrefix：包含安装路径；
process.platform：列举node运行的操作系统的环境，只会显示内核相关的信息，如：linux2， darwin，而不是“Redhat ES3” ，“Windows 7”，“OSX 10.7”等；
process.uptime()：包含当前进程运行的时长（秒）；
process.getgid(), process.setgid()：获取或者设置group id；
process.getuid(), process.setuid()：获取或者设计user id；
process.pid：获取进程id；
process.title：设置进程名称；
process.execPath：当前node进程的执行路径，如：/usr/local/bin/node；
process.cwd()：当前工作目录；
process.memoryUsage()：node进程内存的使用情况，rss代表ram的使用情况，vsize代表总内存的使用大小，包括ram和swap；
process.heapTotal,process.heapUsed：分别代表v8引擎内存分配和正在使用的大小。


## 事件循环和ticker (重要)
  node中提供了process.nextTick()方法，允许你访问事件循环和延时那你的工作。

他有点类似于setTimeout()，他会在下次tick的时候执行，而且每隔一段事件就会执行一次。我们这里有个例子;

nextTick创建的回调函数具有`隔离性`，他们之间不会相互影响。
demo:
```javascript
process.on('uncaughtException', function(e) {
　　console.log(e);
});
process.nextTick(function() {
　　console.log('tick');
});
process.nextTick(function() {
　　iAmAMistake();
　　console.log('tock');
});
process.nextTick(function() {
　　console.log('tick tock');
});
console.log('End of 1st loop');
```
在这个例子中，输出顺序为：
```javascript
End of 1st loop
tick
[ReferenceError: iAmAMistake is not defined]
tick tock
```
首先输出'End of 1st loop'，然后顺序的输出nextTick的回调函数，第一个会正常输出'tick'，第二个是一个故意设置的异常会输出异常信息，不会输出'tock'，因为nextTick回调函数的隔离性，第三个仍然会输出'tick tock'。


## 子进程
　　node提供了child_process模块，允许你为主进程创建子进程，这样你就可以使用更多的服务器资源，使用更多的cpu。
    node提供了child_process.spawn()和child_process.exec()可以实现这一功能。

   #### child_process.exec();
   我们来看exec的一个简单例子，他创建了一个子进程，第一个参数是一个shell命令，第二个参数是回调函数，处理返回结果。
   ```javascript
    var cp = require('child_process');
	cp.exec('ls -l', function(e, stdout, stderr) {
	　　if(!e) {
	　　　　console.log(stdout);
	　　　　console.log(stderr);
	　　}
	});
   ```

   #### child_process.spawn();
   child_process.spawn( )比child_process.exec( )更加强大和灵活，例子如下：
   ```javascript
    var cp = require('child_process');
	var cat = cp.spawn('cat');
	cat.stdout.on('data', function(d) {
	　　console.log(d.toString());
	});
	cat.on('exit', function() {
	　　console.log('kthxbai');
	});
	cat.stdin.write('meow');
	cat.stdin.end();
   ```
    
    ```javascript
    var exec = require('child_process').execFile;
	exec('node', ['--version'], function(error, stdout, stderr){
	    if(error){
	        throw error;
	    }
	    console.log(stdout);
	    console.log(stderr);
	});
    ```

从node源码来看，exec()、execFile()最大的差别，就在于是否创建了shell。
```javascript
var child_process = require('child_process');
var execFile = child_process.execFile;
var exec = child_process.exec;

exec('ls -al .', function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});

execFile('ls -al .', {shell: '/bin/bash'}, function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});
```

在node中，child_process这个模块非常重要。掌握了它，等于在node的世界开启了一扇新的大门。

https://segmentfault.com/a/1190000007735211  process_child这篇文章写的比较好
http://www.cnblogs.com/zmxmumu/p/6179503.html  这篇文章也不错

child_process.fork  
fork函数可直接运行Node.js模块，所以我们可以直接通过指定模块路径而直接进行操作。


2017.9.29 task list:
1. 学习node buff对象
2. 继续学习 node进程
3. 学习数据库设计


----------------------------------------------------------------------------------------------------------------------------------------------
                                                            分界线
----------------------------------------------------------------------------------------------------------------------------------------------


# buffer:  http://blog.fens.me/nodejs-buffer/  参考这篇文章即可

## buffer 作用:
  为了处理二进制的数据，进而出现了Bugger类，这样可以处理各种数据类型。
Buffer库为Node.js带来了一种存储原始数据的方法，可以让Nodejs处理二进制数据，每当需要在Nodejs中处理I/O操作中移动的数据时，就有可能使用Buffer库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

## buffer使用方法：
 Buffer 和 Javascript 字符串对象之间的转换需要显式地调用编码方法来完成。以下是几种不同的字符串编码：
'ascii' – 仅用于 7 位 ASCII 字符。这种编码方法非常快，并且会丢弃高位数据。
'utf8' – 多字节编码的 Unicode 字符。许多网页和其他文件格式使用 UTF-8。
'ucs2' – 两个字节，以小尾字节序(little-endian)编码的 Unicode 字符。它只能对 BMP（基本多文种平面，U+0000 – U+FFFF） 范围内的字符编码。
'base64' – Base64 字符串编码。
'binary' – 一种将原始二进制数据转换成字符串的编码方式，仅使用每个字符的前 8 位。这种编码方法已经过时，应当尽可能地使用 Buffer 对象。Node 的后续版本将会删除这种编码。

Buffer的基本使用，主要就是API所提供的操作，主要包括3个部分 创建Buffer类、读Buffer、写Buffer。

#### Buffer检查:
(1). Buffer检查，很多时候我们需要判断数据的类型，对应后续的操作。
```javascript
// 是Buffer类
console.log(Buffer.isBuffer(new Buffer('a')));
> true

// 不是Buffer
console.log(Buffer.isBuffer('adfd'));
console.log(Buffer.isBuffer('\u00bd\u00bd'));
> false
```
(2). Buffer.byteLength(str, type); 检查buffer的长度
```javascript
var str = "文字";
console.log(Buffer.byteLength(str, 'utf8'));
console.log(Buffer.byteLength(str, 'ascii'));
```

(3). Buffer的连接,用于连接Buffer的数组。我们可以手动分配Buffer对象合并后的Buffer空间大小，如果Buffer空间不够了，则数据会被截断。
```javascript
var b1 = new Buffer("abcd");
var b2 = new Buffer("1234");
var b3 = Buffer.concat([b1,b2],8);
console.log(b3.toString());
// abcd1234

var b4 = Buffer.concat([b1,b2],32);
console.log(b4.toString());
console.log(b4.toString('hex'));//16进制输出
// abcd1234 乱码....
// 616263643132333404000000000000000000000000000000082a330200000000

var b5 = Buffer.concat([b1,b2],4);
console.log(b5.toString());
// abcd
```

#### 写入buffer
```javascript
// 创建空间大小为64字节的Buffer
var buf = new Buffer(64);

// 从开始写入Buffer，偏移0
var len1 = buf.write('从开始写入');

// 打印数据的长度，打印Buffer的0到len1位置的数据
console.log(len1 + " bytes: " + buf.toString('utf8', 0, len1));

// 重新写入Buffer，偏移0，将覆盖之前的Buffer内存
len1 = buf.write('重新写入');
console.log(len1 + " bytes: " + buf.toString('utf8', 0, len1));

// 继续写入Buffer，偏移len1，写入unicode的字符串
var len2 = buf.write('\u00bd + \u00bc = \u00be',len1);
console.log(len2 + " bytes: " + buf.toString('utf8', 0, len1+len2));

// 继续写入Buffer，偏移30
var len3 = buf.write('从第30位写入', 30);
console.log(len3 + " bytes: " + buf.toString('utf8', 0, 30+len3));

// Buffer总长度和数据
console.log(buf.length + " bytes: " + buf.toString('utf8', 0, buf.length));

// 继续写入Buffer，偏移30+len3
var len4 = buf.write('写入的数据长度超过Buffer的总长度！',30+len3);

// 超过Buffer空间的数据，没有被写入到Buffer中
console.log(buf.length + " bytes: " + buf.toString('utf8', 0, buf.length));
```

#### 读取buffer
(1). 最常用的读取Buffer的方法,是toString()。
```javascript
var buf = new Buffer(10);
for (var i = 0 ; i < 10 ; i++) {
    buf[i] = i + 97;
}
console.log(buf.length + " bytes: " + buf.toString('utf-8'));
// 10 bytes: abcdefghij
```

(2). 写入中文数据，以readXXX进行读取，会3个字节来表示一个中文字。
```javascript
var buf = new Buffer(10);
buf.write('abcd')
buf.write('数据',4)
for (var i = 0; i < buf.length; i++) {
    console.log(buf.readUInt8(i));
}
```

(3). 如果想输出正确的中文，那么我们可以用toString('utf-8')的函数来操作。
var buf = new Buffer(10);
```javascript
console.log("buffer :"+buf); // 默认调用了toString()的函数
// buffer :abcd数据
console.log("utf-8  :"+buf.toString('utf-8'));
// utf-8  :abcd数据
console.log("ascii  :"+buf.toString('ascii'));//有乱码，中文不能被正确解析
// ascii  :abcdf0f
console.log("hex    :"+buf.toString('hex')); //16进制
// hex    :61626364e695b0e68dae
```


## buffer性能比较

(1). 每次我们创建一个新的Buffer实例时，都会检查当前Buffer的内存池是否已经满，当前内存池对于新建的Buffer实例是共享的，内存池的大小为8K。
如果新创建的Buffer实例大于8K时，就把Buffer交给SlowBuffer实例存储；如果新创建的Buffer实例小于8K，同时小于当前内存池的剩余空间，那么这个Buffer存入当前的内存池；如果Buffer实例不大0，则统一返回默认的zerobuffer实例。
下面我们创建2个Buffer实例，第一个是以4k为空间，第二个以4.001k为空间，循环创建10万次。
```javascript
var num = 100*1000;
console.time("test1");
for(var i=0;i < num;i++) {
    new Buffer(1024*4);
}
console.timeEnd("test1");
// test1: 132ms
console.time("test2");
for(var j=0;j < num;j++){
    new Buffer(1024*4+1);
}
console.timeEnd("test2");
// test2: 163ms
```

(2) 多Buffer还是单一Buffer
对于这类的需求来说，提前生成一个大的Buffer实例进行存储，要比每次生成小的Buffer实例高效的多，能提升一个数量级的计算效率。所以，理解并用好Buffer是非常重要的！！
```javascript
var max = 2048;     //最大长度
var time = 10*1000; //循环1万次

// 根据长度创建字符串
function getString(size){
    var ret = ""
    for(var i=0;i < size;i++) ret += "a";
    return ret;
}

// 生成字符串数组，1万条记录
var arr1=[];
for(var i=0;i < time;i++){
    var size = Math.ceil(Math.random()*max)
    arr1.push(getString(size));
}
//console.log(arr1);

// 创建1万个小Buffer实例
console.time('test3');
var arr_3 = [];
for(var i=0;i < time;i++){
    arr_3.push(new Buffer(arr1[i]));
}
console.timeEnd('test3');
// test3: 217ms

// 创建一个大实例，和一个offset数组用于读取数据。
console.time('test4');
var buf = new Buffer(time*max);
var offset=0;
var arr_4=[];
for(var i=0;i < time;i++){
    arr_4[i]=offset;
    buf.write(arr1[i],offset,arr1[i].length);
    offset=offset+arr1[i].length;
}
console.timeEnd('test4');
// test4: 12ms
```

(3) String对字符串的连接操作，要远快于Buffer的连接操作。所以我们在保存字符串的时候，该用string还是要用string。
那么只有在保存非utf-8的字符串以及二进制数据的情况，我们才用Buffer。
```javascript
//测试三，Buffer VS string
var time = 300*1000;
var txt = "aaa"

var str = "";
console.time('test5')
for(var i=0;i < time;i++){
    str += txt;
}
console.timeEnd('test5')
> test5: 24ms

console.time('test6')
var buf = new Buffer(time * txt.length)
var offset = 0;
for(var i=0;i < time;i++){
    var end = offset + txt.length;
    buf.write(txt,offset,end);
    offset=end;
}
console.timeEnd('test6')
> test6: 85ms
```

## buffer 注意点；
如果直接使用 len += buf.length，会有问题

##正确使用buffer的方式
```javascript
var buffers = [];
var nread = 0;
readStream.on('data', function (chunk) {
    buffers.push(chunk);
    nread += chunk.length;
});
readStream.on('end', function () {
    var buffer = null;
    switch(buffers.length) {
        case 0: buffer = new Buffer(0);
            break;
        case 1: buffer = buffers[0];
            break;
        default:
            buffer = new Buffer(nread);
            for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
                var chunk = buffers[i];
                chunk.copy(buffer, pos);
                pos += chunk.length;
            }
        break;
    }
});
```

## 还可以利用Buffer.toString()来做转换base64或十六进制字符的转换，比如：
```javascript
console.log(new Buffer('hello, world!').toString('base64'));
// 转换成base64字符串：aGVsbG8sIHdvcmxkIQ==

console.log(new Buffer('aGVsbG8sIHdvcmxkIQ==', 'base64').toString());
// 还原base64字符串：hello, world!

console.log(new Buffer('hello, world!').toString('hex'));
// 转换成十六进制字符串：68656c6c6f2c20776f726c6421

console.log(new Buffer('68656c6c6f2c20776f726c6421', 'hex').toString());
// 还原十六进制字符串：hello, world!
```


```javascript
  var buf = new Buffer('nodejsv0.10.4&nodejsv0.10.4&nodejsv0.10.4&nodejsv0.10.4&');
  console.time('string += buf')
  var s = '';
  for(var i=0;i<10000;i++){
    s += buf;
  }
  s;
  console.timeEnd('string += buf')

  console.time('buf concat')
  var list = [];
  var len=0;
  for(var i=0;i<10000;i++){
    list.push(buf);
    len += buf.length;
  }
  var s2 = Buffer.concat(list, len).toString();
  console.timeEnd('buf concat')
/**
string += buf: 15ms
buf concat: 8ms
**/
```
在1000次拼接过程中，两者的性能几乎相差一倍，而且当客户上传的是非UTF8的字符串时，直接+=还容易出现错误。