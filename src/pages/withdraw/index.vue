<template>
    <view class="withdraw">
        <view class="title">到账方式</view>
        <card title="微信" class="type" :border="true">
             <!--<view class="radio">
                 <radio></radio>
             </view>-->
            <view class="info">
                <view class="key">微信认证姓名</view>
                <view class="val"><input type="text" placeholder="请输入微信认证姓名" v-model="wx_name"></view>
            </view>
        </card>
        <view class="title">提现金额</view>
        <view class="cu-form-group">
            <view class="title lg" style="font-size: 42upx;">￥</view>
            <input placeholder="请输入提现金额" type="number" name="input" />
            <text class='text'>全部提现</text>
        </view>
        <view class="cu-form-group balance">
            <view class="title lg">可提现金额: </view>
            <view class="balance">￥{{tools.formatMoney(balance)}}元</view>
            <text class='text'>提现记录</text>
        </view>
        <view class="desc">
            <view class="li">1、首次1元及可提现；后续满10元即可申请提现！</view>
            <view class="li">2、到账时间：微信提现秒到账。</view>
            <view class="li">3、提现手续费3%</view>
            <view class="li">4、一天只允许提现一次，请勿重复提交</view>
        </view>
        <view class="btn-group">
            <button class="cu-btn shadow bg-blue lg">立即提现</button>
        </view>
        <view class="real">
            完成实名认证,保障您的资金安全. <navigator src="pages/realName/index">去认证 <text class="cuIcon-right"></text></navigator>
        </view>
    </view>
</template>

<script>
    import card from "../../components/card/index.vue"
    import tools from "../../components/plugin/tool"
    export default {
        name: "index",
        data(){
            return {
                wx_name:"",
                balance:1238,
                tools
            }
        },
        components:{
            card
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../components/plugin/colorui/main.css";
    @import "../../components/plugin/colorui/icon.css";
    .withdraw{
        padding: 0 30upx;
        .title{
            color: #333333;
            font-size: 32upx;
            margin-top:36upx;
            margin-bottom: 26upx;
        }
        .type{
            padding: 17upx 26upx;
            .info{
                margin-top: 18upx;
                .key{
                    color: #333333;
                    font-size: 24upx;
                }
                .val{
                    font-size: 24upx;
                    color: #666666;
                    margin-top: 20upx;
                    input{
                        font-size: 24upx;
                    }
                }
            }
        }
        .cu-form-group{
            border-bottom: 1px solid #eee;
            .text-blue{
            }
            .text{
                color: #62AFFF;
                font-size: 30upx;
            }
        }
        .balance{
            font-size: 30upx;
            border-bottom: none;
            border-top: none;
            .title{
                color: #808080;
            }
            .balance{
                color: #62AFFF;
            }
        }
        .desc{
            font-size: 24upx;
            color: #333333;
            .li{
                margin-bottom: 20upx;
                padding: 0 30upx;
            }
        }
        .btn-group{
            margin-top: 40upx;
            button{
                width: 100%;
            }
        }
        .real{
            font-size:28upx;
            color: #333333;
            text-align: center;
            margin-top: 26upx;
            navigator{
                display: inline;
                color: #44A2FF;
                margin-left: 10upx;
            }
        }
    }
</style>