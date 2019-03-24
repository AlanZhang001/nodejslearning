/**
 * 搭建一个简易的个人博客，将热门文章缓存在 Redis 中
 */

import ArticleMySQLHelper from './ArticleMySQLHelper';

export default class {
    constructor(redis) {
        this.redis = redis;
        // 存放文章 ID 的集合
        this.ArticleIDSet = "AIDSet";
        // 文章 KEY 前缀
        this.ArticleIDPrefix = "Article";
        // 评论 KEY 前缀
        this.CommentIDPrefix = "Comment";
        // 用处： 一篇 id 为 100000 的文章在 Redis 中的键为 Article100000，评论组键为 Comment100000。
    }

    /**
     * 读取文章 ID 列表
     * 设计数据库时，我们设置文章的 id 作为主键并自动递增。
     * 为了方便文章按新旧顺序显示，我们要在 Reids 中储存一份有序的文章 id 列表
     */
    async getArticleIDs() {

        let artis = await ArticleMySQLHelper.getIDs();
        if (artis.length === 0) {
            return null;
        }

        let artis = [];
        artis.forEach((arti) => {
            artis.push(
                // zaddAsync添加到有序集合的时候，value[0] 是 score，排序的权重值，这里都是1，
                // 表示都是根据id来拍讯
                this.redis.zaddAsync(this.ArticleIDSet, [1, arti.ID])
            );
        });

        await Promise.all(artis);
    }

    /**
     * 读取文章
     */
    async getArticleByID(id) {
        let articelKey = this.ArticleIDPrefix + id;
        // HGETALL returns an Object keyed by the hash keys.
        let article = await this.redis.hgetallAsync(articelKey);

        // 为空时从sql中读取并保存至redis
        if (article === null){
            article = await ArticleMySQLHelper.getOne(id);
            await this.redis.hmsetAsync(articelKey, article);
        }

        return article;
    }

    /**
     * 显示文章列表
     * zrevrange() 方法从 Redis 中倒序读取有序集合中的一段区间 id
     */
    async getArticleList(offset, size){
        let idList = this.redis.zrevrangeAsync([this.ArticleIDSet, offset, offset + size - 1]);

        var _ = [];
        idList.forEach((id) => {
            _.push(this.getArticleByID(id));
        });

        let articleList = await Promise.all(_);

        return articleList;
    }

    async getCommentsByID(id){

        let commentKey = this.CommentIDPrefix + id;
        let commentList = await this.redis.zrangeAsync(commentKey + id, [0, -1]);

        if(commentList === null) {
            commentList = await ArticleMySQLHelper.getComments(id);
            let _ = [];
            commentList.forEach(function (cmmt) {
                _.push(
                    this.redis.zaddAsync(commentKey, [cmmt.index, cmmt.body])
                );
            });
            await Promise.all(_);
        }

        return commentList;
    }

    /**
     * 用户添加评论方法
     * @param {*} id
     * @param {*} comment
     */
    async addComment(id, comment){
        await ArticleMySQLHelper.saveComment(id, comment);
        await this.redis.expireAsync(that.ArticleIDPrefix + id, [0]);
    }

    /**
     * 带过期设置的读取文章方法
     */
    async getArticleExpire(id){
        let articelKey = this.ArticleIDPrefix + id;
        let article = await this.redis.hgetallAsync();
        if(article === null) {
            article = await ArticleMySQLHelper.getOne(id);
            await this.redis.hmsetAsync(articelKey, article);
            await this.redis.expireAsync(tarticelKey, 3600 * 2);
        }

        return article;
    }
}