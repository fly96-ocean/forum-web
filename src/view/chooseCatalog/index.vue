<template>
    <div class="choose-catalog">
        <div class="title">将内容投递到相应频道下,让更多人看到</div>
        <van-radio-group v-model="result" @change="change">
            <van-cell-group>
                <van-cell
                        v-for="(item, index) in domains"
                        clickable
                        :key="item.oId"
                        :title="`${item.domainTitle}`"
                        @click="result=`${item.oId}`">
                    <van-radio :name="`${item.oId}`" />
                </van-cell>
            </van-cell-group>
        </van-radio-group>

        <div class="mg-t-15">
            <van-cell-group>
                <van-cell title="隐私和权限设置" is-link arrow-direction="down" />
            </van-cell-group>
            <van-cell-group>
                <van-switch-cell v-model="articleAnonymous" title="仅自己可见" />
                <van-switch-cell v-model="articleCommentable" title="允许评论" />
            </van-cell-group>
        </div>

        <van-button class="mg-t-15" type="danger" size="large" @click="publish()">发布</van-button>
    </div>

</template>
<script>
    import {SwitchCell, Col, Cell, CellGroup, Button, RadioGroup, Radio} from 'vant';
    import api from '../../axios/api.js';
    import common from '../../common/common.js';

    export default {
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Col.name]: Col,
            [SwitchCell.name]:SwitchCell,
            [Button.name]:Button,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio
        },
        data() {
            return {
                show: false,
                articleId: null,
                domainType:null,
                result: null,
                domains: [],
                articleAnonymous: false,
                articleCommentable: true,
            };
        },
        methods: {
            change(){
                console.log(this.result);
            },
            publish(){
                api.post(common.host + '/api/article/update', {articleId: this.articleId, articleAnonymous: this.articleAnonymous, articleCommentable: this.articleCommentable, articleDomainId: this.result}).then(res => {
                    if(res.code == 0){
                        if(this.domainType == 0){
                            this.$router.push({name: 'home'});
                        }
                        if(this.domainType == 1){
                            this.$router.push({name: 'video'});
                        }
                        if(this.domainType == 2){
                            this.$router.push({name: 'ask'});
                        }

                    } else {
                        Toast.fail(res.msg);
                    }
                });
            }
        },
        created() {
            this.articleId = this.$route.params.articleId;
            this.domainType = this.$route.params.domainType;
            api.get(common.host + '/api/domain/list', {domainType: this.domainType}).then(res => {
                this.domains = res.msg;
            });
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
