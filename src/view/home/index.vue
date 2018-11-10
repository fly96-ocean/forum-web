<template>
  <div class="home">
    <van-search placeholder="请输入关键词" />
    <van-swipe :autoplay="4000">
      <van-swipe-item v-for="ad in ads">
        <img v-lazy="ad.imageUrl" class="home-swipe-image" />
      </van-swipe-item>
    </van-swipe>
    <van-tabs class="home-tabs" @click="onClick">

      <van-tab title="最新">
        <div v-if="newArticles.length<=0" class="home-empty-container">
          <img v-lazy="emptyUrl" class="empty-image">
          <div class="empty-text">暂无数据</div>
        </div>
        <div v-else-if="newArticles.length>0" v-for="(article, index) in newArticles" class="home-container">
          <van-row gutter="20">
            <van-col span="4">
              <img v-lazy="article.userAvatarURL" class="avatar">
            </van-col>
            <van-col span="16">
              <van-row class="title" >
                <van-col span="24" class="title-top"><a @click="toArticleDetail(article.oId)">{{article.articleTitle}} </a></van-col>
              </van-row>
              <van-row class="title">
                <van-col span="24" class="title-bottom">{{article.articleCreateTime | dataFormat('MM-dd hh:mm')}}
                  <van-tag v-for="tag in article.articleTagsList" class="tags">{{tag}}</van-tag>
                </van-col>
              </van-row>
            </van-col>
            <van-col span="4" class="more">
              <i class="iconfont icon-more"  @click="operate(article, index)"></i>
            </van-col>
          </van-row>
          <!--<van-row class="content">
            <van-col>
              <a @click="toArticleDetail(article.oId)" v-text="$options.filters.articleBrief(article.articleContent) "></a>
            </van-col>
          </van-row>-->
          <van-row gutter="10" class="images">
            <van-col v-if="article.articleImgs.length==1" span="24" v-for="(image, index) in article.articleImgs" :key="index">
              <div :style="{backgroundImage: 'url('+host+'/' + image + ')'}" @click="imagePreview(article.articleImgs, index)" style="backgroundSize: cover; width: 100%; height:150px; background-position: center;">

              </div>
            </van-col>
            <van-col v-if="article.articleImgs.length==2" span="12" v-for="(image, index) in article.articleImgs" :key="index">
              <div :style="{backgroundImage: 'url('+host+'/' + image + ')'}" @click="imagePreview(article.articleImgs, index)" style="backgroundSize: cover; width: 100%; height:150px; background-position: center;">

              </div>
            </van-col>
            <van-col v-if="article.articleImgs.length>=3" span="8" v-for="(image, index) in article.articleImgs" :key="index">
              <div :style="{backgroundImage: 'url('+host+'/' + image + ')'}" @click="imagePreview(article.articleImgs, index)" style="backgroundSize: cover; width: 100%; height:150px; background-position: center;">

              </div>
            </van-col>

          </van-row>

          <van-row gutter="10" class="operate" align="center">
            <van-col span="8" class="item">
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
            <van-col span="8" class="item">
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
        </div>
      </van-tab>

      <van-tab v-for="(domain, index) in domains" :title="domain.domainTitle" :id="domain.oId">
        <div v-if="domain.articles==null || domain.articles.length<=0" class="home-empty-container">
          <img v-lazy="emptyUrl" class="empty-image">
          <div class="empty-text">暂无数据</div>
        </div>
        <div v-if="domain.articles.length>0"  v-for="(article, index) in domain.articles" class="home-container">
          <van-row gutter="20">
            <van-col span="4">
              <img v-lazy="article.userAvatarURL" class="avatar">
            </van-col>
            <van-col span="16">
              <van-row class="title" >
                <van-col span="24" class="title-top"><a @click="toArticleDetail(article.oId)">{{article.articleTitle}} </a></van-col>
              </van-row>
              <van-row class="title">
                <van-col span="24" class="title-bottom">{{article.articleCreateTime | dataFormat('MM-dd hh:mm')}}
                  <van-tag v-for="tag in article.articleTagsList" class="tags">{{tag}}</van-tag>
                </van-col>
              </van-row>
            </van-col>
            <van-col span="4" class="more">
              <i class="iconfont icon-more"  @click="operate(article, index)"></i>
            </van-col>
          </van-row>
          <!--<van-row class="content">
            <van-col>
              <a @click="toArticleDetail(article.oId)" v-html="article.articleContent"></a>
            </van-col>
          </van-row>-->
          <van-row gutter="10" class="images">

            <van-col v-if="article.articleImgs.length==1" span="24" v-for="(image, index) in article.articleImgs" :key="index">
              <div :style="{backgroundImage: 'url('+host+'/' + image + ')'}" @click="imagePreview(article.articleImgs, index)" style="backgroundSize: cover; width: 100%; height:150px; background-position: center;">
              </div>
            </van-col>
            <van-col v-if="article.articleImgs.length==2" span="12" v-for="(image, index) in article.articleImgs" :key="index">
              <div :style="{backgroundImage: 'url('+host+'/' + image + ')'}" @click="imagePreview(article.articleImgs, index)" style="backgroundSize: cover; width: 100%; height:150px; background-position: center;">
              </div>
            </van-col>
            <van-col v-if="article.articleImgs.length>=3" span="8" v-for="(image, index) in article.articleImgs" :key="index">
              <div :style="{backgroundImage: 'url('+host+'/' + image + ')'}" @click="imagePreview(article.articleImgs, index)" style="backgroundSize: cover; width: 100%; height:150px; background-position: center;">
              </div>
            </van-col>
          </van-row>

          <van-row gutter="10" class="operate" align="center">
            <van-col span="8" class="item">
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
            <van-col span="8" class="item">
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
  </div>

</template>
<script>
  import {Search, Swipe, SwipeItem, Lazyload, Tab, Tabs, Row, Col,Tag, ImagePreview, Actionsheet, Toast, Field, Button} from 'vant';
  import api from '../../axios/api.js';
  import common from '../../common/common.js';
  import VueStar from 'vue-star'

  export default {
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Lazyload.name]: Lazyload,
      [Search.name]: Search,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Row.name]: Row,
      [Col.name]: Col,
      [Tag.name]: Tag,
      [ImagePreview.name]: ImagePreview,
      [Actionsheet.name]: Actionsheet,
      [Toast.name]: Toast,
      [Field.name]: Field,
      [Button.name]: Button,
      [VueStar.name]: VueStar
    },
    data() {
      return {
        ads: [],
        domains: [],
        newArticles: [],
        articleTags: [],
        emptyUrl: require('../../assets/images/empty.jpg'),
        show: false,
        commentShow: false,
        actions: [
          {
            name: '收藏此贴'
          }
        ],
        goodStarActive: '',
        watchStarActive: '',
        goodCurrentStatus:[],
        watchCurrentStatus: [],
        currentArticle : '',
        currentArticleIndex: '',
        commentContent: '',
        host: common.host
      };
    },
    created() {
      this.getTopAds();
      this.getDomains();
      this.getNewestArticle();

    },
    filters:{
      articleBrief:function(value){
        if (!value) return ''
        value = value.toString()
        var reTag = /<img(?:.|\s)*?>/g;
        value = value.replace(reTag,'')
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
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
      },
      onSelect(item) {
        this.show = false;
        this.collect(this.currentArticle.oId, this.currentArticleIndex);
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
        });
      },
      imagePreview(articleImgs, j){
        var imageUrls = [];
        for (var i = 0; i < articleImgs.length; i++) {
          imageUrls.push(this.host+"/"+articleImgs[i]);
        }
        ImagePreview({images: imageUrls, startPosition: j});
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
        api.get(common.host + '/api/domain/list', {domainType: 0}).then(res => {
          this.domains = res.msg;
        });
      },

      /**
       * 获取最新帖子
       */
      getNewestArticle(){
        api.get(common.host + '/api/article/newList', {articleType: 0}).then(res => {
          this.newArticles = res.msg;
          for(var i = 0; i<this.newArticles.length; i ++){
            this.goodCurrentStatus[i] = this.newArticles[i].hasGood;
            this.watchCurrentStatus[i] = this.newArticles[i].hasWatchedArticle;
          }
      })
        ;
      },

      onClick(index, title) {
        this.getDomainsArticle(this.domains[index-1]);
      },

      /**
       * 分类下的帖子
       * @param domainsId
       */
      getDomainsArticle(domain){
        api.get(common.host + '/api/article/domainArticleList', {articleType: 0, domainId: domain.oId}).then(res => {
          domain.articles = res.msg;
        });
      },

      /**
       * 获取顶部广告
       */
      getTopAds(){
        api.get(common.host + '/api/ad/list').then(res => {
          this.ads = res.msg;
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
  .home{
    margin-bottom: 50px;
    &-swipe-image{
       height: 220px;
       width: 100%;
    }
    &-tabs{
        color:"#fbce07";
    }
    &-container{
       background-color: #fff;
       padding: 10px;
       margin-top: 10px;
      .avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .title{
        height: 25px;
        .title-top{
          font-weight: bold;
          font-size: 16px;
          color: #494949;
        }
        .title-bottom{
          font-size: 12px;
          color: #989898;
          .tags{
            margin-left: 5px;
          }
        }
      }
      .content{
        border-top: solid 1px #f8f8f8;
        margin-top: 10px;
        padding-top:10px;
        color: #333333;
        letter-spacing: 0;
        line-height: 25px;
        max-height: 150px;
        overflow: hidden;
        word-wrap: break-word;
      }
      .images{
        margin-top: 10px;
        .item{
          height:100px;
          width: 100%;
        }
      }
      .more{
        height: 50px;
        line-height: 50px;
        text-align: right;
      }

      .operate{
        border-top: solid 1px #f8f8f8;
        margin-top: 10px;
        padding-top:10px;
        .item{
          text-align: center;
          color: #919191;
          .count{
            font-size: 14px;
            margin-left: 5px;
          }

          .active{
            -webkit-animation:flutter 1.2s ease-in-out;
            animation:flutter 1.2s 1 ease-in-out;
          }
        }
      }
    }

    &-empty-container{
       background-color: #fff;
       text-align: center;
       height: 100%;
       color: #919191;
       position: fixed;
       width: 100%;
     }
      .empty-image{
        width: 30%;
        margin-top: 20%;
      }
      .empty-text{
        font-size: 12px;
      }

    .vue-star {
      color: #919191;
    }

    .vue-star-active {
      color: #F05654;
    }
  }

</style>
