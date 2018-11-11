<template>
    <div class="publish-video">
        <van-cell-group>
            <van-field v-model="articleTitle" placeholder="视频标题"/>
        </van-cell-group>

        <div class="publish-video-tag-container">
            <a v-for="(tag, index) in firstLevelTags" href="javascript:void(0)" @click="loadSecondLevel(tag.oId, index)">
                <van-tag size="medium" class="tag" :type="tag.tagStyle">{{tag.tagTitle}}</van-tag>
            </a>
        </div>

        <div class="publish-video-tag-container" v-show="secondLevelTagShow">
            <a v-for="(tag, index) in secondLevelTags" href="javascript:void(0)" @click="chooseSecondLevel(tag.oId, index)">
                <van-tag size="medium" class="tag" :type="tag.tagStyle">{{tag.tagTitle}}</van-tag>
            </a>
        </div>

        <van-cell-group class="mg-t-15">
            <van-field v-model="articleContent" type="textarea" rows="5" autosize placeholder="视频描述"/>
        </van-cell-group>

        <div class="mg-t-15" v-show="videoShow">
            <video class="preVideo" autoplay="autoplay" controls="controls" :src="videoUrl"></video>
        </div>

        <van-row type="flex" justify="left" class="pic-container">
            <van-col span="6">
                <van-uploader id="videoUpload" :after-read="onRead" accept="video/*" multiple>
                    <img v-lazy="photograph" class="shot-icon">
                </van-uploader>
            </van-col>
        </van-row>
        <div class="mg-t-15">
            <van-button type="danger" size="large"  @click="next()">发布</van-button>
        </div>
    </div>
</template>

<script>
    import {Row, Col, CellGroup, Field, Button, Uploader, Lazyload, Tag} from 'vant';
    import api from '../../axios/api.js';
    import common from '../../common/common.js';
    import { VideoPlayer } from 'vue-video-player';

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        ['link', 'video'],
    ]

    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Button.name]: Button,
            [Uploader.name]: Uploader,
            [Lazyload.name]: Lazyload,
            [Tag.name]: Tag
        },
        data() {
            return {
                photograph: require('../../assets/images/camera.png'),
                secondLevelTagShow: false,
                firstLevelTags: null,
                secondLevelTags: null,
                currentLevelTags: null,
                host: common.host,
                articleContent: '',
                articleTitle:'',
                videoUrl:null,
                videoShow: false,
                articleImages: []
            };
        },
        created() {
            this.loadFirstLevel();
        },
        methods: {
            onRead() {
                var file = document.getElementById("videoUpload").files[0];
                var param = new FormData(); //创建form对象
                param.append("file", file, file.name);//通过append向form对象添加数据
                api.post(common.host + '/api/upload/upload', param).then(res => {
                    let url = this.host+"/"+res.data;
                    this.videoShow = true;
                    this.videoUrl = url;
                    this.articleImages.push(res.data);
                });
            },
            /**
             * 获取一级标签
             */
            loadFirstLevel(){
                api.get(common.host + '/api/tag/list').then(res => {
                    this.firstLevelTags = res.msg;
                });
            },
            /**
             * 获取二级标签
             * @param oId
             * @param index
             */
            loadSecondLevel(oId, index){
                for(var i = 0; i<this.firstLevelTags.length; i++){
                    this.firstLevelTags[i].tagStyle = "";
                }
                this.firstLevelTags[index].tagStyle = "danger";
                api.get(common.host + '/api/tag/list', {oId: oId}).then(res => {
                    this.secondLevelTags = res.msg;
                if(this.secondLevelTags != null && this.secondLevelTags.length>0){
                    this.secondLevelTagShow = true;
                } else {
                    this.secondLevelTagShow = false;
                }
            });
            },
            /**
             * 选中二级标签
             * @param oId
             * @param index
             */
            chooseSecondLevel(oId, index){
                for(var i = 0; i<this.secondLevelTags.length; i++){
                    this.secondLevelTags[i].tagStyle = "";
                }
                this.secondLevelTags[index].tagStyle = "danger";
                this.currentLevelTags = this.secondLevelTags[index];
            },
            next(){
                var data = {
                    articleTitle: this.articleTitle,
                    articleContent: this.articleContent,
                    tagId: this.currentLevelTags.oId,
                    articleType: 1,
                    articleImages: this.articleImages
                }
                api.post(common.host + '/api/article/save', data).then(res => {
                    if(res.code == 0){
                        var oId = res.msg.oId;
                        this.$router.push({
                            path: '/chooseCatalog/'+oId+'/1'
                        })
                    }else{
                        Toast.success('帖子保存失败');
                    }
//
                });

            },
        }
    };
</script>
<style lang="less">
    .pic-container{
        background-color: #fff;
        text-align: center;
        .shot-icon{
            width: 50px;
        }
    }

    .publish-video-tag-container{
         margin-top: 10px;
         padding: 10px;
         background: #fff;
        .tag{
             margin-left: 10px;
        }
    }
    .preVideo{
        height: auto;
        width: 100%;
        padding-left: 10px;
    }

</style>