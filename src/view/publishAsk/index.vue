<template>
    <div class="publish-ask">
        <van-cell-group>
            <van-field type="textarea" rows="5" autosize placeholder="提问内容"/>
        </van-cell-group>

        <div class="mg-t-15">
            <van-button type="danger" size="large">发布</van-button>
        </div>
    </div>
</template>

<script>
    import {Cell, CellGroup, Field, Button} from 'vant';

    export default {
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Button.name]: Button,
        },
        data() {
            return {
                value: '',
            };
        },
        methods: {
            onRead() {

            }
        }
    };
</script>
<style lang="less">

</style>