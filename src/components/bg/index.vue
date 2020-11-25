<!--设置背景图片-->
<template>
    <view class="T-background">
        <image :src="url"></image>
        <view><slot></slot></view>
    </view>
</template>

<script>
    export default {
        name: "t-bg",
        data(){
            return{
                url:undefined
            }
        },
        mounted(){
            this.url = this.util.getStaticUrl(this.src);
        },
        props:{
            src:String
        }
    }
</script>

<style lang="scss" scoped>
    .T-background{
        position: relative;
        image{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
        }
        view{
            position: relative;
            z-index: 10;
            width: 100%;
            height: 100%;
        }
    }
</style>