<template>
    <div class="app">

        <transition :name="transitionName">
            <router-view/>
        </transition>
        <van-tabbar v-model="active" v-if="$route.meta.footerShow">
            <van-tabbar-item to="home">
                <div class="tabbar-item">
                    <i class="iconfont icon-home"></i>
                </div>
                <span>首页</span>
            </van-tabbar-item>
            <van-tabbar-item to="video">
                <div class="tabbar-item">
                    <i class="iconfont icon-luntan"></i>
                </div>
                <span>视频</span>
            </van-tabbar-item>
            <van-tabbar-item to="ask">
                <div class="tabbar-item">
                    <i class="iconfont icon-laba"></i>
                </div>
                <span>问答</span>
            </van-tabbar-item>
            <van-tabbar-item to="user">
                <div class="tabbar-item">
                    <i class="iconfont icon-my"></i>
                </div>
                <span>我的</span>
            </van-tabbar-item>
        </van-tabbar>
        <div class="publish" @click="publish()" v-if="$route.meta.footerShow">
            <i class="iconfont icon-pen"></i>
        </div>
        <van-actionsheet v-model="show" title="发表赢积分">
            <div styl="height:200px;">
                <van-row gutter="10" class="classification" align="center">
                    <van-col span="8" class="item" >
                        <div style="height: 150px; text-align: center;" @click="toPublishArticle()">
                            <div>
                                <img v-lazy="recordUrl" class="publish-operate">
                            </div>
                            <div>
                                <a href="javascript:void(0)"></a>文章
                            </div>
                        </div>
                    </van-col>
                    <van-col span="8" class="item">
                        <div style="height: 150px; text-align: center;" @click="toPublishPic()">
                            <div>
                                <img v-lazy="richTextUrl" class="publish-operate">
                            </div>
                            <div>
                                视频
                            </div>
                        </div>
                    </van-col>
                    <van-col span="8" class="item">
                        <div style="height: 150px; text-align: center;" @click="toPublishAsk()">
                            <div>
                                <img v-lazy="askUrl" class="publish-operate">
                            </div>
                            <div>
                                提问
                            </div>
                        </div>
                    </van-col>

                </van-row>
            </div>
        </van-actionsheet>
    </div>
</template>
<script>
    import { Tabbar, TabbarItem, NavBar, Icon, Popup, Actionsheet, Row, Col ,Lazyload} from 'vant';
    import './assets/font/iconfont.css';
    import './assets/css/app.css';
    import common from './common/common.js';
    import api from './axios/api.js';
    export default {
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
            [NavBar.name]: NavBar,
            [Popup.name]: Popup,
            [Icon.name]: Icon,
            [Actionsheet.name]:Actionsheet,
            [Row.name]:Row,
            [Col.name]:Col,
            [Lazyload.name]:Lazyload
        },
        data() {
            return {
                show: false,
                publishShow: true,
                active: 0,
                searchValue: '',
                transitionName:'',
                recordUrl:require('./assets/images/pen.png'),
                richTextUrl:require('./assets/images/pic.png'),
                askUrl:require('./assets/images/ask.png')
            };
        },
        created() {
            var token = sessionStorage.getItem("token");
            if(token == null || token == undefined || token == ''){
                api.post(common.host+'/api/auth/token').then(res => {
                    sessionStorage.setItem("token", res.token);
                });
            }

        },
        methods: {
            publish(){
                this.show=true;
                this.publishShow = false;
            },
            toPublishArticle(){
                this.$router.push({name: 'publishArticle'});
                this.show=false;
            },
            toPublishPic(){
                this.$router.push({name: 'publishVideo'});
                this.show=false;
            },
            toPublishAsk(){
                this.$router.push({name: 'publishAsk'});
                this.show=false;
            }

        }
    };
</script>
<style lang="less">
    .publish{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #333;
        color: #fff;
        position: fixed;
        z-index: 999;
        bottom: 70px;
        float: right;
        opacity: 0.8;
        right: 15px;
        i{
            position: relative;
            top: 12px;
            left: 15px;
        }
    }

    .publish-operate {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: 25px
    }

    .tabbar-item {
        margin-bottom: 5px;
        text-align: center;
        i{
            font-size: 18px;
            margin-bottom: 5px;
        }
    }

</style>
