<!--单选按钮-->
<template>
    <view class="T-radio">
        <view class="item" :style="{backgroundColor:bgColor,color:index===cur?selectedColor:fontColor,padding:padding}" v-for="item,index in data" :class="[itemClass]" @tap="selected(index)">{{item}}</view>
    </view>
</template>

<script>
    export default {
        name: "t-radio",
        data(){
            return {
                cur:0
            }
        },
        mounted(){

        },
        methods:{
            selected(index){
                this.cur = index;
                this.$emit("change",index);
            }
        },
        props:{
            data:{
                type:Array,
                default(){
                    return [];
                }
            },
            itemClass:String,
            bgColor:{
                type:String,
                default(){
                    return "#F2F2F2"
                }
            },
            fontColor:{
                type:String,
                default(){
                    return "#101D37"
                }
            },
            selectedColor:{
                type:String,
                default(){
                    return "#4BB2FF"
                }
            },
            padding:{
                type:String,
                default(){
                    return ""
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .T-radio{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #101D37;
        font-size: 24upx;
        padding: 20upx;
        .item{
            padding: 20upx 60upx;
            border-radius: 10upx;
        }
    }
</style>