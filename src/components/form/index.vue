<!--输入选项-->
<template>
    <view class="T-form">
       <view class="title">{{title}}</view>
       <view class="input" v-if="type!=='check'" style="flex:14;"><input :type="type" :minlength="min" :maxlength="max" :value="value" :placeholder="placeholder" @input="changeInput"></view>
       <view class="input" v-else style="flex:10;"><input :type="type" :minlength="min" :maxlength="max" :value="value" :placeholder="placeholder" @input="changeInput"></view>
       <view class="check" v-if="type==='check'" @click="onCheck">获取验证码</view>
    </view>
</template>

<script>
    export default {
        name: "t-form",
        data(){
            return {

            }
        },
        mounted(){
            console.log(this.value);
        },
        props:{
            title:{
                type:String,
                required:true
            },
            "type":String,
            "value":[String,Number],
            "placeholder":String,
            max:[Number,String],
            min:[Number,String]
        },
        methods:{
            changeInput(e){
                this.$emit("input",e.detail.value);
            },
            onCheck(){
                this.$emit("oncheck");
            }
        }
    }
</script>

<style scoped>
    .T-form{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 17px;
        font-size: 14px;
        background: #fff;
        position:relative;
    }
    .T-form::after{
        content: ' ';
        background: #D3D3D3;
        width: 96%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 2%;
    }
    .T-form:last-child::after{
        opacity: 0;
    }
    .T-form .title{
        flex: 4;
    }
    .T-form .input{
        font-size: 12px;
    }
    .T-form .input input{
        font-size: 12px;
    }
    .T-form .check{
        flex: 4;
        font-size: 12px;
        text-align: center;
        color: #1B82D1;
    }
</style>