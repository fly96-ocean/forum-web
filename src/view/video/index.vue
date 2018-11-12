<template>
    <div class="video">
        <van-tabs class="video-tabs" @click="onClick">
            <van-tab title="最新">
                <div v-if="newArticles.length<=0"  class="video-empty-container">
                    <img v-lazy="emptyUrl" class="empty-image">
                    <div class="empty-text">暂无数据</div>
                </div>
                <div v-else-if="newArticles.length>0" v-for="(article, index) in newArticles" class="video-container">
                    <van-row gutter="20">
                        <van-col span="20" class="title">
                            <a @click="toArticleDetail(article.oId)">{{article.articleTitle}}</a>
                        </van-col>
                        <van-col span="4" class="more">
                            <i class="iconfont icon-more"  @click="operate(article, index)"></i>
                        </van-col>
                    </van-row>
                    <van-row gutter="20">
                        <van-col span="20" class="title">
                            <van-tag v-for="tag in article.articleTagsList" class="tags">{{tag}}</van-tag>
                        </van-col>
                    </van-row>
                    <van-row class="content" v-show="article.articleImg1URL">
                        <van-col span="24">
                            {{article.articleContent}}
                        </van-col>
                        <van-col span="24">
                            <video @click="showVideo(host+'/'+article.articleImg1URL)" class="preVideo" controls="controls" :src="host+'/'+article.articleImg1URL"></video>
                        </van-col>
                    </van-row>

                    <van-row gutter="10" class="operate" align="center">
                        <van-col span="4" class="info">
                            <van-row gutter="5">
                                <van-col span="6">
                                    <img v-lazy="article.userAvatarURL" class="avatar">
                                </van-col>
                            </van-row>
                        </van-col>
                        <van-col span="20" class="item">
                            <van-row gutter="5" align="center">
                                <van-col span="8">
                                    <vue-star animate="animated rotateIn" :currentStatus="goodCurrentStatus[index]">
                                        <a v-if="article.hasGood>0" href="javascript:void(0)" class="vue-star vue-star-active" slot="icon"   @click="zan(article.oId, index)">
                                            <i class="fa fa-thumbs-up"></i>
                                        </a>

                                        <a v-else-if="article.hasGood==0" href="javascript:void(0)" class="vue-star" slot="icon" @click="zan(article.oId, index)">
                                            <i class="fa fa-thumbs-up"></i>
                                        </a>
                                        <span class="count" slot="count">{{article.articleGoodCnt}}</span>
                                    </vue-star>
                                </van-col>

                                <van-col span="8">
                                    <vue-star animate="animated bounceIn">
                                        <a href="javascript:void(0)" class="vue-star" slot="icon"   @click="quickComment(article, index)">
                                            <i class="fa fa-comment"></i>
                                        </a>
                                        <span class="count" slot="count">{{article.articleCommentCount}}</span>
                                    </vue-star>
                                </van-col>

                                <van-col span="8" class="item">
                                    <vue-star animate="animated rotateIn" :currentStatus="watchCurrentStatus[index]">
                                        <a v-if="article.hasWatchedArticle>0" href="javascript:void(0)" class="vue-star vue-star-active" slot="icon" @click="watch(article.oId, index)">
                                            <i slot="icon" class="fa fa-eye"></i>
                                        </a>
                                        <a v-else-if="article.hasWatchedArticle==0" href="javascript:void(0)" class="vue-star" slot="icon" @click="watch(article.oId, index)">
                                            <i slot="icon" class="fa fa-eye"></i>
                                        </a>

                                        <span class="count" slot="count">{{article.articleWatchCnt}}</span>
                                    </vue-star>
                                </van-col>

                            </van-row>

                        </van-col>
                    </van-row>
                </div>
            </van-tab>

            <van-tab v-for="(domain, index) in domains" :title="domain.domainTitle" :id="domain.oId">
                <div v-if="domain.articles==null || domain.articles.length<=0" class="video-empty-container">
                    <img v-lazy="emptyUrl" class="empty-image">
                    <div class="empty-text">暂无数据</div>
                </div>
                <div v-if="domain.articles.length>0"  v-for="(article, index) in domain.articles" class="video-container">
                    <van-row gutter="20">
                        <van-col span="20" class="title">
                            <a @click="toArticleDetail(article.oId)">{{article.articleTitle}}</a>
                        </van-col>
                        <van-col span="4" class="more">
                            <i class="iconfont icon-more"  @click="operate(article, index)"></i>
                        </van-col>
                    </van-row>
                    <van-row gutter="20">
                        <van-col span="20" class="title">
                            <van-tag v-for="tag in article.articleTagsList" class="tags">{{tag}}</van-tag>
                        </van-col>
                    </van-row>
                    <van-row class="content" v-show="article.articleImg1URL">
                        <van-col span="24">
                            {{article.articleContent}}
                        </van-col>
                        <van-col span="24">
                            <video @click="showVideo(host+'/'+article.articleImg1URL)" class="preVideo" controls="controls" :src="host+'/'+article.articleImg1URL"></video>
                        </van-col>
                    </van-row>

                    <van-row gutter="10" class="operate" align="center">
                        <van-col span="4" class="info">
                            <van-row gutter="5">
                                <van-col span="6">
                                    <img v-lazy="article.userAvatarURL" class="avatar">
                                </van-col>
                            </van-row>
                        </van-col>
                        <van-col span="20" class="item">
                            <van-row gutter="5" align="center">
                                <van-col span="8">
                                    <vue-star animate="animated rotateIn" :currentStatus="goodCurrentStatus[index]">
                                        <a v-if="article.hasGood>0" href="javascript:void(0)" class="vue-star vue-star-active" slot="icon"   @click="zan(article.oId, index)">
                                            <i class="fa fa-thumbs-up"></i>
                                        </a>

                                        <a v-else-if="article.hasGood==0" href="javascript:void(0)" class="vue-star" slot="icon" @click="zan(article.oId, index)">
                                            <i class="fa fa-thumbs-up"></i>
                                        </a>
                                        <span class="count" slot="count">{{article.articleGoodCnt}}</span>
                                    </vue-star>
                                </van-col>

                                <van-col span="8">
                                    <vue-star animate="animated bounceIn">
                                        <a href="javascript:void(0)" class="vue-star" slot="icon"   @click="quickComment(article, index)">
                                            <i class="fa fa-comment"></i>
                                        </a>
                                        <span class="count" slot="count">{{article.articleCommentCount}}</span>
                                    </vue-star>
                                </van-col>

                                <van-col span="8" class="item">
                                    <vue-star animate="animated rotateIn" :currentStatus="watchCurrentStatus[index]">
                                        <a v-if="article.hasWatchedArticle>0" href="javascript:void(0)" class="vue-star vue-star-active" slot="icon" @click="watch(article.oId, index)">
                                            <i slot="icon" class="fa fa-eye"></i>
                                        </a>
                                        <a v-else-if="article.hasWatchedArticle==0" href="javascript:void(0)" class="vue-star" slot="icon" @click="watch(article.oId, index)">
                                            <i slot="icon" class="fa fa-eye"></i>
                                        </a>

                                        <span class="count" slot="count">{{article.articleWatchCnt}}</span>
                                    </vue-star>
                                </van-col>

                            </van-row>

                        </van-col>
                    </van-row>
                </div>
            </van-tab>
        </van-tabs>

        <van-actionsheet
                v-model="show"
                :actions="actions"
                cancel-text="取消"
                @select="onSelect"
                @cancel="onCancel"
        />

        <van-actionsheet v-model="commentShow" title="快速回复此贴">
            <van-field
                    v-model="commentContent"
                    type="textarea"
                    placeholder="请输入评论内容"
                    rows="2"
                    autosize
            >
                <van-button slot="button" size="small" type="primary" @click="submitComment">提交</van-button>
            </van-field>
        </van-actionsheet>
        <van-popup v-model="popupShow">
            <video class="originalVideo" autoplay="autoplay" controls="controls" :src="currentVideoUrl"></video>
        </van-popup>
    </div>

</template>
<script>
    import {Lazyload, Tab, Tabs, Row, Col, Tag, Actionsheet, Field, Button, Toast, Popup} from 'vant';
    import api from '../../axios/api.js';
    import common from '../../common/common.js';
    import VueStar from 'vue-star'

    export default {
        components: {
            [Lazyload.name]: Lazyload,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Col.name]: Col,
            [Tag.name]: Tag,
            [Actionsheet.name]: Actionsheet,
            [Field.name]: Field,
            [Button.name]: Button,
            [Toast.name]: Toast,
            [Popup.name]: Popup,
            [VueStar.name]: VueStar
        },
        data() {
            return {
                domains: [],
                newArticles: [],
                articleTags: [],
                goodStarActive: '',
                watchStarActive: '',
                goodCurrentStatus:[],
                watchCurrentStatus: [],
                currentArticle : null,
                currentArticleIndex: '',
                emptyUrl: require('../../assets/images/empty.jpg'),
                show: false,
                commentShow: false,
                popupShow: false,
                commentContent: '',
                actions: [
                    {
                        name: '关注楼主'
                    },
                    {
                        name: '收藏此贴'
                    }
                ],
                currentVideoUrl: null,
                host:common.host,

            };
        },
        created() {
            this.getDomains();
            this.getNewestArticle();
        },
        methods: {
            operate(article, index){
                this.show = true;
                this.currentArticle = article;
                this.currentArticleIndex = index;
                if(article.hasCollect>0) {
                    this.actions[0].name = '取消收藏'
                } else {
                    this.actions[0].name = '收藏此帖'
                }
                if(article.hasWatchedAuthor>0){
                    this.actions[1].name = '取消关注楼主'
                } else {
                    this.actions[1].name = '关注楼主'
                }
            },
            onSelect(item) {
                this.show = false;
                console.log(this.currentArticle);
                if(item.name=='关注楼主'||item.name=='取消关注楼主'){
                    this.watchAuthor(this.currentArticle.articleAuthorId, this.currentArticleIndex);
                }
                if(item.name=='收藏此帖'||item.name=='取消收藏此帖'){
                    this.collect(this.currentArticle.oId, this.currentArticleIndex);
                }
            },
            onCancel(){

            },
            quickComment(article, index){
                this.commentShow = true;
                this.currentArticle = article;
                this.currentArticleIndex = index;
            },
            submitComment(){
                var articleId = this.currentArticle.oId;
                api.post(common.host + '/api/comment/save', {articleId: articleId, commentContent:this.commentContent}).then(res => {
                    Toast.success('评论成功');
                this.newArticles[this.currentArticleIndex].articleCommentCount += 1;
                this.commentShow = false;
                this.commentContent = '';
            });
            },
            imagePreview(articleImgs, j){
                var imageUrls = [];
                for (var i = 0; i < articleImgs.length; i++) {
                    imageUrls.push(this.host+"/"+articleImgs[i]);
                }
                ImagePreview({images: imageUrls, startPosition: j});
            },
            showVideo(url){
                this.popupShow = true;
                this.currentVideoUrl = url;
            },
            toArticleDetail(articleId){
                this.$router.push({
                    path: '/articleDetail/'+articleId
                })
            },
            /**
             * 获取所有帖子分类
             * */
            getDomains(){
                api.get(common.host + '/api/domain/list', {domainType: 1}).then(res => {
                    this.domains = res.msg;
                });
            },
            /**
             * 获取最新帖子
             */
            getNewestArticle(){
                api.get(common.host + '/api/article/newList', {articleType: 1}).then(res => {
                    this.newArticles = res.msg;
                for(var i = 0; i<this.newArticles.length; i ++){
                    this.goodCurrentStatus[i] = this.newArticles[i].hasGood;
                    this.watchCurrentStatus[i] = this.newArticles[i].hasWatchedArticle;
                }
                });
            },
            onClick(index, title) {
                this.getDomainsArticle(this.domains[index-1]);
            },

            /**
             * 分类下的帖子
             * @param domainsId
             */
            getDomainsArticle(domain){
                api.get(common.host + '/api/article/domainArticleList', {articleType: 1, domainId: domain.oId}).then(res => {
                    domain.articles = res.msg;
                });
            },
            zan(articleId, index){
                if (this.newArticles[index].hasGood > 0) {
                    this.newArticles[index].hasGood = 0;
                    this.newArticles[index].articleGoodCnt -= 1;
                    api.get(common.host + '/api/article/cancelGood', {articleId: articleId}).then(res => {
                        console.log("取消成功");
                });
                } else if (this.newArticles[index].hasGood == 0) {
                    this.newArticles[index].hasGood += 1;
                    this.newArticles[index].articleGoodCnt += 1;
                    api.get(common.host + '/api/article/good', {articleId: articleId}).then(res => {
                        console.log("点赞成功");
                })
                    ;

                }

            },

            watch(articleId, index){
                if (this.newArticles[index].hasWatchedArticle > 0) {
                    this.newArticles[index].hasWatchedArticle = 0;
                    api.get(common.host + '/api/article/cancelWatch', {articleId: articleId}).then(res => {
                        console.log("取消关注");
                    this.newArticles[index].articleWatchCnt -= 1;
                })
                } else if (this.newArticles[index].hasWatchedArticle == 0) {
                    this.newArticles[index].hasWatchedArticle += 1;
                    api.get(common.host + '/api/article/watch', {articleId: articleId}).then(res => {
                        console.log("关注成功");
                    this.newArticles[index].articleWatchCnt += 1;
                })
                    ;
                }

            },

            watchAuthor(articleAuthorId, index){
                if (this.newArticles[index].hasWatchedAuthor > 0) {
                    this.newArticles[index].hasWatchedAuthor = 0;
                    api.get(common.host + '/api/user/cancelFollow', {userId: articleAuthorId}).then(res => {
                        Toast.success('取消关注');
                });
                } else if (this.newArticles[index].hasWatchedAuthor == 0) {
                    this.newArticles[index].hasWatchedAuthor += 1;
                    api.get(common.host + '/api/user/follow', {userId: articleAuthorId}).then(res => {
                        Toast.success('成功关注');
                });
                }

            },

            collect(articleId, index){
                if (this.newArticles[index].hasCollect > 0) {
                    this.newArticles[index].hasCollect = 0;
                    api.get(common.host + '/api/article/cancelCollect', {articleId: articleId}).then(res => {
                        Toast.success('取消收藏此帖');
                })
                } else if (this.newArticles[index].hasCollect == 0) {
                    this.newArticles[index].hasCollect += 1;
                    api.get(common.host + '/api/article/collect', {articleId: articleId}).then(res => {
                        Toast.success('成功收藏此帖');
                })
                }
            }
        }
    };
</script>
<style lang="less">
    .video {
        margin-bottom: 50px;
        &-swipe-image {
            height: 220px;
            width: 100%;
        }
        &-tabs {
            color: "#fbce07";
        }
        &-container {
            background-color: #fff;
            padding: 10px;
            margin-top: 10px;
            .avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                float: left;
            }
            .title {
                height: 25px;
                font-weight: bold;
                font-size: 16px;
                color: #494949;
            }
            .content {
                border-top: solid 1px #f8f8f8;
                margin-top: 10px;
                padding-top: 10px;
                color: #333333;
                letter-spacing: 0;
                line-height: 25px;
                max-height: 150px;
                overflow: hidden;
                word-wrap: break-word;
            }
            .more {
                text-align: right;
            }

            .operate {
                border-top: solid 1px #f8f8f8;
                margin-top: 10px;
                padding-top: 10px;

                .item {
                    text-align: center;
                    color: #919191;

                    .count {
                        font-size: 14px;
                        margin-left: 5px;
                    }
                }
                .info{
                    &-tags{
                         text-align: left;
                        .tag{
                            margin-left: 5px;
                        }
                    }
                }

            }
        }

        &-empty-container {
            background-color: #fff;
            text-align: center;
            height: 100%;
            color: #919191;
            position: fixed;
            width: 100%;
        }

        .originalVideo{
            width: 100%;
        }
        .empty-image {
            width: 30%;
            margin-top:45%;
        }

        .empty-text {
            font-size: 12px;
        }

        .vue-star {
            color: #919191;
        }

        .vue-star-active {
            color: #F05654;
        }

        .van-actionsheet{
            margin-bottom: 50px !important;
        }


    }

</style>
