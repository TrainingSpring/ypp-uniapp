<!--广告页-->
<template>
    <view class="guide">
        <image src="../../static/guide/logo.png"></image>
        <view class="text">游拼拼 | 一站式游戏创业培育平台</view>
        <view class="flex">
            <view class="bg-white flex-sub radius shadow-lg">
                <image src="https://image.weilanwl.com/gif/loading-white.gif" mode="aspectFit" class="gif-white response" style="height:240upx;width:100%;"></image>
            </view>
        </view>

    </view>
</template>

<script>
    export default {
        name: "index",
        mounted(){
            let $this = this;
            // 获取微信用户信息
            // #ifdef MP-WEIXIN
            uni.login({
                success(res){
                    if (res.errMsg === "login:ok") {
                        uni.request({
                            url:$this.util.getApiUrl("/yppUser/login_wechat"),
                            method:"POST",
                            data:{
                                wechatCode:res.code
                            },
                            success(suc){
                                let data = suc.data;
                                if (data.code === 200) {
                                    uni.setStorage({
                                        key:"loginInfo",
                                        data:data.result
                                    })
                                }else{
                                    $this.util.showInfo(0,data);
                                }
                            }
                        })
                    }
                },
                fail(err){

                }
            });
            // #endif
            setTimeout(function(){
                uni.switchTab({
                    url:"/pages/index/index"
                })
            },2000)


        }
    }
</script>

<style lang="scss" scoped>
    page{
        background: white;
    }
    .guide{
        text-align: center;
        margin-top: 50%;
        image{
            width: 97upx;
            height: 97upx;
        }
        .text{
            margin-top: 20px;
            font-size: 30upx;
            color: #000000;
        }
    }
</style>