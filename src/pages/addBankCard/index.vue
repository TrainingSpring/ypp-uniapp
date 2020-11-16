<template>
    <view class="addBankCard">
        <view id="content">
            <form>
                <view class="cu-form-group padding-bottom padding-top">
                    <view class="title">真实姓名</view>
                    <input type="text" :value="userName" disabled>
                </view>
                <view class="cu-form-group padding-bottom padding-top">
                    <view class="title">身份证号码</view>
                    <input type="text" :value="idCard" disabled>
                    <!-- <input type="number" id="IdCard"  placeholder="请输入持卡人身份证号码"> -->
                </view>
                <view class="cu-form-group padding-bottom padding-top">
                    <view class="title">银行卡号 <text class="text-red">*</text></view>
                    <input type="number" v-model="bankId" placeholder="请输入收款卡号" @blur="checkBankInfo">
                </view>
                <view class="cu-form-group padding-bottom padding-top">
                    <view class="title">开户行 <text class="text-red">*</text></view>
                    <input type="text" v-model="bankName" disabled placeholder="请先输入银行卡号">
                </view>
                <view class="cu-form-group padding-bottom padding-top">
                    <view class="title">手机号码 <text class="text-red">*</text></view>
                    <input type="tel" id="PhoneNumber" placeholder="请输入银行预留手机号码">
                </view>
                <view class="cu-form-group padding-bottom padding-top">
                    <view class="title">开户支行 <text class="text-red">*</text></view>
                    <input type="text" id="BankAddress" placeholder="例: 中国银行重庆歇马支行">
                </view>
                <view class="cu-form-group padding-bottom padding-top">
                    <view class="title">微信</view>
                    <input type="number" id="QQ" placeholder="您的QQ号">
                </view>
                <view class="cu-form-group padding-bottom padding-top">
                    <view class="title">微信</view>
                    <input type="text" id="WX" placeholder="您的微信号">
                </view>
            </form>
            <view class="desc text-sm text-gray padding-sm">
                * 说明：请正确填写提款信息，如填写错误，可能无法提现成功，敬请知晓！
            </view>
        </view>
        <view class="submit margin-top" style="padding: 20upx;"  >
            <view style="width: 100%;" class="cu-btn bg-blue text-white padding-sm"  @tap="submit">提 交</view>
        </view>
    </view>
</template>

<script>
    import tools from "../../components/plugin/tool"
    import banks from  "../../components/plugin/bank.json"
    export default {
        name: "index",
        data(){
            return{
                userName:"用户名", // 用户名
                idCard:5130214582156131,  // 身份证号码
                bankId: 6228480951234513777,   // 银行卡号
                bankName:null,   // 银行开户行名称
                bankAddress:null,   // 开户行支行名称
                phoneNumber:null,   // 手机号码
                QQ:null,    // QQ号码
                WX:null,    // 微信号码
                tools
            }
        },
        methods:{
            /**
             * 检测银行卡信息
             * */
            checkBankInfo(){
                let cardId = this.bankId;
                let $this = this;
                if (!cardId) {
                    return false
                }
                if(tools.checkInput('bank',cardId))
                    uni.request({
                        url:"https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=6214832018989180&cardBinCheck=true",
                        data:{
                            _input_charset:"utf-8",
                            cardNo:cardId,
                            cardBinCheck:true
                        },
                        success(res){
                            let data = res.data;
                            let msg = data.messages;
                            let bank = data.bank;
                            if(msg.length>0){
                                uni.showModal({
                                    title:"你输入的银行卡卡号有误，请检查！",
                                    icon:"none",
                                    showCancel:false
                                })
                            }else{
                                $this.bankName = banks[bank]
                            }

                        }
                    });
                else{
                    return uni.showToast({
                        title:"请输入正确的银行卡号",
                        icon:"none"
                    });
                }
            },
            /**
             * 提交
             */
            submit(){
                let check = tools.checkInput;
                if(!check('bank',this.bankId)){
                   return uni.showToast({
                       title:"请输入正确的银行卡卡号!",
                       icon:"none"
                   })
                }else if(!this.bankAddress || this.bankAddress == ""){
                    return uni.showToast({
                        title:"请输入支行地址!",
                        icon:"none"
                    })
                }else if(!check('phone',this.phoneNumber)){
                    return uni.showToast({
                        title:"请正确输入您的银行预留手机号码!",
                        icon:"none"
                    })
                }
                // ....
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../components/plugin/colorui/main.css";
    .desc{
    }

</style>