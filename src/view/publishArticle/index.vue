<template>
    <div class="publish-article">
        <van-cell-group>
            <van-field v-model="value" placeholder="文章标题"/>
        </van-cell-group>
        <div class="publish-article-content">
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
    import {CellGroup, Field, Button, Uploader} from 'vant';
    import { quillEditor } from 'vue-quill-editor';

    export default {
        components: {
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Button.name]: Button,
            [Uploader.name]: Uploader
        },
        data() {
            return {
                value: '',
                content: '',
                showModuleName: false,
                editorOption:{
                    modules:{
                        toolbar:[
                            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                            ['blockquote', 'code-block'],
                            ['image']
                        ]
                    },
                    placeholder:"请输入文章内容"
                }
            };
        },
        methods: {
            onRead() {

            },
            created() {
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

            },
            onEditorFocus(){//获得焦点事件

            },
            onEditorChange(){//内容改变事件

            },
            next(){
                this.$router.push({name: 'chooseCatalog'});
            }
        }
    };
</script>
<style lang="less">
    .publish-article{
        &-content{
            margin-top: 10px;
            background-color: #fff;
        }
        .quill-editor{
            height: 300px;
        }
    }


</style>