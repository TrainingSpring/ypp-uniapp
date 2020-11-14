<!--游戏列表项-->
<template>
    <view class="t-game-item" :class="itemClass" @tap="clickThis(data)">
        <view class="logo" :style="{'background':'url('+data.icon+') no-repeat',backgroundSize:'cover'}">

            <view v-if="data.newGame" class="new">
                NEW
            </view>
        </view>
        <view class="content">
            <view class="name">
                <view>{{data.name}}</view>
                <view>{{data.server}}</view>
                <view v-if="data.recommend" class="iconfont icon-tuijian" style="color:red;"></view>
                <view v-if="data.newTask" class="iconfont icon-zuixin" style="color: red;"></view>
            </view>
            <view class="desc">{{data.desc}}</view>
        </view>
        <view class="progress">
            <text>{{data.progress}}%</text>
            <progress :percent="data.progress" :border-radius="10" active></progress>
        </view>
        <view class="get-money">
            <bgi class="btn" :src="'../../static/btn/'+(btnState==0?'btn.png':btnState === 1?'btn_1.png':'btn_2.png')"><view style="width:117upx;margin-left: 8upx;text-align: center;">{{btnText}}</view></bgi>
            <view class="money">+{{(data.money)}}元</view>
        </view>
    </view>
</template>

<script>
    import bgi from "../../components/bg/index.vue"
    export default {
        name: "index",
        props:{
            data:{   // 数据
                type:Object,
                default(){
                    return {}
                }
            },
            btnState:{ // 按钮状态
              type:Number,
                default(){
                  return 0
                }
            },
            btnText:{
              type:String,
              default(){
                  return "马上赚"
              }
            },
            itemClass:String
        },
        components:{
            bgi
        },
        methods:{
            clickThis(data){
                this.$emit("ontap",data);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../static/css/iconfont.css";
    .t-game-item{
        width: calc(100% - 60upx);
        padding: 30upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #E5E5E5;
        .logo{
            width: 85upx;
            height: 85upx;
            border-radius: 10upx;
            border: 1px solid #DCDCDC;
            overflow: hidden;
            .new{
                background: red;
                color: white;
                font-size: 24upx;
                width: 200%;
                text-align: center;
                height: 24upx;
                line-height:  24upx;
                transform: rotateZ(45deg) translateX(-8upx) translateY(30upx) scale(0.8);
            }
        }
        .content{
            .name{
                display: flex;
                justify-content: start;
                view{
                    margin-right: 12upx;
                }
                view:first-child{
                    font-size: 30upx;
                    font-weight: bold;
                    color: #000;
                }
                view:nth-child(2){
                    background: #4BB2FF;
                    color: #FFF;
                    height: 32upx;
                    padding:0 6upx;
                    font-size: 24upx;
                }
            }
            .desc{
                font-size: 22upx;
                color: #5C5C5C;
                max-width: 250upx;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .progress{
            width:117upx ;
            text-align: right;
            text{
                font-size: 24upx;
                color: #5C5C5C;
            }
        }
        .get-money{
            .btn{
                width: 167upx;
                height: 50upx;
                /*text-indent: 1em;*/
                line-height: 50upx;
                font-size: 12px;
                color: #ffffff;
                display: block;
            }
            .money{
                color: red;
                font-size: 12px;
            }
        }
    }
</style>