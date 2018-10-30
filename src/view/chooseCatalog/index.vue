<template>
    <div class="choose-catalog">
        <div class="title">将内容投递到相应频道下,让更多人看到</div>
        <van-cell-group>
            <van-cell title="机油" label="129983篇帖子">
                <i class="iconfont icon-chenggong"></i>
            </van-cell>
            <van-cell title="维修" label="129983篇帖子" />
            <van-cell title="维修" label="22983篇帖子" />
            <van-cell title="维修" label="429983篇帖子" />
            <van-cell title="维修" label="9983篇帖子">
                <i class="iconfont icon-chenggong"></i>
            </van-cell>
            <van-cell title="维修" label="1983篇帖子" />
        </van-cell-group>

        <div class="mg-t-15">
            <van-cell-group>
                <van-cell title="隐私和权限设置" is-link arrow-direction="down" />
            </van-cell-group>
            <van-cell-group>
                <van-switch-cell v-model="checked" title="仅自己可见" />
                <van-switch-cell v-model="checked" title="不允许回应" />
            </van-cell-group>
        </div>

        <van-button class="mg-t-15" type="danger" size="large" @click="publish()">发布</van-button>
    </div>

</template>
<script>
    import {SwitchCell, Col, Cell, CellGroup, Button} from 'vant';

    export default {
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Col.name]: Col,
            [SwitchCell.name]:SwitchCell,
            [Button.name]:Button
        },
        created() {

        },
        methods: {
            publish(){
                this.$router.push({name: 'home'});
            }
        },
        data() {
            return {
                show: false,
            };
        }
    };
</script>
<style lang="less">
    .choose-catalog {
        .title{
            margin: 0;
            font-weight: 400;
            font-size: 14px;
            color: rgba(69,90,100,.6);
            padding: 15px 15px;
        }
    }
</style>
