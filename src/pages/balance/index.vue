<template>
    <view class="balance">
        <bgi src="../../static/balance/bg.png" class="top">
            <view class="title">我的余额</view>
            <view class="money">￥ {{tools.formatMoney(balance)}}</view>
            <view class="hint">
                <view class="li">注意：</view>
                <view class="li">1、首次1元及可提现；后续满10元即可申请提现！</view>
                <view class="li">2、到账时间：微信提现秒到账。</view>
                <view class="li">3、提现手续费3%。</view>
                <view class="li">4、一天只允许提现一次，请勿重复提交</view>
            </view>
        </bgi>
        <view class="content">
            <view class="title">余额明细</view>
            <card :title="item.title" class="item" v-for="item in details">
                <view class="li">
                    <view>微信: {{item.wx}}</view>
                    <view>{{item.state === 0?'已提交':item.state === 1?'成功':'失败'}}</view>
                </view>
                <view class="li">
                    <view>提现编号:{{item.number}}</view>
                    <view>{{item.date}}</view>
                </view>
                <view class="money">+{{tools.formatMoney(item.money)}}</view>
            </card>
        </view>
        <view class="btn-group withdraw">
            <button class="cu-btn bg-blue lg">去提现</button>
        </view>

    </view>
</template>

<script>
    import bgi from "../../components/bg/index.vue"
    import card from "../../components/card/index.vue"
    import tools from "../../components/plugin/tool"
    export default {
        name: "index",
        data(){
            return {
                balance:0.33,
                tools:tools,
                details:[
                    {
                        title:"提现",
                        wx:"12312312",
                        number:"54635431",
                        state:1,
                        date:"2020-11-11 20:40",
                        money:100
                    },
                    {
                        title:"提现",
                        wx:"12312312",
                        number:"54635431",
                        state:1,
                        date:"2020-11-11 20:40",
                        money:100
                    },
                    {
                        title:"提现",
                        wx:"12312312",
                        number:"54635431",
                        state:1,
                        date:"2020-11-11 20:40",
                        money:100
                    },
                ]
            }
        },
        components:{
            card,
            bgi
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../components/plugin/colorui/main.css";
    @import "../../components/plugin/colorui/icon.css";
    .balance{
        .top{
            width: 749.4upx;
            height: 326.3upx;
            position: relative;
            color: #FFFFFF;
            text-align: center;
            margin-bottom: 106upx;
            .title{
                font-size: 36upx;
                padding-top:54upx;
            }
            .money{
                font-size: 86upx;
                margin-top: 15upx;
            }
            .hint{
                text-align: left;
                color: #626262;
                font-size: 26upx;
                padding: 16upx 0;
                width: 689upx;
                height: 199upx;
                background: #FFFFFF;
                box-shadow: 0px 3upx 7upx 0px rgba(0, 136, 237, 0.33);
                border-radius: 88upx;
                margin: 10upx auto 0;
                text-indent: 75upx;
            }
        }
        .content{
            padding:  50upx 30upx;
            .title{
                font-size: 36upx;
                color: #1a1a1a;
                font-weight: 400;
            }
            .item{
                padding:20upx 25upx;
                color: #808080;
                font-size: 24upx;
                position: relative;
                margin-bottom: 20upx;
                .li{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20upx;
                }
                .money{
                    position: absolute;
                    right: 22upx;
                    top: 23upx;
                    font-size: 28upx;
                    color: red;
                }
            }
        }
        .withdraw{
            padding: 20upx 43upx;
            button{
                width: 100%;
            }
        }
    }
</style>