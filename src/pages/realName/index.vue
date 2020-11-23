<template>
    <view class="real">
        <view class="hint">请确认是您本人操作，验证通过后不可修改！</view>
        <t-form class="form" type="text" :min="2" :max="22" title="姓名" v-model="name" placeholder="请输入真实姓名">

        </t-form>
        <t-form class="form" type="text" value="身份证" disabled title="证件类型">

        </t-form>
        <t-form class="form" title="证件号" :max="18" :min="15" v-model="idCard" placeholder="请输入身份证号">

        </t-form>
        <view class="protocol" :style="{color:protocol?'#2894FF':'#999'}">
            <checkbox-group @change="checkBoxChange" class="">
                <label>
                    <checkbox value="0" color="#2894FF" /> 已阅读并同意《用户协议》及《隐私政策》
                </label>
            </checkbox-group>
        </view>
        <view class="cu-btn lg bg-blue" @tap="checkInfo">验证信息</view>
    </view>
</template>

<script>
    import tform from "../../components/form/index.vue"
    export default {
        name: "index",
        data(){
            return{
                name:"",
                idCard:"",
                protocol:false,

            }
        },
        components:{
            TForm:tform
        },
        methods:{
            checkBoxChange(val){
                let detail = val.detail.value;
                this.protocol = detail.length === 1;
            },
            /**
             *
             * 验证并绑定信息
             */
            checkInfo(){
                let $this = this;
                let loginInfo = uni.getStorageSync("loginInfo");
                if(!this.protocol){
                    uni.showToast({
                        title:"请同意用户协议和隐私政策",
                        icon:"none"
                    })
                } else if (this.name.length < 2) {
                    uni.showToast({
                        title:"请填写正确的姓名",
                        icon:"none"
                    })
                }else if(!this.tools.checkInput("id",this.idCard)){
                    uni.showToast({
                        title:"身份证号码输入不正确!!!",
                        icon:"none"
                    })
                }else{
                    uni.request({
                        url:$this.util.getApiUrl("/yppUser/real_name_authentication"),
                        method:"POST",
                        data:{
                            uid:loginInfo.uid,
                            realName:$this.name,
                            idCard:$this.idCard
                        },
                        success(res){
                            let data = res.data;
                            if (data.code === 200) {
                                uni.showToast({
                                    title:"绑定成功",
                                    icon:"none"
                                });
                                uni.navigateBack({});
                            }else{
                                $this.util.showInfo(0,data)
                            }
                        },
                        fail:function (err) {
                            uni.showToast({
                                title:err.errMsg,
                                icon:"none"
                            });
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../components/plugin/colorui/main.css";
    .real{
        padding: 20upx 51upx;
        .hint{
            font-size: 12px;
            color: #999999;
            margin-bottom: 100upx ;
        }
        .form{
            padding: 38upx 0;
            color: #333333;
        }
        .form::after{
            width: 100%;
            left: 0;
        }
        .protocol{
            color: #999999;
            font-size: 12px;
            margin-top: 32upx;
            checkbox{
                transform:scale(0.7)
            }

        }
        .cu-btn{
            width: 100%;
            margin-top:60upx;
        }
    }
</style>