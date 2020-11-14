<template>
    <view class="addBankCard">
        <view id="content">
            <form>
                <view class="cu-form-group margin-top">
                    <view class="title">真实姓名</view>
                    <input type="text" :value="userName" disabled>
                </view>
                <view class="cu-form-group margin-top">
                    <view class="title">身份证号码</view>
                    <input type="text" :value="idCard" disabled>
                    <!-- <input type="number" id="IdCard"  placeholder="请输入持卡人身份证号码"> -->
                </view>
                <view class="cu-form-group margin-top">
                    <view class="title">银行卡号 <text class="text-red">*</text></view>
                    <input type="number" id="BankCard" placeholder="请输入收款卡号">
                </view>
                <view class="cu-form-group margin-top">
                    <view class="title">手机号码 <text class="text-red">*</text></view>
                    <input type="tel" id="PhoneNumber" placeholder="请输入银行预留手机号码">
                </view>
                <view class="cu-form-group margin-top">
                    <view class="title">开户行 <text class="text-red">*</text></view>
                    <input type="text" id="BankName" placeholder="例: 中国银行">
                </view>
                <view class="cu-form-group margin-top">
                    <view class="title">QQ</view>
                    <input type="text" id="BankAddress" placeholder="例: 中国银行重庆歇马支行">
                </view>
                <view class="cu-form-group margin-top">
                    <view class="title">微信</view>
                    <input type="number" id="QQ" placeholder="您的QQ号">
                </view>
            </form>
            <view class="desc text-sm text-gray padding-sm">
                * 说明：请正确填写提款信息，如填写错误，可能无法提现成功，敬请知晓！
            </view>
        </view>
        <view class="submit margin-top" style="padding: 20upx;"  >
            <view style="width: 100%;" class="cu-btn bg-blue text-white padding-sm"  id="submit">提 交</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                userName:"用户名",
                idCard:5130214582156131
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../components/plugin/colorui/main.css";
    .desc{
    }

</style>