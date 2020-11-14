<!--单选按钮-->
<template>
    <view class="T-radio" :style="{justifyContent:align==='left'?'flex-start':align === 'center'?'center':align === 'right'?'flex-end':align}">
        <view class="item" :style="{backgroundColor:bgColor,color:index===cur?selectedColor:fontColor,padding:padding,margin:margin}" v-for="item,index in data" :class="[itemClass]" @tap="selected(index)">{{item}}</view>
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
            data:{  // 单选数据
                type:Array,
                default(){
                    return [];
                }
            },
            itemClass:String,
            bgColor:{   // 背景颜色
                type:String,
                default(){
                    return "#F2F2F2"
                }
            },
            fontColor:{  // 文字颜色
                type:String,
                default(){
                    return "#101D37"
                }
            },
            selectedColor:{ // 选中后颜色
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
            },
            align:{
                type:String,
                default(){
                    return "space-between"
                }
            },
            margin:String
        }
    }
</script>

<style lang="scss" scoped>
    .T-radio{
        display: flex;
        /*justify-content: space-between;*/
        align-items: center;
        flex-wrap: nowrap;
        max-width: 100%;
        color: #101D37;
        font-size: 24upx;
        padding: 20upx;
        overflow-x: auto;
        .item{
            white-space:nowrap;
            padding: 20upx 60upx;
            border-radius: 10upx;
        }
    }
</style>