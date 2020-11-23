<template>
    <view class="t-card">
        <view v-if="title!=='' || !!title" class="title" :style="{borderBottom:border?'1px solid #eee':'none'}">{{title}}</view>
        <slot></slot>
    </view>
</template>

<script>
    export default {
        name: "t-card",
        props:{
            title:String,
            border:{
                type:Boolean,
                default(){
                    return false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .t-card{
        background-color: #fff;
        border-radius: 10upx;
        margin-top: 14upx;
        box-shadow:1px 1px 2px 2px #eee;
        padding: 10upx 34upx;
        position: relative;
        .title{
            color: #000;
            font-size: 28upx;
            padding: 10upx 0;
            font-weight: bold;
        }
    }
</style>