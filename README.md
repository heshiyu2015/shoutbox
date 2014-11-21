shoutbox
========

a simple demo project

这是一个简单的提交微博的demo，使用的是express+mongodb，主要使用mongoose操作数据库

一.功能:
1.可以注册用户
2.注册用户登录之后可以发表微博，可以查看微博
3.对密码进行哈西处理之后保存
4.查看微博支持分页
5.可以注销
6.可以对微博输入进行验证
7.提供了RESTFUL API，第三方软件可以登录并提交提交微博。

二.模块介绍：
1.app.js文件是程序的主要逻辑，每次请求都会调用里边的许多中间件。
2.bin文件夹里边是启动项目的文件www
3.lib中包许多程序的逻辑，
  其中user.js和entry.js包含处理用户和微博和数据库交互的方法
  其他的js文件分别处理一部分逻辑，比如doAddEntries.js处理微博的提交
  middleware文件夹中是一些自定义的中间件，包括页码定义，加载用户数据，验证
4.models文件夹中是为mongoose定义的models
5.node_modules中是一些第三方的库
6.package.json是队本项目一些信息的介绍
7.public中本项目只用到了stylesheets中的style.css
8.routes文件夹里是路由文件
  其中restful中是提供给第三方软件的路由
9.views中是模板文件
