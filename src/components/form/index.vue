<!--输入选项-->
<template>
    <view class="T-form">
       <view class="title">{{title}}</view>
       <view class="input" v-if="type!=='check'" style="flex:14;"><input :disabled="disabled" :type="type" :minlength="min" :maxlength="max" :value="value" :placeholder="placeholder" @input="changeInput"></view>
       <view class="input" v-else style="flex:10;">               <input :type="type" :minlength="min" :maxlength="max" :value="value" :placeholder="placeholder" @input="changeInput"></view>
       <view class="check" :class="down?'text-gray':'text-blue'" v-if="type==='check'" @tap="onCheck">{{!down?"获取验证码":down+"秒后重新发送"}}</view>
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

        },
        props:{
            down:{
                type:Number,
                default() {
                    return 0;
                }
            },
            title:{
                type:String,
                required:true
            },
            "type":String,
            "value":[String,Number],
            "placeholder":String,
            max:{
                type:[Number,String],
                default(){
                    return Number.MAX_SAFE_INTEGER;
                }
            },
            min:{
                type:[Number,String],
                default() {
                    return 0;
                }
            },
            disabled:{
                type:Boolean,
                default(){
                    return false
                }
            }
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
    /* #ifdef MP-WEIXIN */
    .T-form{
        border-bottom: 1px solid #d3d3d3;
    }
    .T-form:last-child{
        border: none;
    }
    /* #endif */
    /* #ifndef MP-WEIXIN*/
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
    /* #endif */
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
        white-space: nowrap;
    }
</style>