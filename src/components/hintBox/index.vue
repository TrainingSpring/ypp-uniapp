<template>
    <view class="hintBox" :style="{display:show?'block':'none'}">
        <view class="hint" :style="{width,height, margin: 'calc((100vh - '+ height+')/2) auto'}">
            <view class="icon" :style="{width:iconWidth,height:iconHeight,left:'calc((100% - '+iconHeight+')/2)'}">
                <image :src="icon"></image>
            </view>
            <view class="text"><slot v-if="!!text"></slot><text v-if="text">{{text}}</text></view>
            <view class="btn" @tap.prevent="tap(1)">{{confirm}}</view>
            <view class="btn_cancel" v-if="type!==0" @tap.prevent="tap(0)">{{cancel}}</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "index",
        props:{
            show:{ // model 的展示状态
                type:Boolean,
                default(){
                    return false
                }
            },
            type:{  // modal的类型
                type:Number,
                default(){
                    return 0
                }
            },
            icon:{  // 图标
                type:String,
                default(){
                    return "../../static/hint/icon.png"
                }
            },
            text:String,  // 显示文字,或者使用标签
            confirm:{  // 确认按钮文字
                type:String,
                default:()=>{
                    return "确认"
                }
            },
            cancel:{  // 取消按钮文字
                type:String,
                default:()=>{
                    return "取消"
                }
            },
            width:{  // 宽
                type:String,
                default(){
                    return "200px"
                }
            },
            height:{  // 高
                type:String,
                default(){
                    return "214px"
                }
            },
            iconWidth:{
                type:String,
                default(){
                    return "100px"
                }
            },
            iconHeight:{
                type:String,
                default(){
                    return "89px"
                }
            }
        },
        methods:{
            tap(val){
                console.log(val)
            }
        }
    }
</script>

<style lang="scss" scoped>
    image{
        width: 100%;
        height:100%;
    }
    .hintBox{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.6);
        z-index: 99;
        .hint{
            background: #FFFFFF;
            border-radius: 40upx;
            position: relative;
            text-align: center;
            .icon{
                position: absolute;
                top: -20.5%;
                left: 19.28%;
            }
            .text{
                padding-top: 152upx;
                font-size: 32upx;
            }
            .btn{
                position: absolute;
                bottom: 60upx;
                width: 266upx;
                line-height: 100upx;
                background-color:#4BB2FF ;
                border-radius: 100upx;
                left: 67upx;
                box-shadow: 8upx 8upx 44upx 0px #4BB2FF;
                color: white;
                font-size: 32upx;
            }
            .btn_cancel{
                position: absolute;
                bottom: 10upx;
                width: 100%;
                text-align: center;
                color: #999;
                font-size: 30upx;
            }
        }
    }
</style>