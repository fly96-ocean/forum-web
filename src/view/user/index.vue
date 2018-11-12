<template>
  <div class="user">
    <van-row align="center" class="user-info">
      <van-col span="24" align="center">
        <img class="avatar" v-lazy="avatar2Url">
      </van-col>
      <van-col span="24" align="center">
        <span class="username">钻风小子</span>
      </van-col>
      <van-col span="24" align="center">
        <van-tag type="primary">新手</van-tag>
      </van-col>
    </van-row>

    <van-row class="user-links">
      <van-col span="6">
        <div>100</div>
        发布
      </van-col>
      <van-col span="6">
        <div>10</div>
        关注
      </van-col>
      <van-col span="6">
        <div>10</div>
        粉丝
      </van-col>
      <van-col span="6">
        <div>150</div>
        获赞
      </van-col>
    </van-row>

    <van-row class="user-my-links">
      <van-col span="6">
        <div><img v-lazy="myCollect" /></div>
        我的收藏
      </van-col>
      <van-col span="6">
        <div><img v-lazy="myComment" /></div>
        我的评论
      </van-col>
      <van-col span="6">
        <div><img v-lazy="myGood" /></div>
        我的点赞
      </van-col>
      <van-col span="6">
        <div><img v-lazy="myHistory" /></div>
        浏览历史
      </van-col>
    </van-row>


    <van-cell-group class="user-group">
      <van-cell is-link @click="toUserPublish()">
        <template slot="title">
          <span class="van-cell-text">系统通知</span>
        </template>
      </van-cell>
      <van-cell is-link @click="toUserPoints()">
        <template slot="title">
          <span class="van-cell-text">用户反馈</span>
        </template>
      </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Tag } from 'vant';

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tag.name]:Tag
  },
  data() {
    return {
      avatar1Url:require('../../assets/images/avatar1.jpg'),
      avatar2Url:require('../../assets/images/avatar2.jpg'),
      avatar3Url:require('../../assets/images/avatar3.jpg'),
      myCollect:require('../../assets/images/my-collect.png'),
      myComment:require('../../assets/images/my-comment.png'),
      myGood:require('../../assets/images/my-good.png'),
      myHistory:require('../../assets/images/my-history.png'),

    };
  },
  methods: {
    toUserPublish(){
      this.$router.push({name: 'userPublish'});
    },
    toUserFollow(){
      this.$router.push({name: 'userFollow'});
    },
    toUserFans(){
      this.$router.push({name: 'userFans'});
    },
    toUserPoints(){
      this.$router.push({name: 'userPoints'});
    }
  }
};
</script>
<style lang="less">
  .user{
    &-info{
       padding: 15px 0;
       text-align: center;
       background: rgb(251, 206, 7);
      .avatar{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .username{
        color: #fff;
        font-weight: bold;
      }
     }

    &-links{
       padding: 15px 0;
       font-size: 14px;
       text-align: center;
       background-color: #fff;
     }

     &-my-links{
        padding: 15px 0;
        font-size: 14px;
        text-align: center;
        background-color: #fff;
        margin-top: 10px;
        img{
          width: 25px;
          height: 25px;
        }
      }

     &-group{
        margin-top: 10px;
        .group-icon{
          margin-right: 10px;
        }
      }
  }
</style>

