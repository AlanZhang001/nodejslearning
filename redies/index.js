// 从这里学习
// https://www.ibm.com/developerworks/cn/opensource/os-cn-nodejs-redis/index.html

// redis 的配置
const redisConf = {
    'host': '127.0.0.1',
    'port': '6379'
};

const rediz = require('redis');
const Q = require('bluebird');

// redies原先的同步操作 API 依旧保留，在同步 API 方法名后追加 Async 即为新的异步 API
Q.promisifyAll(rediz.RedisClient.prototype);
Q.promisifyAll(rediz.Multi.prototype);

// 创建了一个 Redis 客户端
const redis = rediz.createClient(redisConf);

redis.on('error', function (err) {
    console.log('error event - ' + redis.host + ': ' + redis.port + ' - ' + err);
});

async function getValue(keyName,inital= 0) {
    let value = await redis.getAsync(keyName);
    value = value || inital;

    await redis.setAsync(keyName, ++value);

    return value;
}

async function test(params) {
    console.log(await getValue('count'));
    console.log(await getValue('count'));
}
