<template>
  <div class="home">
    <van-search placeholder="请输入关键词" />
    <van-swipe :autoplay="4000">
      <van-swipe-item v-for="(image, index) in ads" :key="index">
        <img v-lazy="image.imageUrl" class="home-swipe-image" />
      </van-swipe-item>
    </van-swipe>
    <van-tabs class="home-tabs">

      <van-tab title="最新">
        <div v-if="newArticles.length<=0" class="home-empty-container">
          <img v-lazy="emptyUrl" class="empty-image">
          <div class="empty-text">暂无数据</div>
        </div>
        <div v-else-if="newArticles.length>0" v-for="(article, index) in newArticles" class="home-container mg-t-0">
          <van-row gutter="20">
            <van-col span="4">
              <img v-lazy="avatar1Url" class="avatar">
            </van-col>
            <van-col span="16">
              <van-row class="title" >
                <van-col span="24" class="title-top"><a @click="toArticleDetail()">{{article.articleTitle}} </a></van-col>
              </van-row>
              <van-row class="title">
                <van-col span="24" class="title-bottom">14小时前
                  <van-tag class="tags">维修</van-tag>
                  <van-tag class="tags">求助</van-tag>
                </van-col>
              </van-row>
            </van-col>
            <van-col span="4" class="more">
              <i class="iconfont icon-more"  @click="operate()"></i>
            </van-col>
          </van-row>
          <van-row class="content">
            <van-col>
              <a @click="toArticleDetail()">{{article.articleContent}}</a>
            </van-col>
          </van-row>
          <van-row gutter="10" class="images">
            <van-col span="8" v-for="(image, index) in images" :key="index">
              <img v-lazy="image.url" class="item" @click="imagePreview(index)">
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
                <i slot="icon" class="fa fa-comment"></i>
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

      <van-tab v-for="(domain, index) in domains" :title="domain.domainTitle">
        <div class="home-empty-container">
          <img v-lazy="emptyUrl" class="empty-image">
          <div class="empty-text">暂无数据</div>
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
  </div>

</template>
<script>
  import {Search, Swipe, SwipeItem, Lazyload, Tab, Tabs, Row, Col,Tag, ImagePreview, Actionsheet, Toast} from 'vant';
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
      [VueStar.name]: VueStar
    },
    data() {
      return {
        ads: [],
        images: [{
          url: require('../../assets/images/1.jpg')
        }, {
          url: require('../../assets/images/2.jpg')
        }, {
          url: require('../../assets/images/3.jpg')
        }, {
          url: require('../../assets/images/4.jpg')
        }, {
          url: require('../../assets/images/5.jpg')
        }, {
          url: require('../../assets/images/6.jpg')
        }
        ],
        domains: [],
        newArticles: [],
        domainArticles: [],
        avatar1Url: require('../../assets/images/avatar1.jpg'),
        avatar2Url: require('../../assets/images/avatar2.jpg'),
        emptyUrl: require('../../assets/images/empty.jpg'),
        show: false,
        actions: [
          {
            name: '收藏此贴'
          },
          {
            name: '关注作者'
          }
        ],
        goodStarActive: '',
        watchStarActive: '',
        goodCurrentStatus:[],
        watchCurrentStatus: []
      };
    },
    created() {
      this.getTopAds();
      this.getDomains();
      this.getNewestArticle();

    },
    methods: {
      operate(){
        this.show = true;
      },
      onSelect(item) {
        this.show = false;
        Toast.success('成功' + item.name);
      },
      onCancel(){

      },
      imagePreview(j){
        var imageUrls = [];
        for (var i = 0; i < this.images.length; i++) {
          imageUrls.push(this.images[i].url);
        }
        ImagePreview({images: imageUrls, startPosition: j});
      },
      toArticleDetail(){
        this.$router.push({name: 'articleDetail'});
      },
      /**
       * 获取所有帖子分类
       * */
      getDomains(){
        api.get(common.host + '/api/domain/list', {domainType: 0}).then(res => {
          this.domains = res.msg;
      })
        ;
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

      /**
       * 分类下的帖子
       * @param domainsId
       */
      getDomainsArticle(domainsId){
        api.get(common.host + '/api/article/domainArticleList', {articleType: 0, domainId: domainsId}).then(res => {
          this.domainArticles = res.msg;
      })
        ;
      },

      /**
       * 获取顶部广告
       */
      getTopAds(){
        api.get(common.host + '/api/ad/list').then(res => {
          this.ads = res.msg;
      })
        ;
      },
      zan(articleId, index){
        if (this.newArticles[index].hasGood > 0) {
          this.newArticles[index].hasGood = 0;

          api.get(common.host + '/api/article/cancelGood', {articleId: articleId}).then(res => {
            console.log("取消成功");
        })
          ;
        } else if (this.newArticles[index].hasGood == 0) {
          this.newArticles[index].hasGood += 1;
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
        })
        } else if (this.newArticles[index].hasWatchedArticle == 0) {
          this.newArticles[index].hasWatchedArticle += 1;
          api.get(common.host + '/api/article/watch', {articleId: articleId}).then(res => {
            console.log("关注成功");
        })
          ;
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
