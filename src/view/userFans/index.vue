<template>
  <div class="user">
    <van-search placeholder="请输入关键词" />

    <van-cell-group>
      <van-cell icon="contact" title="我的好友" is-link @click="toUserFansFriends()" />
      <van-cell title="我的粉丝" icon="contact" is-link @click="toUserFansFriends()" />
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
      toUserFansFriends(){
          this.$router.push({name: 'userFansFriends'});
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

