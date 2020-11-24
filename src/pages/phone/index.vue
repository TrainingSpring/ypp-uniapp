<!--绑定手机-->
<template>
    <view id="Login">
        <view class="top">
            <image v-if="type!==1" :src="util.getStaticUrl('login/img.png')" mode="widthFix"></image>
            <view class="topHint" v-show="type===1">
                <view class="title">请输入原手机号码</view>
                <view class="text">手机号仅用于登录和保护账号</view>
            </view>
        </view>
        <view class="check" v-if="!bindWxPhone || type===1" :style="{marginTop:type===1?'120upx':'20upx'}">
            <t-form title="手机号码" max="11" min="11" type="text" placeholder="请输入您的手机号码" v-model="phone" ></t-form>
            <t-form title="验证码" type="check" max="4" placeholder="请输入验证码" :down="down" v-model="check" @oncheck="getCode"></t-form>
        </view>
        <view class="wx text-center padding" v-if="bindWxPhone && type!==1">
            <button class="cu-btn bg-green text-white lg" open-type="getPhoneNumber" @getphonenumber="getPhone"><text class="cuIcon-weixin margin-right"></text>绑定微信手机号</button>
        </view>
        <view class="modifyBindPhone text-right text-blue padding-sm text-sm margin-right" v-if="type!==1" @tap="changeBindType">
            {{bindWxPhone?"绑定其他手机号":"使用微信手机号"}}
        </view>
        <view class="hint" v-if="type===0">
            注：为了保护您的账号安全及方便找回，需要对绑定的手
            机号进行短信验证

        </view>
        <button class="finish" v-if="!bindWxPhone && type!==1" @tap="savePhoneNumber">完成</button>
        <button class="finish" v-if="type===1" @tap="savePhoneNumber">下一步</button>
        <view class="mask" style="position: fixed;top:0;left: 0;width:100%;height: 100%;z-index: 99999;" v-show="mask"></view>
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
                type:1,      // 页面渲染验证  :0 未绑定  1 修改(验证原号码)  2.修改(绑定新号码)
                bindWxPhone:true,
                down:0, // 倒计时
                mask:false
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
                let type = this.type===0?1:3;
                console.log("获取验证码",type);
                if (this.tools.checkInput("phone", this.phone) && !this.down)
                    uni.request({
                        url:$this.util.getApiUrl("/sms/get_verification_code"),
                        method:"GET",
                        data:{
                            type,
                            phone:$this.phone
    ,
                        },
                        success(res){
                            if (res.data.code === 200){
                                $this.tools.count_down(60*1000,function (timer,data) {
                                    $this.down = data[2];
                                });
                                $this.util.showInfo(1,res.data);
                            }else{
                                $this.util.showInfo(0,res.data);
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
                let getUserWxPhone = function(){
                    uni.request({
                        url:$this.util.getApiUrl("/yppUser/bind_phone_wechat"),
                        method:"POST",
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
                                        $this.mask = true;
                                        $this.util.showInfo(1,data);
                                        setTimeout(()=>{
                                            uni.navigateBack({});
                                        },2000)

                                    }
                                })
                            }else{
                                $this.util.showInfo(0,data);
                            }
                        }
                    });
                };
                console.log(detail);
                uni.checkSession({
                    success(res){
                        getUserWxPhone();
                    },
                    fail(err){  // 登录失效 重新登录
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
                                                    data:data.result,
                                                    success(){
                                                        getUserWxPhone();
                                                    }
                                                })
                                            }else{
                                                $this.util.showInfo(0,data);
                                            }
                                        }
                                    })
                                }
                            },
                            fail(){
                                uni.showToast({
                                    title:"登录失效...",
                                    icon:"none"
                                })
                            }
                        })
                    }
                })

            },
            /**
             * 保存绑定
             */
            savePhoneNumber(){
                let phone = this.phone;
                let code = this.check;
                let $this = this;
                let login = uni.getStorageSync("loginInfo");
                let type = this.type;
                if (!this.tools.checkInput("phone", phone)) {
                    return uni.showToast({
                        title:"您的手机号输入不正确,请检查后重新输入",
                        icon:"none",
                        duration:3000
                    })
                }else if(!code || code === ""  || code.length<4){
                    return uni.showToast({
                        title:"请输入正确的验证码!",
                        icon:"none",
                        duration:3000
                    })
                }
                // 校验验证码

                uni.showLoading({
                    title:"请稍后..."
                });
                uni.request({
                    url:$this.util.getApiUrl("/sms/verification_code"),
                    method:"GET",
                    data:{
                        phone,
                        code
                    },
                    success(res){
                        let data =  res.data;
                        if (data.code === 200 && data.result){
                            if (type === 0) {  // 绑定手机号
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
                                                    uni.navigateBack({});
                                                    $this.util.showInfo(1,data);
                                                }
                                            });
                                        }else{
                                            $this.util.showInfo(0,data);
                                        }

                                    }
                                })
                            }else if (type === 1) {
                                // 验证成功  进入下一步绑定新手机号
                                $this.type = 2;
                                $this.phone = null;
                                $this.check = null;
                                uni.hideLoading();
                            }else{
                                // 绑定新手机号
                                uni.request({
                                    url:$this.util.getApiUrl("/yppUser/update_phone"),
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
                                                    uni.navigateBack({});
                                                    $this.util.showInfo(1,data);
                                                }
                                            });
                                        }else{
                                            $this.util.showInfo(0,data);
                                        }

                                    }
                                })
                            }
                        } else{
                            $this.util.showInfo(0,data);
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