<template>
  <div class="user-publish">
    <van-tabs class="user-publish-tabs">

      <van-tab title="图文">
        <div class="user-publish-container mg-t-0">
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
        <div class="user-publish-container">
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
        <div class="user-publish-container mg-t-0">
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
            <van-col span="24">
              <img v-lazy="imagesUrl" class="item">
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

        <div class="user-publish-container">
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
            <van-col span="24">
              <img v-lazy="imagesUrl" class="item">
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
      <van-tab title="提问">
        <div class="publish-ask-container mg-t-0">
        <van-row gutter="10" class="ask-list" >
          <van-col span="18" class="item">
            <van-row align="center">
              <van-col span="24">
                南城五环有没有可以钓鱼的地方呀
              </van-col>
            </van-row>
            <van-row align="center">
              <van-col span="24">
                <van-tag class="tag">标签</van-tag>
                <van-tag class="tag">标签</van-tag>
              </van-col>
            </van-row>
          </van-col>
          <van-col span="6" class="item" align="right">
            <van-row align="center">
              <van-col span="24">
                <div class="answer">
                  10
                </div>
                <div class="answer">
                  回答
                </div>
              </van-col>
            </van-row>
            <van-row align="center">
              <van-col span="24" class="time">
                七天前
              </van-col>
            </van-row>
          </van-col>
        </van-row>

          <van-row gutter="10" class="ask-list" >
            <van-col span="18" class="item">
              <van-row align="center">
                <van-col span="24">
                  南城五环有没有可以钓鱼的地方呀
                </van-col>
              </van-row>
              <van-row align="center">
                <van-col span="24">
                  <van-tag class="tag">标签</van-tag>
                  <van-tag class="tag">标签</van-tag>
                </van-col>
              </van-row>
            </van-col>
            <van-col span="6" class="item" align="right">
              <van-row align="center">
                <van-col span="24">
                  <div class="answer">
                    10
                  </div>
                  <div class="answer">
                    回答
                  </div>
                </van-col>
              </van-row>
              <van-row align="center">
                <van-col span="24" class="time">
                  七天前
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          </div>

        <!--<div class="home-empty-container">
          <img v-lazy="emptyUrl" class="empty-image">
          <div class="empty-text">暂无数据</div>
        </div>-->
      </van-tab>
    </van-tabs>
  </div>

</template>
<script>
  import {Search, Swipe, SwipeItem, Lazyload, Tab, Tabs, Row, Col,Tag, ImagePreview, Toast} from 'vant';
  import api from '../../axios/api.js';
//  import common from '../../common/common.js';


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
  .user-publish{
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
