# redis

## mac edis server端的安装
```shell
# 安装
brew install redis
# 启动
brew service start redis
# 查看redis的启动状态
# 或者执行：redis-server
brew services list | grep redis
# 通过控制台进入本地的redis
redis-cli -h 127.0.0.1
# 默认的conf文件,端口6379
cat /usr/local/etc/redis.conf
# 指定配置启动的方式（这里是默认配置）
redis-server /usr/local/etc/redis.conf
```
> 开发和测试阶段才考虑使用默认配置，正式环境使用自定义配置文件

## redis client

学习参考这里：<https://www.ibm.com/developerworks/cn/opensource/os-cn-nodejs-redis/index.html>

```js
// redis 的配置
const redisConf = {
    'host': '127.0.0.1',
    'port': '6379'
};

const rediz = require('redis');
const Q = require('bluebird');

// 通过bluebird将redis的同步操作转换成异步方式
// redies原先的同步操作 API 依旧保留，在同步 API 方法名后追加 Async 即为新的异步 API
Q.promisifyAll(rediz.RedisClient.prototype);
Q.promisifyAll(rediz.Multi.prototype);

// 创建了一个 Redis 客户端
const redis = rediz.createClient(redisConf);
```