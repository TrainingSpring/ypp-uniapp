<!--授权登录-->
<template>
    <view class="login">
        <view class="logo">
            <image :src='util.getStaticUrl("guide/logo.png")' mode="widthFix"></image>
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
            return{
                uid:null
            }
        },
        mounted(){
            let $this = this;

        },
        methods:{
            /**
             * 登录点击
             * */
            login:function (res) {
                uni.showLoading({
                    title:"请稍后...",
                });
                // #ifdef MP-WEIXIN
                let detail = res.detail;
                let state = detail.errMsg;
                let $this = this;
                console.log(res);
                if(state === "getUserInfo:fail auth deny"){  // 取消授权
                    uni.hideLoading();
                        uni.showToast({
                            title:"授权失败!",
                            icon:'none'
                        })
                    }else{
                    // 成功授权
                    uni.login({
                        success(res){
                            if (res.errMsg === "login:ok") {
                                // 获取code  以此获取uid
                                uni.hideLoading();
                                uni.request({
                                    url:$this.util.getApiUrl("/yppUser/login_wechat"),
                                    method:"POST",
                                    data:{
                                        wechatCode:res.code
                                    },
                                    success(suc){
                                        let data = suc.data;
                                        if (data.code === 200) {
                                            let uid = $this.uid = data.result.uid;
                                            // 保存登录的uid等信息
                                            uni.setStorage({
                                                key:"loginInfo",
                                                data:data.result,
                                                success(){
                                                    // 获取到授权信息(用户微信开放信息)
                                                    let userInfo = detail.userInfo;
                                                    // 保存用户登录信息到服务器
                                                    uni.request({
                                                        url:$this.util.getApiUrl("/yppUser/save_user_info_wechat"),
                                                        method:"POST",
                                                        data:{
                                                            uid:uid,
                                                            rawData:detail.rawData,
                                                            signature:detail.signature,
                                                            iv:detail.iv,
                                                            encryptedData:detail.encryptedData
                                                        },
                                                        success(response){
                                                            // 保存成功...
                                                            if (response.data.code === 200) {
                                                                // 添加到本地缓存
                                                                uni.setStorage({
                                                                    key:'userInfo',
                                                                    data:userInfo,
                                                                    success(){
                                                                        // 保存到storage成功后 跳转页面
                                                                        /*uni.switchTab({
                                                                            url:"/pages/index/index"
                                                                        });*/
                                                                        // 返回上一个页面
                                                                        uni.navigateBack({})
                                                                    }
                                                                });
                                                            }else{
                                                                // 失败提示
                                                                $this.util.showInfo(0,response.data);
                                                            }
                                                        }
                                                    });
                                                }
                                            })
                                        }else{
                                            $this.util.showInfo(0,data);
                                        }
                                    }
                                })
                            }
                        },
                        fail(err){
                            uni.showToast({
                                title:"[错误]"+err.errMsg,
                                icon:"none"
                            })
                        }
                    });


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