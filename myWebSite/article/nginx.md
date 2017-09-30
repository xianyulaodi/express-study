参考：
  1. http://blog.csdn.net/zhongguozhichuang/article/details/52816887

# nginx 使用小结

---

## nginx 安装

下载： http://nginx.org/en/download.html
安装： 解压，点解nginx.exe
访问： 浏览器输入： localhost,如果显示 Welcome to nginx!,说明启动成功

---

## nginx常用命令:cmd在安装命令执行

nginx -s stop 强制关闭 
nginx -s quit 安全关闭 
nginx -s reload 改变配置文件的时候，重启nginx工作进程，来时配置文件生效 
nginx -s reopen 打开日志文件

---

## nginx的一些使用方法

1. 静态HTTP服务器
   Nginx是一个HTTP服务器，可以将服务器上的静态文件（如HTML、图片）通过HTTP协议展现给客户端。
```javascript
server {  
    listen 80; # 端口号  
    location / {  
        root /usr/share/nginx/html; # 静态文件路径  
    }  
}  
```

2. 反向代理服务器
什么是反向代理？
* 概念：客户端本来可以直接通过HTTP协议访问某网站应用服务器，网站管理员可以在中间加上一个Nginx，客户端请求Nginx，Nginx请求应用服务器，然后将结果返回给客户端，此时Nginx就是反向代理服务器。
* 反向代理的原理：
   反向代理服务器对外就表现为一个Web服务器，外部网络就可以简单把它当作一个标准的Web服务器而不需要特定的配置。不同之处在于，这个服务器没有保存任何网页的真实数据，所有的静态网页或者CGI程序，都保存在内部的Web服务器上。因此对反向代 理服务器的攻击并不会使得网页信息遭到破坏，这样就增强了Web服务器的安全性。反向代理就是通常所说的web服务器加速，它是一种通过在繁忙的web服务器和外部网络之间增加一个高速的web缓冲服务器来降低实际的web服务 器的负载的一种技术。反向代理是针对web服务器提高加速功能，作为代理缓存，它并不是针对浏览器用户，而针对一台或多台特定的web服务器，它可以代理外部网络对内部网络的访问请求。
　　反向代理服务器会强制将外部网络对要代理的服务器的访问经过它，这样反向代理服务器负责接收客户端的请求，然后到源服务器上获取内容，把内容返回给 用户，并把内容保存到本地，以便日后再收到同样的信息请求时，它会把本地缓存里的内容直接发给用户，以减少后端web服务器的压力，提高响应速度。
* 反向代理的好处：
  1、解决了网站服务器对外可见的问题；
  2、节约了有限的IP地址资源，企业内所有的网站共享一个在internet中注册的IP地址，这些服务器分配私有地址，采用虚拟主机的方式对外提供服务；
  3、保护了真实的web服务器，web服务器对外不可见，外网只能看到反向代理服务器，而反向代理服务器上并没有真实数据，因此，保证了web服务器的资源安全；
  4、加速了对网站访问速度，减轻web服务器的负担，反向代理具有缓存网页的功能，如果用户需要的内容在缓存中，则可以直接从代理服务其中获取，减轻了web服务器的负荷，同时也加快了用户的访问速度。

用户 ----> 方向代理服务器 ---->  web服务器

```javascript
server {  
    listen 80;  
    location / {  
        proxy_pass http://192.168.20.1:8080; # 应用服务器HTTP地址  
    }  
}  
```

3. 负载均衡
  当网站访问量非常大，网站站长开心赚钱的同时，也摊上事儿了。因为网站越来越慢，一台服务器已经不够用了。于是将同一个应用部署在多台服务器上，将大量用户的请求分配给多台机器处理。同时带来的好处是，其中一台服务器万一挂了，只要还有其他服务器正常运行，就不会影响用户使用。
  Nginx可以通过反向代理来实现负载均衡。
```javascript
upstream myapp {  
    server 192.168.20.1:8080; # 应用服务器1  
    server 192.168.20.2:8080; # 应用服务器2  
}  
server {  
    listen 80;  
    location / {  
        proxy_pass http://myapp;  
    }  
}  
```

以上配置会将请求轮询分配到应用服务器，也就是一个客户端的多次请求，有可能会由多台不同的服务器处理。可以通过ip-hash的方式，根据客户端ip地址的hash值将请求分配给固定的某一个服务器处理。
```javascript
upstream myapp {  
    ip_hash; # 根据客户端IP地址Hash值将请求分配给固定的一个服务器处理  
    server 192.168.20.1:8080;  
    server 192.168.20.2:8080;  
}  
server {  
    listen 80;  
    location / {  
        proxy_pass http://myapp;  
    }  
}  
```

另外，服务器的硬件配置可能有好有差，想把大部分请求分配给好的服务器，把少量请求分配给差的服务器，可以通过weight来控制。
```javascript
upstream myapp {  
    server 192.168.20.1:8080 weight=3; # 该服务器处理3/4请求  
    server 192.168.20.2:8080; # weight默认为1，该服务器处理1/4请求  
}  
server {  
    listen 80;  
    location / {  
        proxy_pass http://myapp;  
    }  
}  
```

4. 虚拟主机
有的网站访问量大，需要负载均衡。然而并不是所有网站都如此出色，有的网站，由于访问量太小，需要节省成本，将多个网站部署在同一台服务器上。
例如将www.aaa.com和www.bbb.com两个网站部署在同一台服务器上，两个域名解析到同一个IP地址，但是用户通过两个域名却可以打开两个完全不同的网站，互相不影响，就像访问两个服务器一样，所以叫两个虚拟主机。
```javascript
server {  
    listen 80 default_server;  
    server_name _;  
    return 444; #过滤其他域名的请求，返回444状态码  
}  
server {  
    listen 80;  
    server_name www.aaa.com; # www.aaa.com域名  
    location / {  
        proxy_pass http://localhost:8080; # 对应端口号8080  
    }  
}  
server {  
    listen 80;  
    server_name www.bbb.com; # www.bbb.com域名  
    location / {  
        proxy_pass http://localhost:8081; # 对应端口号8081  
    }  
}  
```