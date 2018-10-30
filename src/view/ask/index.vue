<template>
  <div class="ask">

    <van-row align="center" class="ask-classification">
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

    <div class="ask-container">
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

  </div>
</template>
<script>
  import {Tabbar, TabbarItem, Row, Col, Icon, Tag} from 'vant';

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

    },
    methods: {
      onClickCatRow(catRow) {

      }
    },
    data() {
      return {
        active: 0,
        catalogNewUrl: require('../../assets/images/new.png'),
        catalogHotUrl: require('../../assets/images/hot.png'),
        catalogPendUrl: require('../../assets/images/pending.png')
      };
    }
  };
</script>
<style lang="less">
  .ask {
    &-container{
      background-color: #fff;
      padding: 0px 10px;
      margin-top: 10px;
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
       margin-top: 10px;
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

</style>

