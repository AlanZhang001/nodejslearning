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
- <sequlize><https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md>
