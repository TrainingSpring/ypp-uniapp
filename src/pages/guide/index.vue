<!--广告页-->
<template>
    <view class="guide">
        <image src="../../static/guide/logo.png"></image>
        <view class="text">游拼拼 | 一站式游戏创业培育平台</view>
    </view>
</template>

<script>
    export default {
        name: "index",
        mounted(){
            setTimeout(function(){
                console.log(uni.switchTab())
                uni.switchTab({
                    url:"/pages/index/index",
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