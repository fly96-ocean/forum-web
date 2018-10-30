<template>
    <div class="publish-video">
        <van-cell-group>
            <van-field v-model="value" placeholder="视频标题"/>
        </van-cell-group>

        <van-cell-group class="mg-t-15">
            <van-field type="textarea" rows="5" autosize placeholder="视频描述"/>
        </van-cell-group>

        <van-row type="flex" justify="left" class="pic-container">
            <van-col span="6">
                <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
                    <img v-lazy="photograph" class="shot-icon">
                </van-uploader>
            </van-col>
        </van-row>
        <div class="mg-t-15">
            <van-button type="danger" size="large">发布</van-button>
        </div>
    </div>
</template>

<script>
    import {Row, Col, CellGroup, Field, Button, Uploader, Lazyload} from 'vant';

    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Button.name]: Button,
            [Uploader.name]: Uploader,
            [Lazyload.name]: Lazyload
        },
        data() {
            return {
                photograph: require('../../assets/images/camera.png'),
            };
        },
        methods: {
            onRead() {

            }
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

</style>