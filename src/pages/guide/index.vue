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
            // 获取微信用户信息
            setTimeout(function(){
                // #ifdef MP-WEIXIN
                uni.authorize({
                    scope:"scope.userInfo",
                    success:function () {
                        uni.getUserInfo({
                            success:function (res) {
                                uni.setStorage({
                                    key:"userInfo",
                                    data:res,
                                    success:function(){
                                        uni.switchTab({
                                            url:"/pages/index/index"
                                        })
                                    }
                                })
                            }
                        })
                    },
                    fail:function (err) {
                        uni.setStorage({
                            key:"userInfo",
                            data:undefined,
                            success:function(){
                                uni.switchTab({
                                    url:"/pages/index/index"
                                })
                            }
                        })
                    }
                })
                // #endif
                // #ifndef MP-WEIXIN
                uni.switchTab({
                    url:"/pages/index/index"
                })
                // #endif
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