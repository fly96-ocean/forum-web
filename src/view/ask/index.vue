<template>
  <div class="ask">

    <!--<van-row align="center" class="ask-classification">
      <van-col span="8" class="item">
        <div class="image">
          <i class="iconfont icon-jifen"></i>
        </div>
        <div class="title">
          最新问答
        </div>
      </van-col>
      <van-col span="8" class="item">
        <div class="image">
          <i class="iconfont icon-jifen"></i>
        </div>
        <div class="title">
          热门问答
        </div>
      </van-col>
      <van-col span="8" class="item">
        <div class="image">
          <i class="iconfont icon-jifen"></i>
        </div>
        <div class="title">
          待回问答
        </div>
      </van-col>
    </van-row>
    -->

    <div class="ask-container">
      <div v-if="newArticles==null || newArticles.length<=0" class="ask-empty-container">
        <img v-lazy="emptyUrl" class="empty-image">
        <div class="empty-text">暂无数据</div>
      </div>
      <van-row v-for="(ask, index) in newArticles" gutter="10" class="ask-list" >
        <van-col span="18" class="item">
          <van-row align="center">
            <van-col span="24">
              <a @click="toArticleDetail(ask.oId)">{{ask.articleTitle}}</a>
              <div @click="toArticleDetail(ask.oId)" v-html="ask.articleRewardContent"></div>
            </van-col>
          </van-row>
        </van-col>
        <van-col span="6" class="item" align="right">
          <van-row align="center">
            <van-col span="24">
              <div class="answer">
                {{ask.articleCommentCount}}
              </div>
              <div class="answer">
                  回答
                </div>
            </van-col>
          </van-row>
          <van-row align="center">
            <van-col span="24" class="time">
              {{ask.articleCreateTime | dataFormat('MM-dd hh:mm')}}
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
  import {Tabbar, TabbarItem, Row, Col, Icon, Tag} from 'vant';
  import api from '../../axios/api.js';

  export default {
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Tabbar.name]:Tabbar,
      [TabbarItem.name]:TabbarItem,
      [Icon.name]:Icon,
      [Tag.name]: Tag
    },
    created() {
      this.getNewestArticle();
    },
    filters:{
      articleBrief:function(value){
        if (!value) return ''
        value = value.toString();
        value = value.replace(/(\n)/g, "");
        value = value.replace(/(\t)/g, "");
        value = value.replace(/(\r)/g, "");
        value = value.replace(/<\/?[^>]*>/g, "");
        value = value.replace(/\s*/g, "");
        value = value.substring(0, 67) + "...";
        return value;
      }
    },
    data() {
      return {
        active: 0,
        catalogNewUrl: require('../../assets/images/new.png'),
        catalogHotUrl: require('../../assets/images/hot.png'),
        catalogPendUrl: require('../../assets/images/pending.png'),
        emptyUrl: require('../../assets/images/empty.jpg'),
        newArticles:[]
      };
    },
    methods: {
      /**
       * 获取最新帖子
       */
      getNewestArticle(){
        api.get('/api/article/newList', {articleType: 2}).then(res => {
          if(res.code == 0){
            this.newArticles = res.msg;
          }else{
            Toast(res.msg);
          }
        });
      },
      toArticleDetail(articleId){
        this.$router.push({
          path: '/articleDetail/'+articleId
        })
      },
    }
  };
</script>
<style lang="less">
  .ask {
    &-container{
      background-color: #fff;
      padding: 0px 10px;
      /*margin-top: 10px;*/
    }
     &-classification{
        background: #fff;
        padding: 10px;
          .item{
            text-align: center;
            color: #919191;
            .image{
              background: #333;
              width: 50px;
              height: 50px;
              opacity: 0.8;
              border-radius: 50%;
              display: inline-block;
                i{
                  position: relative;
                  color: #fff;
                  top: 15%;
                  font-size: 25px;
                }
              }

            .title{
              font-size: 14px;
              margin-top: 5px;
            }
            }
     }

    &-list{
       border-top: solid 1px #f8f8f8;
       /*margin-top: 10px;*/
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

  &-empty-container {
     background-color: #fff;
     text-align: center;
     height: 100%;
     color: #919191;
     position: fixed;
     width: 100%;
     margin-left: -10px;
   }

  .empty-image {
    width: 30%;
    margin-top:45%;
  }

  .empty-text {
    font-size: 12px;
  }

  }

</style>

