<template>
  <div class="user-follow">
    <van-tabs class="user-follow-tabs">

      <van-tab title="图文">
        <div class="user-follow-container mg-t-0">
          <van-row class="title" >
            <van-col span="24" class="title-top"><a @click="toArticleDetail()">黄壳HX5与HX6的区别？ </a></van-col>
          </van-row>
          <van-row class="title">
            <van-col span="24" class="title-bottom">14小时前
              <van-tag class="tags">维修</van-tag>
              <van-tag class="tags">求助</van-tag>
            </van-col>
          </van-row>
          <van-row class="content">
            <van-col>
              <a @click="toArticleDetail()">HX5为天津壳牌生产，HX6为香港壳牌生产，价格出入较大，如何选择？</a>
            </van-col>
          </van-row>

          <van-row gutter="10" class="operate" align="center">
            <van-col span="8" class="item">
              <i class="iconfont  icon-zan"></i>
              <span class="count">10</span>
            </van-col>
            <van-col span="8" class="item">
              <i class="iconfont  icon-like"></i>
              <span class="count">65</span>
            </van-col>
            <van-col span="8" class="item">
              <i class="iconfont  icon-share"></i>
              <span class="count">99+</span>
            </van-col>
          </van-row>
        </div>
        <div class="user-follow-container">
          <van-row class="title">
            <van-col span="24" class="title-top"><a @click="toArticleDetail()">保护神安全带—壳牌劲霸公路英雄安全系列栏目</a></van-col>
          </van-row>
          <van-row class="title">
            <van-col span="24" class="title-bottom">14小时前
              <van-tag class="tags">知识</van-tag>
            </van-col>
          </van-row>
          <van-row class="content">
            <van-col>
              壳牌安全栏目三期—壳牌劲霸公路英雄安全项目之火眼金睛竞猜抢楼活动现已圆满落幕，没有获奖的卡友不要灰心，壳牌劲霸公路英雄...
            </van-col>
          </van-row>

          <van-row gutter="10" class="operate" align="center">
            <van-col span="8" class="item">
              <i class="iconfont  icon-zan"></i>
              <span class="count">10</span>
            </van-col>
            <van-col span="8" class="item">
              <i class="iconfont  icon-like"></i>
              <span class="count">65</span>
            </van-col>
            <van-col span="8" class="item">
              <i class="iconfont  icon-share"></i>
              <span class="count">99+</span>
            </van-col>

          </van-row>
        </div>

      </van-tab>

      <van-tab title="视频">

      </van-tab>
      <van-tab title="提问">

      </van-tab>
    </van-tabs>
  </div>

</template>
<script>
  import {Search, Swipe, SwipeItem, Lazyload, Tab, Tabs, Row, Col,Tag, ImagePreview, Toast} from 'vant';
  import api from '../../axios/api.js';
  import common from '../../common/common.js';


  export default {
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Lazyload.name]: Lazyload,
      [Search.name]:Search,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Row.name]: Row,
      [Col.name]: Col,
      [Tag.name]:Tag,
      [ImagePreview.name]: ImagePreview,
      [Toast.name]: Toast
    },
    data() {
      return {
        ads: [],
        avatar1Url:require('../../assets/images/avatar1.jpg'),
        avatar2Url:require('../../assets/images/avatar2.jpg'),
        emptyUrl:require('../../assets/images/empty.jpg'),
        imagesUrl: require('../../assets/images/1.jpg'),
        show: false
      };
    },
    created() {

    },
    methods: {
      toArticleDetail(){
        this.$router.push({name: 'articleDetail'});
      }
    },

  };
</script>
<style lang="less">
  .user-follow{
    margin-bottom: 50px;
  &-tabs{
     color:"#fbce07";
   }
  &-container{
     background-color: #fff;
     padding: 10px;
     margin-top: 10px;
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

  .publish-ask-container{
    background-color: #fff;
    padding: 0px 10px;
    margin-top: 10px;
  .ask-list{
    border-top: solid 1px #f8f8f8;
    padding-top:10px;
    color: #333333;
    letter-spacing: 0;
    line-height: 25px;
    max-height: 150px;
    overflow: hidden;
    word-wrap: break-word;
  .tag{
    margin-left: 5px;
  }

  .answer{
    background: #f8f8f8;
    border-radius: 4px;
    width: 50px;
    text-align: center;
  }

  .time{
    margin-top: 5px;
    font-size: 12px;
  }
  }
  }


  }

</style>
