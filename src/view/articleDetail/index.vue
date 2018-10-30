<template>
  <div class="article-detail">
    <div class="article-detail-container">
      <van-row gutter="20">
        <van-col span="24" class="title">
          黄壳HX5与HX6的区别？
        </van-col>
      </van-row>
      <van-row gutter="20" class="user-info">
        <van-col span="4">
          <img v-lazy="avatar1Url" class="avatar">
        </van-col>
        <van-col span="16">
          <van-row class="username">
            <van-col span="24">Felix</van-col>
          </van-row>
          <van-row class="title">
            <van-col span="24" class="time">14小时前
              <van-tag class="tags">维修</van-tag>
              <van-tag class="tags">求助</van-tag>
            </van-col>
          </van-row>
        </van-col>
        <van-col span="4" class="focus">
          <i class="iconfont icon-more"  @click="operate()"></i>
        </van-col>
      </van-row>
      <van-row class="content">
          HX5为天津壳牌生产，HX6为香港壳牌生产，价格出入较大，如何选择？
      </van-row>
    </div>
    <van-panel title="评论">
      <div class="content">
        <div class="article-detail-empty-container">
          <img v-lazy="emptyUrl" class="empty-image">
          <div class="empty-text">暂无数据</div>
        </div>
      </div>
    </van-panel>

    <van-cell-group class="article-detail-publish-comment-container">
      <van-row>
        <van-col span="4"><img v-lazy="avatar1Url" class="avatar"></van-col>
        <van-col span="16">
          <van-field
                  class="comment-input"
                  center
                  clearable
                  placeholder="评论...">
          </van-field>
        </van-col>
        <van-col span="4">
          <van-button size="small" class="publish-comment" type="primary" @click="publish()">发布</van-button>
        </van-col>
      </van-row>

    </van-cell-group>

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
  import {Tab, Tabs, Button,  Row, Col, Icon, Search, Tag, Actionsheet, Toast, Panel, Field} from 'vant';

  export default {
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]:Icon,
      [Search.name]:Search,
      [Tag.name]: Tag,
      [Actionsheet.name]: Actionsheet,
      [Toast.name]: Toast,
      [Button.name]: Button,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [Panel.name]: Panel,
      [Field.name]: Field
    },
    created() {

    },
    methods: {
      operate(){
        this.show = true;

      },
      onSelect(item) {
        this.show = false;
        Toast.success('成功'+item.name);
      },
      onCancel(){

      },
      publish(){
        Toast.success('发布成功');
      }
    },
    data() {
      return {
        active: 0,
        avatar1Url:require('../../assets/images/avatar1.jpg'),
        images1Url:require('../../assets/images/1.jpg'),
        emptyUrl:require('../../assets/images/empty.jpg'),
        show: false,
        actions: [
          {
            name: '收藏此贴'
          },
          {
            name: '关注作者'
          }
        ]
      };
    }
  };
</script>
<style lang="less">
  .article-detail{
    &-container{
       background-color: #fff;
       padding: 10px;
        margin-bottom:15px;
       .title{
         font-weight: bold;
         font-size: 16px;
         color: #494949;
         height: 25px;
       }

       .user-info{
         .username{
           font-weight: bold;
           font-size: 16px;
           color: #494949;
         }

         .avatar{
           width: 50px;
           height: 50px;
           border-radius: 50%;
           margin-right: 10px;
         }

         .time{
           font-size: 12px;
           color: #989898;
         }
       }
    }
    &-publish-comment-container{
       position: fixed;
       bottom: 0px;
       width: 100%;
      .avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .comment-input{
        background-color: #f8f8f8;
        margin-top: 5px;
      }
      .publish-comment{
        margin-top: 5px;
        height: 44px;
      }
    }

    &-empty-container{
      background-color: #fff;
      height: 100%;
      color: #919191;
      position: fixed;
      width: 100%;
       text-align: center;
      .empty-image{
        width: 30%;
        margin-top: 20%;
      }
      .empty-text{
        font-size: 12px;
      }
      .content{
        text-align: center;
      }
    }



  }
</style>

