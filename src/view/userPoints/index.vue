<template>
  <div class="user-points">
    <van-cell-group>
      <van-cell value="2018-10-11 08:11:09">
        <template slot="title">
          <img v-lazy="points" class="points-icon">
          <span class="van-cell-text float-left">发布动态</span>
          <span class="points-value"> +5</span>
        </template>
      </van-cell>
      <van-cell value="2018-10-11 08:11:09">
        <template slot="title">
          <img v-lazy="points" class="points-icon">
          <span class="van-cell-text float-left">发布动态</span>
          <span class="points-value"> +5</span>
        </template>
      </van-cell>
      <van-cell value="2018-10-11 08:11:09">
        <template slot="title">
          <img v-lazy="points" class="points-icon">
          <span class="van-cell-text float-left">发布动态</span>
          <span class="points-value"> +5</span>
        </template>
      </van-cell>
      <van-cell value="2018-10-11 08:11:09">
        <template slot="title">
          <img v-lazy="points" class="points-icon">
          <span class="van-cell-text float-left">发布动态</span>
          <span class="points-value"> +5</span>
        </template>
      </van-cell>
      <van-cell value="2018-10-11 08:11:09">
        <template slot="title">
          <img v-lazy="points" class="points-icon">
          <span class="van-cell-text float-left">发布动态</span>
          <span class="points-value"> +5</span>
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
      points:require('../../assets/images/points.png')

    };
  }
};
</script>
<style lang="less">

  .points-icon{
    width: 25px;
    height: 25px;
    margin-right: 5px;
    float: left;;
  }

  .points-value{
    font-size: 12px;
    margin-left: 5px;
    color: #f9ed00;
  }
</style>

