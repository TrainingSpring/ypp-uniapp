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
        <view class="check" v-if="!bindWxPhone || type===1" :style="{marginTop:type===1?'120upx':'20upx'}">
            <t-form title="手机号码" max="11" min="11" type="text" placeholder="请输入您的手机号码" v-model="phone" ></t-form>
            <t-form title="验证码" type="check" max="4" placeholder="请输入验证码" :down="down" v-model="check" @oncheck="getCode"></t-form>
        </view>
        <view class="wx text-center padding" v-if="bindWxPhone && type===0">
            <button class="cu-btn bg-green text-white lg" open-type="getPhoneNumber" @getphonenumber="getPhone"><text class="cuIcon-weixin margin-right"></text>绑定微信手机号</button>
        </view>
        <view class="modifyBindPhone text-right text-blue padding-sm text-sm margin-right" v-if="type===0" @tap="changeBindType">
            {{bindWxPhone?"绑定其他手机号":"使用微信手机号"}}
        </view>
        <view class="hint" v-if="type===0">
            注：为了保护您的账号安全及方便找回，需要对绑定的手
            机号进行短信验证

        </view>
        <button class="finish" v-if="!bindWxPhone || type===1" @tap="savePhoneNumber">{{type===0?'保存':'完成'}}</button>
    </view>
</template>

<script>
    import tform from "../../components/form/index"

    export default {
        name: "index",
        data(){
            return {
                phone:null,  // 手机号码
                check:null,  // 验证码
                type:1,      // 页面渲染验证  :0 未绑定  1 绑定后修改
                bindWxPhone:true,
                down:0, // 倒计时
            }
        },
        mounted(){

        },
        onLoad(res){
            this.type = typeof res.type === "string" ? parseInt(res.type) : res.type;
            console.log(this.type)
        },
        components:{
            "t-form":tform
        },
        methods:{
            /**
             * 获取验证码
             * */
            getCode(){
                let $this = this;
                if (this.tools.checkInput("phone", this.phone) && !this.down)
                    uni.request({
                        url:$this.util.getApiUrl("/sms/get_verification_code"),
                        method:"GET",
                        data:{
                            type:1,
                            phone:$this.phone
    ,
                        },
                        success(res){
                            if (res.data.code === 200){
                                $this.tools.count_down(60*1000,function (timer,data) {
                                    $this.down = data[2];
                                });
                                $this.util.showInfo(1,res.data);
                            }
                        },
                        fail(err){
                            uni.showToast({
                                title:"错误:"+err,
                                icon:"none"
                            })
                        }
                    });
                else{
                    uni.showToast({
                        title:"请输入正确的手机号",
                        icon:"none"
                    })
                }
            },
            /**
             * 更改绑定方式
             * 绑定微信手机号
             * 绑定其他手机号
             * 互相切换
             * */
            changeBindType(){
                this.bindWxPhone = !this.bindWxPhone;
            },
            /**
             * 获取微信手机号
             */
            getPhone(res){
                let $this = this;
                let detail = res.detail;
                let login = uni.getStorageSync("loginInfo");
                uni.request({
                    url:$this.util.getApiUrl("/yppUser/bind_phone_wechat"),
                    data:{
                        uid:login.uid,
                        encryptedData:detail.encryptedData,
                        iv:detail.iv
                    },
                    success(result){
                        let data = result.data;
                        if (data.code === 200) {
                            uni.setStorage({
                                key:"phoneNumber",
                                data:data.result,
                                success(){
                                    uni.navigateBack({})
                                }
                            })
                        }else{
                            $this.util.showInfo(0,data);
                        }
                    }
                });
            },
            /**
             * 保存绑定
             */
            savePhoneNumber(){
                let phone = this.phone;
                let code = this.check;
                let $this = this;
                let login = uni.getStorageSync("loginInfo");
                uni.showLoading({
                    title:"请稍后..."
                });
                // 绑定手机号
                uni.request({
                    url:$this.util.getApiUrl("/yppUser/bind_phone"),
                    method:"POST",
                    data:{
                        uid:login.uid,
                        phone:phone,
                        verificationCode:code
                    },
                    success(result){
                        let data = result.data;
                        if (data.code === 200){
                            uni.setStorage({
                                key:"phoneNumber",
                                data:data.result,
                                success(){
                                    uni.hideLoading();
                                    uni.navigateBack({})
                                }
                            });
                        }

                    }
                })
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
    #Login .finish{
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