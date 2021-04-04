# node连接mysql

## 环境安装

#### 1. 安装mysql数据库驱动

```shell
npm install mysql --save-dev
```

#### 2. 下载mysql server

###### windows

1. 下载地址:官网下载地址：https://dev.mysql.com/downloads/file/?id=479141 （5.7）
2. 将mysql 加入环境变量 C:\Program Files\MySQL\MySQL Server 8.0\bin
3. net start/stop MySQL80(服务名自己查：win+R，运行services.msc，找到mysql)
4. mysql -u root -p

###### mac

安装mysql

```shell
# 安装
brew install mysql@5.7
brew link mysql@5.7 --force
# 安装完要启动，否者会报：Can't connect to local MySQL server through socket '/tmp/mysql.sock'的错误
mysql.server start

# 安装完成会有一堆提示，按照提示操作，不要遗漏
# MySQL安全配置向导,详细配置见：https://blog.csdn.net/vsiryxm/article/details/44220551，设置root 密码
mysql_secure_installation

# 启动
brew services start mysql@5.7
brew services restart mysql@5.7

# 连接、输入密码
mysql -u root -p -h localhost
```

如果出现问题:
```shell
1. ERROR! The server quit without updating PID file
```
找了很久，没找出解决办法，卸载重装

```shell
# 卸载
brew uninstall mysql@5.7
sudo rm -rf /usr/local/var/mysql
# 重新执行上面的安装步骤
```

#### 一些要记的不常用命令

```shell
# 显示表结构
desc table_name;
# 显示创建表的sql语句
show create table table_name;
# 查看数据路使用容量
# Mysql中会有一个默认的数据库：information_schema，里面有一个Tables表记录了所有表的信息
# 以M为单位
use information_schema;
SELECT TABLE_SCHEMA, SUM(DATA_LENGTH)/1024/1024  FROM TABLES GROUP BY TABLE_SCHEMA;
```

## orm框架

#### sequelize教程
- [sequelize](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md)

#### 一些问题

1. sequelize 6.x的版本，不再支持import方法，即 `new Sequelize()`实例不再具备import方法:https://sequelize.org/master/manual/models-definition.html

2. 在mysql数据中，sequelize 4及以上，除了需要安装mysql依赖之外，还需要安装mysql2


## 工具推荐

#### mycli mysql的命令行提示工具

<https://github.com/dbcli/mycli>

```shell
# install
brew update && brew install mycli
# start
mycli -u用户名 -p密码
```

## 教程

## Node.js Sequelize 实现数据库读写分离

简明教程: https://itbilu.com/nodejs/npm/VydcPndib.html

关键点：
- 要在Sequelize中使用读/写复制，可以在初始化Sequelize时有时向其replication选项传递一个对象.这个对象read、write两个属性。write是一个单一的对象(即：由单台服务器处理写入)，而read是一个包含对象的数组(即：由多台服务器处理读取)
- Sequelize 并不会设置主从复制节点及节点间的数据同步(复制)，这些操作实际由MySQL(或你所使用的数据库)完成。而 Sequelize 只负责从主从节点写入或读取数据。

#### 主从同步的好处

- 主库有问题，可以快速切换到从库
- 可以从库查询，主库更新
- 实现读写分离，在从库备份，避免影响主库的服务

#### 主从同步的原理

简明教程：https://zhuanlan.zhihu.com/p/89796383

关键点：
- 在master机器上，主从同步事件会被写到特殊的log文件中(binary-log);在slave机器上，slave读取主从同步事件，并根据读取的事件变化，在slave库上做相应的更改。

#### 主从同步的实现过程