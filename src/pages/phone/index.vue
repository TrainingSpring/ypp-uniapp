<!--绑定手机-->
<template>
    <view id="Login">
        <view class="top">
            <image src="../../static/login/img.png" mode="widthFix"></image>
        </view>
        <view class="check">
            <t-form title="手机号码" max="11" min="11" type="check" placeholder="请输入您的手机号码" v-model="phone" @oncheck="test"></t-form>
            <t-form title="验证码" type="text" max="4" placeholder="请输入验证码" v-model="check" @oncheck="test"></t-form>
        </view>
        <view class="hint">
            注：为了保护您的账号安全及方便找回，需要对绑定的手
            机号进行短信验证

        </view>
        <button>保存</button>
    </view>
</template>

<script>
    import Tools from "../../components/plugin/tool"
    import tform from "../../components/form/index"
    export default {
        name: "index",
        data(){
            return {
                phone:null,  // 手机号码
                check:null  // 验证码
            }
        },
        components:{
            "t-form":tform
        },
        methods:{
            test(){

            }
        }
    }
</script>

<style scoped>
    #Login .top image{
        width: 100%;
    }
    #Login .check{
        margin-top: 10px;
    }
    #Login button{
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