# pm2 笔记

- [pm2 processes.json 配置](http://pm2.keymetrics.io/docs/usage/application-declaration/)
- [pm2 学习](https://www.cnblogs.com/zhoujie/p/nodejs4.html)

#### 常见问题
#### 1. pm2.config文件中，env 变量更新后，通过pm2 restart启动，process.env 获取的变量未更新
- 原因：没有找到特别的原因，官方的提供的 --update-env也并不是有用。网上也有蛮多这个问题的反馈<https://www.coder.work/article/5074119>,<https://github.com/Unitech/pm2/issues/528>,<https://github.com/Unitech/pm2/issues/3192>。截止到3.5.1, 也没有太好的办法。
- 解决办法：目前唯一可靠的方法是 `pm2 stop xxx && pm2 delete xxx && pm2 start pm2.config.js`
