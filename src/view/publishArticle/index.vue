<template>
    <div class="publish-article">
        <van-cell-group>
            <van-field v-model="articleTitle" placeholder="文章标题"/>
        </van-cell-group>

        <div class="publish-article-tag-container">
            <a v-for="(tag, index) in firstLevelTags" href="javascript:void(0)" @click="loadSecondLevel(tag.oId, index)">
                <van-tag size="medium" class="tag" :type="tag.tagStyle">{{tag.tagTitle}}</van-tag>
            </a>
        </div>

        <div class="publish-article-tag-container" v-show="secondLevelTagShow">
            <a v-for="(tag, index) in secondLevelTags" href="javascript:void(0)" @click="chooseSecondLevel(tag.oId, index)">
                <van-tag size="medium" class="tag" :type="tag.tagStyle">{{tag.tagTitle}}</van-tag>
            </a>
        </div>

        <div class="publish-article-content">
            <van-uploader id="imageUpload" name="file" :after-read="onRead" accept="image/gif, image/jpeg" multiple v-show="imageUploadShow" />
            <!-- 图片上传组件辅助-->
            <quill-editor
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
            </quill-editor>
        </div>
        <van-button class="mg-t-15" type="danger" size="large" @click="next()">下一步</van-button>
    </div>
</template>

<script>
    import {CellGroup, Field, Button, Uploader, Tag, Toast} from 'vant';
    import { quillEditor } from 'vue-quill-editor';
    import api from '../../axios/api.js';
    import common from '../../common/common.js';
    import axios from 'axios';

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        ['link', 'image', 'video'],
    ]

    export default {
        components: {
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Button.name]: Button,
            [Uploader.name]: Uploader,
            [Tag.name]: Tag,
            [Toast.name]: Toast
        },
        data() {
            return {
                value: '',
                content: '',
                articleTitle:'',
                showModuleName: false,
                imageUploadShow: false,
                editorOption:{
                    modules:{
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('#imageUpload').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    },
                    placeholder:"请输入文章内容"
                },
                secondLevelTagShow: false,
                firstLevelTags: null,
                secondLevelTags: null,
                currentLevelTags: null
            };
        },
        created() {
            this.loadFirstLevel();
        },
        methods: {
            onRead() {
                var file = document.getElementById("imageUpload").files[0];
                var param = new FormData(); //创建form对象
                param.append("file", file, file.name);//通过append向form对象添加数据
                api.post(common.host + '/api/upload/upload', param).then(res => {
                    console.log(res.data);
                });

            },
            updateData: function (data) {
                this.content = data
            },
            fullScreen: function () {
                this.$refs.editor.enableFullScreen()
            },
            focus: function () {
                this.$refs.editor.focus()
            },
            reset:function () {
                var newContent = prompt('please input some html code: ')
                if(newContent){
                    this.content = newContent
                }
            },
            onEditorBlur(){//失去焦点事件
                console.log("失去焦点")
            },
            onEditorFocus(){//获得焦点事件
                console.log("获得焦点")
            },
            onEditorChange(){//内容改变事件
                console.log("内容改变")
            },

            next(){
                var data = {
                    articleTitle: this.articleTitle,
                    articleContent: this.content,
                    articleTags: this.currentLevelTags.oId,
                    articleType: 0
                }
                api.post(common.host + '/api/article/save', data).then(res => {
                    if(res.code == 0){
                        var oId = res.msg.oId;
                        this.$router.push({
                            path: '/chooseCatalog/'+oId
                        })
                    }else{
                        Toast.success('帖子保存失败');
                    }
//
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
            }
        }
    };
</script>
<style lang="less">
    .publish-article{
        &-tag-container{
            margin-top: 10px;
            padding: 10px;
            background: #fff;
            .tag{
                margin-left: 10px;
            }
        }
        &-content{
            margin-top: 10px;
            background-color: #fff;
        }
        .quill-editor{
            height: 300px;
        }
    }


</style>