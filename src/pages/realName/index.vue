<template>
    <view class="real">
        <view class="hint">请确认是您本人操作，验证通过后不可修改！</view>
        <t-form class="form" type="text" title="姓名" v-model="name" placeholder="请输入真实姓名">

        </t-form>
        <t-form class="form" type="text"  value="身份证" disabled title="证件类型">

        </t-form>
        <t-form class="form" type="text" v-model="idCard" title="证件号" placeholder="请输入身份证号">

        </t-form>
        <view class="protocol" :style="{color:protocol?'#2894FF':'#999'}">
            <checkbox-group @change="checkBoxChange" class="">
                <label>
                    <checkbox value="0" color="#2894FF" /> 已阅读并同意《用户协议》及《隐私政策》
                </label>
            </checkbox-group>
        </view>
        <view class="cu-btn lg bg-blue">验证信息</view>
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
                protocol:false
            }
        },
        components:{
            TForm:tform
        },
        methods:{
            checkBoxChange(val){
                let detail = val.detail.value;
                if(detail.length === 1)this.protocol = true;
                else this.protocol = false;

                console.log(this.protocol);
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