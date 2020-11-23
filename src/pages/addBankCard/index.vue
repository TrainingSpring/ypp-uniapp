<template>
    <view class="addBankCard">
        <view id="content">
            <form>
                <view class="cu-form-group text-sm padding-bottom padding-top ">
                    <view class="title" style="font-size:24upx;">真实姓名</view>
                    <input style="font-size: 24upx;" type="text" :value="userName" disabled>
                </view>
                <view class="cu-form-group text-sm padding-bottom padding-top ">
                    <view class="title" style="font-size:24upx;">身份证号码</view>
                    <input style="font-size: 24upx;" type="text" :value="idCard" disabled>
                    <!-- <input type="number" id="IdCard"  placeholder="请输入持卡人身份证号码"> -->
                </view>
                <view class="cu-form-group text-sm padding-bottom padding-top ">
                    <view class="title" style="font-size:24upx;">银行卡号 <text class="text-red">*</text></view>
                    <input style="font-size: 24upx;" type="number" v-model="bankId" :placeholder="type===0?'请输入收款卡号':bankIdPlaceholder" @blur="checkBankInfo">
                </view>
                <view class="cu-form-group text-sm padding-bottom padding-top ">
                    <view class="title" style="font-size:24upx;">开户行 <text class="text-red">*</text></view>
                    <input style="font-size: 24upx;" type="text" v-model="bankName" disabled placeholder="请先输入银行卡号">
                </view>
                <view class="cu-form-group text-sm padding-bottom padding-top ">
                    <view class="title" style="font-size:24upx;">手机号码 <text class="text-red">*</text></view>
                    <input style="font-size: 24upx;" type="tel" v-model="phoneNumber" id="PhoneNumber" :placeholder="type===0?'请输入银行预留手机号码':phoneNumberPlaceholder">
                </view>
                <view class="cu-form-group text-sm padding-bottom padding-top ">
                    <view class="title" style="font-size:24upx;">开户支行 <text class="text-red">*</text></view>
                    <input style="font-size: 24upx;" type="text" v-model="bankAddress" id="BankAddress" placeholder="例: 中国银行重庆歇马支行">
                </view>
                <view class="cu-form-group text-sm padding-bottom padding-top ">
                    <view class="title" style="font-size:24upx;">QQ</view>
                    <input style="font-size: 24upx;" type="number" v-model="QQ" id="QQ" placeholder="您的QQ号">
                </view>
                <view class="cu-form-group text-sm padding-bottom padding-top ">
                    <view class="title" style="font-size:24upx;">微信</view>
                    <input style="font-size: 24upx;" type="text" v-model="WX" id="WX" placeholder="您的微信号">
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
                uid:uni.getStorageSync("loginInfo").uid,
                userName:null, // 用户名
                idCard:null,  // 身份证号码
                bankId: null,   // 银行卡号
                bankName:null,   // 银行开户行名称
                bankAddress:null,   // 开户行支行名称
                phoneNumber:null,   // 手机号码
                QQ:null,    // QQ号码
                WX:null,    // 微信号码
                tools,
                bankCardId:null,
                type:0,  // 类型  0 是添加   1 是修改
                phoneNumberPlaceholder:null,
                bankIdPlaceholder:null
            }
        },
        onLoad(res){
            // 上一个页面传参: 一个银行卡的id
            let $this = this;
            if (!res.bank){
                this.type = 0;
            }
            else {
                let bank = JSON.parse(res.bank);
                console.log(bank);
                this.type = 1;
                uni.request({
                    url:$this.util.getApiUrl("/yppUser/get_user_bandCard_info"),
                    method:"POST",
                    data:{
                        uid:$this.uid,
                        bankCardId:bank.id
                    },
                    success(res){
                        let data = res.data;
                        if (data.code === 200) {
                            $this.util.showInfo(1,data);
                            // $this.bankId = data.result.bankCardNum;
                            $this.bankIdPlaceholder=data.result.bankCardNum;
                            $this.idCard = data.result.bankIdCardNum;
                            $this.userName = data.result.bankIdCardName;
                            $this.bankName = data.result.bankName;
                            $this.bankAddress = data.result.bankAddress;
                            // $this.phoneNumber = data.result.bankPhone;
                            $this.phoneNumberPlaceholder = data.result.bankPhone;
                            $this.QQ = data.result.qq;
                            $this.WX = data.result.wechat;
                            $this.bankCardId = bank.id;
                        }else{
                            $this.util.showInfo(0,data);
                        }
                    }
                })
            }
            // 初始化
            this.init();
        },
        methods:{
            init(){
                let $this = this;
                /*uni.request({
                    url:$this.util.getApiUrl("/yppUser/check_user_is_realName_authentication"),
                    data:{
                        uid:$this.uid
                    },
                    method:"POST",
                    success(res){
                        let data = res.data;
                        if (data.code === 200) {
                            $this.userName = data.result.realName;
                            $this.idCard = data.result.idCard;
                        }
                    }
                })*/
                this.util.getRealInfo($this).then(res=>{
                    $this.userName = res.result.realName;
                    $this.idCard = res.result.idCard;
                })
            },
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
                                $this.bankName = banks[bank];
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
                let $this = this;
                let check = tools.checkInput;
                let uid = this.uid;
                if(!check('bank',this.bankId)){
                   return uni.showToast({
                       title:"请输入正确的银行卡卡号!",
                       icon:"none"
                   })
                }else if(!check('phone',this.phoneNumber)){
                    return uni.showToast({
                        title:"请正确输入您的银行预留手机号码!",
                        icon:"none"
                    })
                }else if(!this.bankAddress || this.bankAddress == ""){
                    return uni.showToast({
                        title:"请输入支行地址!",
                        icon:"none"
                    })
                }
                // 添加银行卡
                console.log(this.$data,this.type);

                if($this.type === 0)
                    uni.request({
                        url:$this.util.getApiUrl("/yppUser/add_bankCard_info"),
                        data:{
                            uid,
                            bankCardNum:$this.bankId,
                            bankName:$this.bankName,
                            bankAddress:$this.bankAddress,
                            bankPhone:$this.phoneNumber,
                            qq:$this.QQ,
                            wechat:$this.WX
                        },
                        method:"POST",
                        success(result){
                            let r_data = result.data;
                            if (r_data.code === 200) {
                                // ...
                                $this.util.showInfo(0,r_data);
                                uni.navigateBack({})
                            }else{
                                $this.util.showInfo(0,r_data);
                            }
                        }
                    });
                else{
                    uni.request({
                        url:$this.util.getApiUrl("/yppUser/update_user_bankCard_info"),
                        data:{
                            uid,
                            bankCardNum:$this.bankId,
                            bankName:$this.bankName,
                            bankAddress:$this.bankAddress,
                            bankPhone:$this.phoneNumber,
                            bankCardId:$this.cardId,
                            qq:$this.QQ,
                            wechat:$this.WX
                        },
                        method:"POST",
                        success(result){
                            let r_data = result.data;
                            if (r_data.code === 200) {
                                // ...
                                $this.util.showInfo(0,r_data);
                                uni.navigateBack({})
                            }else{
                                $this.util.showInfo(0,r_data);
                            }
                        }
                    });
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