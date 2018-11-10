<template>
  <div class="article-detail">
    <div class="article-detail-container" v-if="article">
      <van-row gutter="20">
        <van-col span="24" class="title">
          <span v-text="article.articleTitle"></span>
        </van-col>
      </van-row>
      <van-row gutter="20" class="user-info">
        <van-col span="4">
          <img v-lazy="article.userAvatarURL" class="avatar">
        </van-col>
        <van-col span="20">
          <van-row class="username">
            <van-col span="24"><span v-text="article.userNickName"></span></van-col>
          </van-row>
          <van-row class="title">
            <van-col span="24" class="time">
              <span>{{article.articleCreateTime | dataFormat('MM-dd hh:mm')}}</span>
              <van-tag v-for="tag in article.articleTagsList" class="tags">{{tag}}</van-tag>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="content">
        <a v-html="article.articleContent"></a>
      </van-row>
    </div>
    <van-panel title="评论">
      <div v-if="newComments.length<=0" class="article-detail-empty-container">
        <img v-lazy="emptyUrl" class="empty-image">
        <div class="empty-text">暂无数据</div>
      </div>
      <div v-else-if="newComments.length>0" class="article-detail-comment-container">
        <van-row v-for="(newComment, index) in newComments" class="comment-info">
          <van-col span="4">
            <img v-lazy="newComment.userAvatarUrl" class="avatar">
          </van-col>
          <van-col span="20">
            <van-row class="username">
              <van-col span="20">{{newComment.userNickName}}</van-col>
              <van-col span="4" class="more">
                <i class="iconfont icon-more"  @click="operate(newComment, index)"></i>
              </van-col>
            </van-row>
            <van-row class="comment-content">
              <van-col span="24">{{newComment.commentContent}}</van-col>
            </van-row>

            <van-row class="bottom-tool">
              <van-col span="8">
                {{newComment.commentCreateTime | dataFormat('MM-dd hh:mm')}}
              </van-col>
              <van-col span="8" style="text-align: right;">
                <vue-star animate="animated rotateIn" :currentStatus="goodCurrentStatus[index]">
                  <a v-if="newComment.hasGood>0" href="javascript:void(0)" class="vue-star vue-star-active" slot="icon" @click="good(newComment.oId, index)">
                    <i slot="icon" class="fa fa-thumbs-up"></i>
                  </a>
                  <a v-if="newComment.hasGood==0" href="javascript:void(0)" class="vue-star" slot="icon" @click="good(newComment.oId, index)">
                    <i slot="icon" class="fa fa-thumbs-up"></i>
                  </a>
                  <span class="count" slot="count">{{newComment.commentGoodCnt}}</span>
                </vue-star>
              </van-col>
              <van-col span="8" style="text-align: right;">
                <vue-star animate="animated rotateIn">
                  <a href="javascript:void(0)" class="vue-star" slot="icon" @click="comment(newComment.oId, index)">
                    <i slot="icon" class="fa fa-comment"></i>
                  </a>
                  <span class="count" slot="count">{{newComment.commentReplyCnt}}</span>
                </vue-star>
              </van-col>
            </van-row>


          </van-col>
        </van-row>
      </div>
    </van-panel>
    <van-cell-group class="article-detail-publish-comment-container">
      <van-row>
        <van-col span="20">
          <van-field
                  v-model="commentContent"
                  class="comment-input"
                  center
                  clearable
                  autosize
                  placeholder="评论...">
          </van-field>
        </van-col>
        <van-col span="4">
          <van-button size="small" class="publish-comment" type="danger" @click="submitComment()">发布</van-button>
        </van-col>
      </van-row>
    </van-cell-group>

    <van-actionsheet v-model="reportShow" title="举报此贴">
      <van-radio-group v-model="result">
        <van-cell-group>
          <van-cell
                  v-for="(item, index) in list"
                  clickable
                  :key="item"
                  :title="`${item}`"
                  @click="result=`${item}`">
            <van-radio :name="item" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-button type="danger" block @click="report()">举报</van-button>
    </van-actionsheet>
  </div>
</template>
<script>
  import {Tab, Tabs, Button,  Row, Col, Icon, Search, Tag, Toast, Panel, Field, Actionsheet, RadioGroup, Radio, Cell, CellGroup} from 'vant';
  import api from '../../axios/api.js';
  import common from '../../common/common.js';
  import VueStar from 'vue-star';

  export default {
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]:Icon,
      [Search.name]:Search,
      [Tag.name]: Tag,
      [Toast.name]: Toast,
      [Button.name]: Button,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [Panel.name]: Panel,
      [Field.name]: Field,
      [Actionsheet.name]: Actionsheet,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [VueStar.name]: VueStar
    },
    data() {
      return {
        active: 0,
        images1Url:require('../../assets/images/1.jpg'),
        emptyUrl:require('../../assets/images/empty.jpg'),
        article: null,
        articleId: '',
        commentContent: '',
        newComments: '',
        goodCurrentStatus:[],
        currentComment:'',
        currentCommentIndex: '',
        reportShow: false,
        list: ['垃圾广告', '色情低俗', '违法违规', '涉嫌侵权', '人身攻击', '冒充账号', '垃圾广告账号', '个人信息违规'],
        host:common.host,
        result: ''
      };
    },
    created() {
      this.articleId = this.$route.params.articleId;
      if(this.articleId){
        api.get(common.host + '/api/article/detail', {articleId: this.articleId}).then(res => {
          this.article = res.msg;
        });

        api.get(common.host + '/api/comment/list', {articleId: this.articleId}).then(res => {
          this.newComments = res.msg;
          for(var i = 0; i<this.newComments.length; i ++){
            this.goodCurrentStatus[i] = this.newComments[i].hasGood;
          }
        });
      } else {
        Toast.fail('非正常打开,帖子加载失败');
      }
    },

    methods: {
      operate(comment, index){
        this.reportShow = true;
        this.currentComment = comment;
        this.currentCommentIndex = index;
      },
      submitComment(){
        api.post(common.host + '/api/comment/save', {articleId: this.articleId, commentContent:this.commentContent}).then(res => {
          Toast.success('评论成功');
          this.commentShow = false;
          this.newComments.push({
            userAvatarUrl:this.article.userAvatarURL,
            userNickName:this.article.userNickName,
            commentContent: this.commentContent,
            commentCreateTime: new Date(),
            commentGoodCnt: 0,
            commentReplyCnt: 0
          });
          this.commentContent='';
        });
      },
      submitSubComment(commentOriginalCommentId){
        api.post(common.host + '/api/comment/save', {articleId: this.articleId, commentContent:this.commentContent, commentOriginalCommentId: commentOriginalCommentId}).then(res => {
          Toast.success('评论成功');
          this.commentShow = false;
        });
      },

      good(commentId, index){
        if (this.newComments[index].hasGood > 0) {
          this.newComments[index].hasGood = 0;
          this.newComments[index].commentGoodCnt -= 1;
          api.get(common.host + '/api/comment/cancelGood', {commentId: commentId}).then(res => {
            console.log("取消成功");
        })
          ;
        } else if (this.newComments[index].hasGood == 0) {
          this.newComments[index].hasGood += 1;
          this.newComments[index].commentGoodCnt += 1;
          api.get(common.host + '/api/comment/good', {commentId: commentId}).then(res => {
            console.log("点赞成功");
        })
          ;
        }
      },
      report(){
        var comment = this.currentComment;
        api.get(common.host + '/api/comment/report', {commentId: comment.oId, reportTypes:this.result}).then(res => {
          Toast.success('举报成功');
          this.reportShow = false;
          this.result = '';
        })
      }
    }
  };
</script>
<style lang="less">
  .article-detail{
    margin-bottom: 55px;
    position: relative;
    &-container{
       background-color: #fff;
       padding: 10px;
        margin-bottom:15px;
       .content{
         img{
           width: 100%;
         }
       }
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
    &-comment-container{
      padding: 0 10px;
      .comment-info{
        border-top: 1px solid #fcfcfc;
        padding-top: 10px;
        padding-bottom: 10px;
        .username{
          font-weight: bold;
          font-size: 14px;
          color: #494949;

        }
        .more{
          height: 50px;
          line-height: 50px;
          text-align: right;
        }

        .avatar{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .comment-content{
          font-size: 14px;
          padding-right: 5px;
          padding-bottom: 5px;
        }

        .bottom-tool{
          font-size: 12px;
          color: #989898;
          a{
            color: #989898;
          }
          .count{
            margin-left: 5px;
          }
        }
      }
    }
    &-publish-comment-container{
       position: fixed;
       bottom: 0px;
       width: 100%;
       z-index: 9999 !important;
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
      /*position: fixed;*/
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

  .vue-star {
    color: #919191 !important;
  }

  .vue-star-active {
    color: #F05654 !important;
  }
</style>

