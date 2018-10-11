# 终于可以学习的nodejs

## 学习资源
<https://github.com/nswbmw/N-blog>

## 工具技巧

##### 1. 如何查看nodejs是否支持某个特性
- 通过<https://node.green/>查看
- 通过es-checker来检测[感觉并不太准确，node 10.3 ,居然检测出不支持]

##### 2. nodejs 如何调试：

```shell
# 安装nodemon，全局或者本地安装
npm i nodemon --save-dev
# 启动inspect
nodemon --inspect server/index.js
```

打开chrome 控制台，点击node的调试控制台：

![](./asserts/inspect.jpg)

>本地安装nodemon时，建议将启动脚本写入package.json

```shell
# package.json
# 运行npm run debug即可
"scripts": {
    "debug": "cross-env NODE_ENV=development nodemon --inspect server/index.js",
},
```


## 文章
[浅析 NodeJs 的几种文件路径](https://github.com/imsobear/blog/issues/48)