<!--绑定手机-->
<template>
    <view id="Login">
        <view class="top">
            <image v-if="type===0" src="../../static/login/img.png" mode="widthFix"></image>
            <view class="topHint" v-show="type===1">
                <view class="title">请输入手机号码</view>
                <view class="text">手机号仅用于登录和保护账号</view>
            </view>
        </view>
        <view class="check" :style="{marginTop:type===1?'120upx':'20upx'}">
            <t-form title="手机号码" max="11" min="11" type="text" placeholder="请输入您的手机号码" v-model="phone" @oncheck="test"></t-form>
            <t-form title="验证码" type="check" max="4" placeholder="请输入验证码" v-model="check" @oncheck="test"></t-form>
        </view>
        <view class="hint" v-if="type===0">
            注：为了保护您的账号安全及方便找回，需要对绑定的手
            机号进行短信验证

        </view>
        <button>{{type===0?'保存':'完成'}}</button>
    </view>
</template>

<script>
    import Tools from "../../components/plugin/tool"
    import tform from "../../components/form/index"
    export default {
        name: "index",
        data(){
            return {
                phone:null,  // 手机号码
                check:null,  // 验证码
                type:0,      // 页面渲染验证  :0 未绑定  1 绑定后修改
            }
        },
        mounted(){
            this.type = 0;
        },
        components:{
            "t-form":tform
        },
        methods:{
            test(){

            }
        }
    }
</script>

<style scoped>
    #Login .top image{
        width: 100%;
    }
    #Login .top .topHint{
        margin-top: 116upx;
        text-align: center;
    }
    #Login .top .topHint .title{
        font-size: 40upx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 35upx;
    }
    #Login .top .topHint .text{
        color: #999999;
        font-size:30upx;
    }
    #Login .check{
        margin-top: 10px;
    }
    #Login button{
        font-size: 18px;
        text-align: center;
        line-height: 44px;
        width: 300px;
        position: fixed;
        color: #ffffff;
        bottom: 25px;
        left: calc((100vw - 300px) / 2);
        border: none;
        background-image: linear-gradient(0,#097AF0,#6CB0FF);
    }
    #Login .hint{
        color:#ccc;
        font-size: 12px;
        padding: 17px ;
    }
</style>