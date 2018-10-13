# node连接mysql

## 环境安装

#### 1. 安装mysql数据库驱动
```shell
npm install mysql --save-dev
```

#### 2. 下载mysql server

###### windows

下载地址:官网下载地址：https://dev.mysql.com/downloads/mysql/

###### mac

安装mysql

```shell
# 安装
brew install mysql@5.7
brew link mysql@5.7 --force

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
```
1. ERROR! The server quit without updating PID file
```
找了很久，没找出解决办法，卸载重装

```shell
# 卸载
brew uninstall mysql@5.7
sudo rm -rf /usr/local/var/mysql
# 重新执行上面的安装步骤
```