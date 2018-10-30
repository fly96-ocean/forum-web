<template>
    <div class="video">
        <van-tabs class="video-tabs">
            <van-tab title="最新">
                <div class="video-container mg-t-0">
                    <van-row gutter="20">
                        <van-col span="20" class="title">
                            <a @click="toArticleDetail()">保护神安全带—壳牌劲霸公路英雄...</a>
                        </van-col>
                        <van-col span="4" class="more">
                            <i class="iconfont icon-more"  @click="operate()"></i>
                        </van-col>
                    </van-row>
                    <van-row class="content">
                        <van-col span="24">
                            <img v-lazy="images4Url" class="item">
                        </van-col>
                    </van-row>

                    <van-row gutter="10" class="operate" align="center">
                        <van-col span="12" class="info">
                            <van-row gutter="5">
                                <van-col span="6">
                                    <img v-lazy="avatar2Url" class="avatar">
                                </van-col>
                                <van-col span="18" class="info-tags">
                                    <van-tag class="tag">维修</van-tag>
                                    <van-tag class="tag">维修</van-tag>
                                </van-col>
                            </van-row>
                        </van-col>
                        <van-col span="12" class="item">
                            <van-row gutter="5">
                                <van-col span="8"><i class="iconfont  icon-zan"></i>
                                    <span class="count">10</span></van-col>
                                <van-col span="8"><i class="iconfont  icon-like"></i>
                                    <span class="count">65</span></van-col>
                                <van-col span="8"><i class="iconfont  icon-share"></i>
                                    <span class="count">99+</span></van-col>
                            </van-row>

                        </van-col>
                    </van-row>
                </div>
                <div class="video-container">
                    <van-row gutter="20">
                        <van-col span="20" class="title">
                            <a @click="toArticleDetail()">保护神安全带—壳牌劲霸公路英雄...</a>
                        </van-col>
                        <van-col span="4" class="more">
                            <i class="iconfont icon-more"  @click="operate()"></i>
                        </van-col>
                    </van-row>
                    <van-row class="content">
                        <van-col span="24">
                            <img v-lazy="images4Url" class="item">
                        </van-col>
                    </van-row>

                    <van-row gutter="10" class="operate" align="center">
                        <van-col span="12" class="info">
                            <van-row gutter="5">
                                <van-col span="6">
                                    <img v-lazy="avatar2Url" class="avatar">
                                </van-col>
                                <van-col span="18" class="info-tags">
                                    <van-tag class="tag">维修</van-tag>
                                    <van-tag class="tag">维修</van-tag>
                                </van-col>
                            </van-row>
                        </van-col>
                        <van-col span="12" class="item">
                            <van-row gutter="5">
                                <van-col span="8"><i class="iconfont  icon-zan"></i>
                                    <span class="count">10</span></van-col>
                                <van-col span="8"><i class="iconfont  icon-like"></i>
                                    <span class="count">65</span></van-col>
                                <van-col span="8"><i class="iconfont  icon-share"></i>
                                    <span class="count">99+</span></van-col>
                            </van-row>

                        </van-col>
                    </van-row>
                </div>

            </van-tab>

            <van-tab title="机油">
                <div class="video-empty-container">
                    <img v-lazy="emptyUrl" class="empty-image">
                    <div class="empty-text">暂无数据</div>
                </div>
            </van-tab>
            <van-tab title="维修">
                <div class="video-empty-container">
                    <img v-lazy="emptyUrl" class="empty-image">
                    <div class="empty-text">暂无数据</div>
                </div>
            </van-tab>

            <van-tab title="轮胎">
                <div class="video-empty-container">
                    <img v-lazy="emptyUrl" class="empty-image">
                    <div class="empty-text">暂无数据</div>
                </div>
            </van-tab>
            <van-tab title="喷漆">
                <div class="video-empty-container">
                    <img v-lazy="emptyUrl" class="empty-image">
                    <div class="empty-text">暂无数据</div>
                </div>
            </van-tab>
            <van-tab title="钣金">
                <div class="video-empty-container">
                    <img v-lazy="emptyUrl" class="empty-image">
                    <div class="empty-text">暂无数据</div>
                </div>
            </van-tab>
            <van-tab title="美容">
                <div class="video-empty-container">
                    <img v-lazy="emptyUrl" class="empty-image">
                    <div class="empty-text">暂无数据</div>
                </div>
            </van-tab>
        </van-tabs>

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
    import {Lazyload, Tab, Tabs, Row, Col, Tag, Actionsheet} from 'vant';
    import api from '../../axios/api.js';

    export default {
        components: {
            [Lazyload.name]: Lazyload,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Col.name]: Col,
            [Tag.name]: Tag,
            [Actionsheet.name]: Actionsheet
        },
        created() {

        },
        methods: {
            operate(){
                this.show = true;

            },
            onSelect(item) {
                this.show = false;
                Toast.success('成功' + item.name);
            },
            onCancel(){

            },
            imagePreview(url){
                var urls = [
                    url
                ]
                ImagePreview(urls);
            },
            toArticleDetail(){
                this.$router.push({name: 'articleDetail'});
            }
        },
        data() {
            return {
                avatar1Url: require('../../assets/images/avatar1.jpg'),
                avatar2Url: require('../../assets/images/avatar2.jpg'),
                avatar3Url: require('../../assets/images/avatar3.jpg'),
                images1Url: require('../../assets/images/1.jpg'),
                images2Url: require('../../assets/images/2.jpg'),
                images3Url: require('../../assets/images/3.jpg'),
                images4Url: require('../../assets/images/4.jpg'),
                images5Url: require('../../assets/images/5.jpg'),
                images6Url: require('../../assets/images/6.jpg'),
                images7Url: require('../../assets/images/7.jpg'),
                images8Url: require('../../assets/images/8.jpg'),
                emptyUrl: require('../../assets/images/empty.jpg'),
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
    .video {
        margin-bottom: 50px;
        &-swipe-image {
            height: 220px;
            width: 100%;
        }
        &-tabs {
            color: "#fbce07";
        }
        &-container {
            background-color: #fff;
            padding: 10px;
            margin-top: 10px;
            .avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                float: left;
            }
            .title {
                height: 25px;
                font-weight: bold;
                font-size: 16px;
                color: #494949;
            }
            .content {
                border-top: solid 1px #f8f8f8;
                margin-top: 10px;
                padding-top: 10px;
                color: #333333;
                letter-spacing: 0;
                line-height: 25px;
                max-height: 150px;
                overflow: hidden;
                word-wrap: break-word;
            }
            .more {
                text-align: right;
            }

            .operate {
                border-top: solid 1px #f8f8f8;
                margin-top: 10px;
                padding-top: 10px;

                .item {
                    text-align: center;
                    color: #919191;

                    .count {
                        font-size: 14px;
                        margin-left: 5px;
                    }
                }
                .info{
                    &-tags{
                         text-align: left;
                        .tag{
                            margin-left: 5px;
                        }
                    }
                }

            }
        }

        &-empty-container {
            background-color: #fff;
            text-align: center;
            height: 100%;
            color: #919191;
            position: fixed;
            width: 100%;
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
