<template>
    <div class="publish-ask">
        <van-cell-group>
            <van-field v-model="articleTitle" placeholder="标题"/>
        </van-cell-group>
        <van-cell-group>
            <div class="publish-ask-content">
                <van-uploader id="imageUpload"
                              name="file"
                              :after-read="onRead"
                              accept="image/gif, image/jpeg, image/png, image/jpg"
                              multiple
                              v-show="imageUploadShow" />
                <!-- 图片上传组件辅助-->
                <quill-editor
                        v-model="articleRewardContent"
                        ref="myQuillEditor"
                        :options="editorOption">
                </quill-editor>
            </div>

        </van-cell-group>

        <div class="mg-t-15">
            <van-cell-group>
                <van-field v-model="articleRewardPoint" placeholder="悬赏积分"/>
            </van-cell-group>
        </div>

        <div class="mg-t-15">
            <van-button type="danger" size="large" @click="publish()">发布</van-button>
        </div>
    </div>
</template>

<script>
    import {Cell, CellGroup, Field, Button, Uploader, Toast} from 'vant';
    import { quillEditor } from 'vue-quill-editor';
    import api from '../../axios/api.js';
    import common from '../../common/common.js';

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        ['link', 'image'],
    ]

    export default {
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Button.name]: Button,
            [Uploader.name]: Uploader,
            [Toast.name]: Toast
        },
        data() {
            return {
                value: '',
                articleRewardContent:null,
                articleRewardPoint: null,
                articleTitle: null,
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
            };
        },
        methods: {
            onRead() {
                var file = document.getElementById("imageUpload").files[0];
                var param = new FormData(); //创建form对象
                param.append("file", file, file.name);//通过append向form对象添加数据
                api.post(common.host + '/api/upload/upload', param).then(res => {
                    let quill = this.$refs.myQuillEditor.quill;
                    let length = quill.getSelection().index;
                    quill.insertEmbed(length, 'image', this.host+"/"+res.data);
                    quill.setSelection(length + 1)
                    this.articleImages.push(res.data);
                });

            },
            publish(){
                var data = {
                    articleTitle: this.articleTitle,
                    articleRewardContent: this.articleRewardContent,
                    articleType: 2,
                    articleImages: this.articleImages
                }
                api.post(common.host + '/api/article/save', data).then(res => {
                    if(res.code == 0){
                        this.$router.push({
                            path: '/ask'
                        })
                    }else{
                        Toast.success('问答保存失败');
                    }
                });
            }
        }
    };
</script>
<style lang="less">
    .publish-ask{
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
    }
    .quill-editor{
        height: 300px;
    }
</style>