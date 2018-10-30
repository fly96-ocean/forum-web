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
      <van-col span="8">
        <div>100</div>
        发布数
      </van-col>
      <van-col span="8">
        <div>10</div>
        粉丝数
      </van-col>
      <van-col span="8">
        <div>150</div>
        总积分
      </van-col>
    </van-row>


    <van-cell-group class="user-group">
      <van-cell is-link @click="toUserPublish()">
        <template slot="title">
          <i class="iconfont icon-wofadetiezi group-icon"></i>
          <span class="van-cell-text">我的发布</span>
        </template>
      </van-cell>
      <van-cell is-link @click="toUserFollow()">
        <template slot="title">
          <i class="iconfont icon-tiezishoucang group-icon"></i>
          <span class="van-cell-text">我的关注</span>
        </template>
      </van-cell>
      <van-cell is-link @click="toUserFans()">
        <template slot="title">
          <i class="iconfont icon-fensi group-icon"></i>
          <span class="van-cell-text">我的好友</span>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="user-group">
      <van-cell is-link @click="toUserPoints()">
        <template slot="title">
          <i class="iconfont icon-integral group-icon"></i>
          <span class="van-cell-text">我的积分</span>
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
      avatar3Url:require('../../assets/images/avatar3.jpg')
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

     &-group{
        margin-top: 15px;
        .group-icon{
          margin-right: 10px;
        }
      }
  }
</style>

