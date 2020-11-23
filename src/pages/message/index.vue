<template>
    <view class="message">
        <card  v-if="msg.length>0" v-for="item in msg" :title="item.title" class="card">
            <view class="content">
                {{item.content}}
            </view>
            <view class="date">{{item.date}}</view>
        </card>
        <view class="padding text-gray text-center" v-if="msg.length<=0">
            暂无消息...
        </view>
    </view>
</template>

<script>
    import card from "../../components/card/index.vue"
    export default {
        name: "index",
        data(){
            return {
               msg:[
                  /* {
                       title:"通知标题",
                       content:" 通知：各位小伙伴你们好，近期平台推广流量在大幅度增加，做单用户也每天开始增长较快，所以将置顶和黄金展位的价格进行了涨价调整。",
                       date:"10月19日 15:36"
                   },
                   {
                       title:"通知标题",
                       content:" 通知：各位小伙伴你们好，近期平台推广流量在大幅度增加，做单用户也每天开始增长较快，所以将置顶和黄金展位的价格进行了涨价调整。",
                       date:"10月19日 15:36"
                   },
                   {
                       title:"通知标题",
                       content:" 通知：各位小伙伴你们好，近期平台推广流量在大幅度增加，做单用户也每天开始增长较快，所以将置顶和黄金展位的价格进行了涨价调整。",
                       date:"10月19日 15:36"
                   },*/
               ]
            }
        },
        components:{
            card
        }
    }
</script>

<style lang="scss" scoped>
    .message{
        padding: 0 30upx;
        .card{
            padding: 30upx 20upx;
            font-size: 28upx;
            color: #131313;
            margin-bottom: 20upx;
            .content{
                margin-bottom: 25upx;
            }
        }
    }
</style>