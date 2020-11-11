<!--授权登录-->
<template>
    <view class="login">
        <view class="logo">
            <image src="../../static/guide/logo.png" mode="widthFix"></image>
            <view class="text" >游拼拼手游平台</view>
        </view>
        <view class="author">
            <view class="title">申请获取以下权限，请确认授权以下信息</view>
            <view class="cont">• 获得你的公开信息（昵称、头像、地区等）</view>
        </view>
        <button open-type="getUserInfo" class="confirm" @getuserinfo="login" @error="fail">
            确认登录
        </button>
        <view class="protocol">
            登录表示同意 <navigator src="#">用户协议</navigator>,<navigator src="#">隐私条款</navigator>
        </view>
    </view>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{}
        },
        methods:{
            login:function (res) {
                // #ifdef MP-WEIXIN
                let detail = res.detail;
                let state = detail.errMsg;
                console.log(state);
                if(state === "getUserInfo:fail auth deny"){
                        uni.showToast({
                            title:"授权失败!",
                            icon:'none'
                        })
                    }else{
                        let userInfo = detail.userInfo;
                        console.log(userInfo);

                        uni.showLoading({
                            title:"请稍后...",
                        })
                        uni.switchTab({
                            url:"/pages/index/index"
                        })
                    }
                console.log(res);
                // #endif

            },
            fail:function (res) {
                console.log(res,"授权失败")
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login{
        padding: 62upx;
        .logo{
            text-align: center;
            margin: 99upx auto 0;
            image{
                width: 110upx;
                height: 110upx;
            }
            .text{
                margin-top: 38upx;
                font-size: 36upx;
                color: #000;

            }
        }
        .author{
            margin-top: 130upx;
            .title{
                font-size: 34upx;
                color: #000;
            }
            .cont{
                font-size: 26upx;
                color: #5D5D5D;
                margin-top: 38upx;
            }
        }
        .confirm{
            width: 630upx;
            height: 82upx;
            color: #FFFFFF;
            text-align: center;
            line-height: 82upx;
            font-size: 36upx;
            border-radius: 10upx;
            margin: 90upx auto 60upx;
            background: linear-gradient(118deg, #54A2FB, #2288F4);
        }
        .protocol{
            font-size: 12px;
            color: #5D5D5D;
            text-align: center;
            navigator{
                display: inline-block;
                color: #2288F4;
            }
        }
    }
</style>