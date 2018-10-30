<template>
  <div class="user-fans-friends">
    <van-search placeholder="请输入关键词" />

    <van-cell-group>
      <van-cell is-link @click="toUserFansFriendsCenter()">
        <template slot="title">
          <img v-lazy="avatar1Url" class="avatar"/>
          <span class="van-cell-text">张三丰</span>
        </template>
      </van-cell>
        <van-cell is-link @click="toUserFansFriendsCenter()">
            <template slot="title">
                <img v-lazy="avatar2Url" class="avatar"/>
                <span class="van-cell-text">李四</span>
            </template>
        </van-cell>

        <van-cell is-link @click="toUserFansFriendsCenter()">
            <template slot="title">
                <img v-lazy="avatar3Url" class="avatar"/>
                <span class="van-cell-text">李四</span>
            </template>
        </van-cell>

    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Tag, Search } from 'vant';

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tag.name]:Tag,
    [Search.name]:Search
  },
  data() {
    return {
      avatar1Url:require('../../assets/images/avatar1.jpg'),
      avatar2Url:require('../../assets/images/avatar2.jpg'),
      avatar3Url:require('../../assets/images/avatar3.jpg')

    };
  },
    methods: {
        toUserFansFriendsCenter(){
            this.$router.push({name: 'userFansFriendsCenter'});
        },
    }
};
</script>
<style lang="less">
  .user-fans-friends{
      .avatar{
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 5px;
          float: left;
      }
  }
</style>

