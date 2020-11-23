<!--账号绑定信息-->
<template>
    <view class="bind cu-list menu">
        <view class="cu-item">
            <navigator class="content" hover-class="none" url="../phone/index?type=1">
               <view class="content">
                   <text class="cuIcon-mobile text-blue"></text>
                   <text class="text-grey">更换手机</text>
               </view>
            </navigator>

            <navigator class="action" url="../phone/index?type=1">
                <text class="text-gray phone">{{phone}}</text>
                <text class="cuIcon-right text-gray"></text>
            </navigator>
        </view>
        <view class="cu-item">
            <view class="content">
                <text class="cuIcon-weixin text-blue"></text>
                <text class="text-grey">微信</text>
            </view>
            <view class="action">
                <view class="cu-tag round bg-green light">已绑定</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                phone:null
            }
        },
        onShow() {
            let phone = uni.getStorageSync("phoneNumber");
            if (phone)
                this.phone = phone;
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../components/plugin/colorui/icon.css";
    @import "../../components/plugin/colorui/main.css";
    .bind{
        .action{}
        .phone{
            font-size: 32upx;
            line-height: 40upx;
        }
    }
</style>